-- MindWaveAI Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- CONTACTS TABLE
-- Stores all inbound lead form submissions
-- ============================================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL,
  budget TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'Website Contact Form',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed', 'unqualified')),
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS contacts_email_idx ON contacts (email);
CREATE INDEX IF NOT EXISTS contacts_status_idx ON contacts (status);
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON contacts (created_at DESC);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- BLOG_POSTS TABLE
-- Dynamic blog content management
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'MindWaveAI Team',
  author_role TEXT,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  read_time INTEGER,
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON blog_posts (published, published_at DESC);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON blog_posts (category);

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on contacts (only service role can access)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (used by API routes)
CREATE POLICY "Service role full access on contacts"
  ON contacts
  USING (true)
  WITH CHECK (true);

-- Blog posts: anyone can read published posts, only service role can write
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published blog posts"
  ON blog_posts
  FOR SELECT
  USING (published = true);

CREATE POLICY "Service role full access on blog_posts"
  ON blog_posts
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- SAMPLE BLOG DATA
-- ============================================================
INSERT INTO blog_posts (
  slug, title, excerpt, content, category, author_name,
  published, featured, published_at, read_time, tags
) VALUES (
  'workflow-automation-roi-calculator',
  'How to Calculate the Real ROI of Workflow Automation',
  'Most business owners have no idea how much their manual work is actually costing them. Here''s a framework to calculate your automation ROI.',
  '# The hidden cost of manual work...',
  'Strategy',
  'Alex Morgan',
  true,
  true,
  '2025-01-15 09:00:00+00',
  8,
  ARRAY['automation', 'roi', 'strategy', 'workflow']
) ON CONFLICT (slug) DO NOTHING;
