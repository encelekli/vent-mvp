-- Vent MVP initial schema
-- Run this in your Supabase SQL Editor or via supabase db push

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Topics table
CREATE TABLE IF NOT EXISTS public.topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vents table
CREATE TABLE IF NOT EXISTS public.vents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  audio_url TEXT,
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
  topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vent reactions table
CREATE TABLE IF NOT EXISTS public.vent_reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vent_id UUID NOT NULL REFERENCES public.vents(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(vent_id, user_id, emoji)
);

-- Topic memberships table
CREATE TABLE IF NOT EXISTS public.topic_memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(topic_id, user_id)
);

-- Messages table (topic group chat)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Coffee sessions table (1:1 matching)
CREATE TABLE IF NOT EXISTS public.coffee_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
  initiator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  partner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'ended')),
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Coffee messages table (1:1 chat messages)
CREATE TABLE IF NOT EXISTS public.coffee_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES public.coffee_sessions(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vent_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coffee_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coffee_messages ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all, update own
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Vents: public vents viewable by all, private only by owner
CREATE POLICY "Public vents are viewable by everyone"
  ON public.vents FOR SELECT USING (visibility = 'public');

CREATE POLICY "Users can view own private vents"
  ON public.vents FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vents"
  ON public.vents FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vents"
  ON public.vents FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own vents"
  ON public.vents FOR DELETE USING (auth.uid() = user_id);

-- Topics: viewable by all
CREATE POLICY "Topics are viewable by everyone"
  ON public.topics FOR SELECT USING (true);

-- Messages: viewable by topic members
CREATE POLICY "Messages are viewable by topic members"
  ON public.messages FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.topic_memberships tm
      WHERE tm.topic_id = messages.topic_id AND tm.user_id = auth.uid()
    )
  );

CREATE POLICY "Members can insert messages"
  ON public.messages FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.topic_memberships tm
      WHERE tm.topic_id = messages.topic_id AND tm.user_id = auth.uid()
    )
  );

-- Coffee sessions: participants can view
CREATE POLICY "Coffee session participants can view"
  ON public.coffee_sessions FOR SELECT USING (
    auth.uid() = initiator_id OR auth.uid() = partner_id
  );

CREATE POLICY "Users can create coffee sessions"
  ON public.coffee_sessions FOR INSERT WITH CHECK (auth.uid() = initiator_id);

-- Coffee messages: session participants can view
CREATE POLICY "Coffee messages viewable by participants"
  ON public.coffee_messages FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.coffee_sessions cs
      WHERE cs.id = coffee_messages.session_id
        AND (cs.initiator_id = auth.uid() OR cs.partner_id = auth.uid())
    )
  );

CREATE POLICY "Participants can send coffee messages"
  ON public.coffee_messages FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.coffee_sessions cs
      WHERE cs.id = coffee_messages.session_id
        AND (cs.initiator_id = auth.uid() OR cs.partner_id = auth.uid())
    )
  );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, 'User-' || substr(NEW.id::text, 1, 8));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed topics
INSERT INTO public.topics (name, slug, description)
VALUES
  ('Work Stress', 'work-stress', 'Vent about deadlines, bosses, burnout, and career anxiety.'),
  ('Mental Health', 'mental-health', 'A safe space to talk about anxiety, depression, and healing.'),
  ('Relationships', 'relationships', 'Love, heartbreak, boundaries, and everything in between.'),
  ('Family', 'family', 'Navigating family dynamics, expectations, and conflict.')
ON CONFLICT (slug) DO NOTHING;
