-- 1) Snapshot table for gold price history
CREATE TABLE IF NOT EXISTS public.gold_prices (
  day DATE NOT NULL PRIMARY KEY,
  eur_per_oz NUMERIC(12,4) NOT NULL,
  eur_per_g  NUMERIC(12,4) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.gold_prices TO anon, authenticated;
GRANT ALL ON public.gold_prices TO service_role;

ALTER TABLE public.gold_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "gold_prices_public_read"
  ON public.gold_prices FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TRIGGER gold_prices_set_updated_at
  BEFORE UPDATE ON public.gold_prices
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2) Test user (idempotent)
DO $$
DECLARE
  v_uid uuid;
  v_existing uuid;
BEGIN
  SELECT id INTO v_existing FROM auth.users WHERE email = 'test@zv-demo.de';
  IF v_existing IS NULL THEN
    v_uid := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data,
      confirmation_token, recovery_token, email_change_token_new, email_change
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      v_uid, 'authenticated', 'authenticated',
      'test@zv-demo.de',
      crypt('TestZV2026!', gen_salt('bf')),
      now(), now(), now(),
      jsonb_build_object('provider','email','providers', jsonb_build_array('email')),
      jsonb_build_object('display_name','Test Mitglied'),
      '', '', '', ''
    );
    INSERT INTO auth.identities (
      id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), v_uid,
      jsonb_build_object('sub', v_uid::text, 'email','test@zv-demo.de','email_verified', true),
      'email', v_uid::text, now(), now(), now()
    );
  END IF;
END $$;