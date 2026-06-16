
-- Rollen Enum
CREATE TYPE public.app_role AS ENUM ('admin', 'mitglied');

-- Profile
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  innung text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- user_roles
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "user_roles_select_own_or_admin" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "user_roles_admin_all" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Profil-Auto-Anlage
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'mitglied');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at trigger helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Betriebe (Mitgliedersuche)
CREATE TABLE public.betriebe (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  inhaber text,
  strasse text,
  plz text NOT NULL,
  ort text NOT NULL,
  bundesland text,
  telefon text,
  email text,
  website text,
  innung text,
  meisterbetrieb boolean NOT NULL DEFAULT false,
  beschreibung text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.betriebe ENABLE ROW LEVEL SECURITY;

CREATE POLICY "betriebe_public_read" ON public.betriebe FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "betriebe_admin_write" ON public.betriebe FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER betriebe_set_updated_at
BEFORE UPDATE ON public.betriebe
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX betriebe_plz_idx ON public.betriebe (plz);
CREATE INDEX betriebe_ort_idx ON public.betriebe (ort);
CREATE INDEX betriebe_name_idx ON public.betriebe USING gin (to_tsvector('german', name || ' ' || ort));

-- Seed: ein paar Beispielbetriebe
INSERT INTO public.betriebe (name, inhaber, strasse, plz, ort, bundesland, telefon, email, website, innung, meisterbetrieb, beschreibung) VALUES
('Goldschmiede Hartmann', 'Anja Hartmann', 'Hauptstraße 12', '10178', 'Berlin', 'Berlin', '030 1234567', 'info@gs-hartmann.de', 'https://gs-hartmann.de', 'Berlin-Brandenburg', true, 'Trauringe, Anfertigungen, Restaurierungen'),
('Atelier für Schmuck Weber', 'Markus Weber', 'Marktplatz 4', '80331', 'München', 'Bayern', '089 9876543', 'kontakt@weber-schmuck.de', null, 'München/Oberbayern', true, 'Zeitgenössischer Schmuck, Einzelstücke'),
('Schmuckwerkstatt Lichtenberg', 'Eva Lichtenberg', 'Lange Reihe 22', '20099', 'Hamburg', 'Hamburg', '040 5556677', 'mail@lichtenberg-schmuck.de', null, 'Hamburg', false, 'Goldschmiedearbeiten nach Maß'),
('Silberschmiede Krüger', 'Peter Krüger', 'Domplatz 7', '50667', 'Köln', 'Nordrhein-Westfalen', '0221 4422110', 'info@silber-krueger.de', null, 'Köln', true, 'Silbergerät, Restaurierung'),
('Goldatelier Vogt', 'Sabine Vogt', 'Kirchstraße 9', '70173', 'Stuttgart', 'Baden-Württemberg', '0711 2233445', 'atelier@vogt-gold.de', 'https://vogt-gold.de', 'Württemberg', true, 'Trauringe und Anfertigungen'),
('Schmuckmanufaktur Brandt', 'Lars Brandt', 'Bahnhofstraße 18', '60311', 'Frankfurt am Main', 'Hessen', '069 7788990', 'info@brandt-schmuck.de', null, 'Hessen', false, 'Goldschmiede und Edelsteinfassen'),
('Werkstatt Funke', 'Marie Funke', 'Altmarkt 5', '01067', 'Dresden', 'Sachsen', '0351 1122334', 'kontakt@funke-werkstatt.de', null, 'Sachsen', true, 'Goldschmiede & Schmuckdesign'),
('Goldschmiede Maier & Söhne', 'Thomas Maier', 'Königsallee 100', '40212', 'Düsseldorf', 'Nordrhein-Westfalen', '0211 6677889', 'info@maier-gold.de', 'https://maier-gold.de', 'Niederrhein', true, 'Premium-Schmuck, Brillanten'),
('Atelier Lindner', 'Christina Lindner', 'Schillerstraße 14', '04109', 'Leipzig', 'Sachsen', '0341 8899001', 'info@lindner-atelier.de', null, 'Sachsen', false, 'Unikate, Hochzeitsschmuck'),
('Goldschmiede am Dom', 'Heinrich Becker', 'Domhof 3', '55116', 'Mainz', 'Rheinland-Pfalz', '06131 334455', 'info@gs-am-dom.de', null, 'Rheinhessen', true, 'Familienbetrieb seit 1956');
