CREATE TABLE public.site_stats (
  key TEXT PRIMARY KEY,
  visits BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_stats_public_read" ON public.site_stats
  FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.site_stats (key, visits) VALUES ('home', 0)
  ON CONFLICT (key) DO NOTHING;

CREATE OR REPLACE FUNCTION public.increment_visitor()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  INSERT INTO public.site_stats (key, visits, updated_at)
  VALUES ('home', 1, now())
  ON CONFLICT (key) DO UPDATE
    SET visits = public.site_stats.visits + 1,
        updated_at = now()
  RETURNING visits INTO new_count;
  RETURN new_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_visitor() TO anon, authenticated;