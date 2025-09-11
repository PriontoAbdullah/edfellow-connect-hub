-- Groups and Forums Schema Extension
-- This file extends the existing schema with groups and forums functionality

-- Create groups table
CREATE TABLE IF NOT EXISTS public.groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('study', 'research', 'professional', 'social', 'academic')),
  subject_area TEXT,
  university TEXT,
  department TEXT,
  level TEXT CHECK (level IN ('undergraduate', 'graduate', 'phd', 'postdoc', 'faculty', 'mixed')),
  max_members INTEGER DEFAULT 50,
  is_private BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  cover_image TEXT,
  rules TEXT,
  created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create group_members table
CREATE TABLE IF NOT EXISTS public.group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending', 'banned', 'left')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  invited_by UUID REFERENCES public.users(id),
  UNIQUE(group_id, user_id)
);

-- Create group_posts table
CREATE TABLE IF NOT EXISTS public.group_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  post_type TEXT NOT NULL DEFAULT 'discussion' CHECK (post_type IN ('discussion', 'announcement', 'resource', 'question', 'poll')),
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  attachments JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create group_post_comments table
CREATE TABLE IF NOT EXISTS public.group_post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.group_posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_comment_id UUID REFERENCES public.group_post_comments(id) ON DELETE CASCADE,
  is_solution BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum_categories table
CREATE TABLE IF NOT EXISTS public.forum_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT NOT NULL UNIQUE,
  parent_category_id UUID REFERENCES public.forum_categories(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum_threads table
CREATE TABLE IF NOT EXISTS public.forum_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.forum_categories(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  is_announcement BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  view_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  last_reply_at TIMESTAMP WITH TIME ZONE,
  last_reply_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum_replies table
CREATE TABLE IF NOT EXISTS public.forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_reply_id UUID REFERENCES public.forum_replies(id) ON DELETE CASCADE,
  is_solution BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create group_invitations table
CREATE TABLE IF NOT EXISTS public.group_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  invited_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  invited_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create group_join_requests table
CREATE TABLE IF NOT EXISTS public.group_join_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES public.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_groups_created_by ON public.groups(created_by);
CREATE INDEX IF NOT EXISTS idx_groups_category ON public.groups(category);
CREATE INDEX IF NOT EXISTS idx_groups_university ON public.groups(university);
CREATE INDEX IF NOT EXISTS idx_groups_subject_area ON public.groups(subject_area);
CREATE INDEX IF NOT EXISTS idx_groups_is_private ON public.groups(is_private);
CREATE INDEX IF NOT EXISTS idx_groups_is_verified ON public.groups(is_verified);

CREATE INDEX IF NOT EXISTS idx_group_members_group_id ON public.group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_user_id ON public.group_members(user_id);
CREATE INDEX IF NOT EXISTS idx_group_members_role ON public.group_members(role);
CREATE INDEX IF NOT EXISTS idx_group_members_status ON public.group_members(status);

CREATE INDEX IF NOT EXISTS idx_group_posts_group_id ON public.group_posts(group_id);
CREATE INDEX IF NOT EXISTS idx_group_posts_author_id ON public.group_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_group_posts_post_type ON public.group_posts(post_type);
-- Create index for group_posts is_pinned column (with safety check)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'group_posts' 
               AND column_name = 'is_pinned' 
               AND table_schema = 'public') THEN
        CREATE INDEX IF NOT EXISTS idx_group_posts_is_pinned ON public.group_posts(is_pinned);
    END IF;
END $$;
CREATE INDEX IF NOT EXISTS idx_group_posts_created_at ON public.group_posts(created_at);

CREATE INDEX IF NOT EXISTS idx_group_post_comments_post_id ON public.group_post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_group_post_comments_author_id ON public.group_post_comments(author_id);
CREATE INDEX IF NOT EXISTS idx_group_post_comments_parent_comment_id ON public.group_post_comments(parent_comment_id);

CREATE INDEX IF NOT EXISTS idx_forum_categories_slug ON public.forum_categories(slug);
CREATE INDEX IF NOT EXISTS idx_forum_categories_parent_category_id ON public.forum_categories(parent_category_id);
CREATE INDEX IF NOT EXISTS idx_forum_categories_sort_order ON public.forum_categories(sort_order);

CREATE INDEX IF NOT EXISTS idx_forum_threads_category_id ON public.forum_threads(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_threads_author_id ON public.forum_threads(author_id);
-- Create index for forum_threads is_pinned column (with safety check)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'forum_threads' 
               AND column_name = 'is_pinned' 
               AND table_schema = 'public') THEN
        CREATE INDEX IF NOT EXISTS idx_forum_threads_is_pinned ON public.forum_threads(is_pinned);
    END IF;
END $$;
CREATE INDEX IF NOT EXISTS idx_forum_threads_last_reply_at ON public.forum_threads(last_reply_at);
CREATE INDEX IF NOT EXISTS idx_forum_threads_created_at ON public.forum_threads(created_at);

CREATE INDEX IF NOT EXISTS idx_forum_replies_thread_id ON public.forum_replies(thread_id);
CREATE INDEX IF NOT EXISTS idx_forum_replies_author_id ON public.forum_replies(author_id);
CREATE INDEX IF NOT EXISTS idx_forum_replies_parent_reply_id ON public.forum_replies(parent_reply_id);

CREATE INDEX IF NOT EXISTS idx_group_invitations_group_id ON public.group_invitations(group_id);
CREATE INDEX IF NOT EXISTS idx_group_invitations_invited_user_id ON public.group_invitations(invited_user_id);
CREATE INDEX IF NOT EXISTS idx_group_invitations_status ON public.group_invitations(status);

CREATE INDEX IF NOT EXISTS idx_group_join_requests_group_id ON public.group_join_requests(group_id);
CREATE INDEX IF NOT EXISTS idx_group_join_requests_user_id ON public.group_join_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_group_join_requests_status ON public.group_join_requests(status);

-- Enable Row Level Security
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_join_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for groups (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view public groups" ON public.groups;
DROP POLICY IF EXISTS "Group creators can update their groups" ON public.groups;
DROP POLICY IF EXISTS "Group creators can delete their groups" ON public.groups;
DROP POLICY IF EXISTS "Authenticated users can create groups" ON public.groups;

CREATE POLICY "Users can view public groups" ON public.groups
  FOR SELECT USING (is_private = FALSE OR auth.uid() IN (
    SELECT user_id FROM public.group_members 
    WHERE group_id = groups.id AND status = 'active'
  ));

CREATE POLICY "Professors can create groups" ON public.groups
  FOR INSERT WITH CHECK (
    auth.uid() = created_by AND 
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'professor')
  );

CREATE POLICY "Group creators can update their groups" ON public.groups
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Group admins can update groups" ON public.groups
  FOR UPDATE USING (auth.uid() IN (
    SELECT user_id FROM public.group_members 
    WHERE group_id = groups.id AND role = 'admin' AND status = 'active'
  ));

-- Create RLS policies for group_members
CREATE POLICY "Users can view group members" ON public.group_members
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM public.group_members gm2 
      WHERE gm2.group_id = group_members.group_id AND gm2.status = 'active'
    )
  );

CREATE POLICY "Users can join groups" ON public.group_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own membership" ON public.group_members
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Group admins can manage members" ON public.group_members
  FOR ALL USING (auth.uid() IN (
    SELECT user_id FROM public.group_members gm2 
    WHERE gm2.group_id = group_members.group_id AND gm2.role = 'admin' AND gm2.status = 'active'
  ));

-- Create RLS policies for group_posts
CREATE POLICY "Group members can view posts" ON public.group_posts
  FOR SELECT USING (auth.uid() IN (
    SELECT user_id FROM public.group_members 
    WHERE group_id = group_posts.group_id AND status = 'active'
  ));

CREATE POLICY "Group members can create posts" ON public.group_posts
  FOR INSERT WITH CHECK (
    auth.uid() = author_id AND 
    auth.uid() IN (
      SELECT user_id FROM public.group_members 
      WHERE group_id = group_posts.group_id AND status = 'active'
    )
  );

CREATE POLICY "Post authors can update their posts" ON public.group_posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Group moderators can update posts" ON public.group_posts
  FOR UPDATE USING (auth.uid() IN (
    SELECT user_id FROM public.group_members 
    WHERE group_id = group_posts.group_id AND role IN ('admin', 'moderator') AND status = 'active'
  ));

-- Create RLS policies for group_post_comments
CREATE POLICY "Group members can view comments" ON public.group_post_comments
  FOR SELECT USING (auth.uid() IN (
    SELECT user_id FROM public.group_members gm
    JOIN public.group_posts gp ON gm.group_id = gp.group_id
    WHERE gp.id = group_post_comments.post_id AND gm.status = 'active'
  ));

CREATE POLICY "Group members can create comments" ON public.group_post_comments
  FOR INSERT WITH CHECK (
    auth.uid() = author_id AND 
    auth.uid() IN (
      SELECT user_id FROM public.group_members gm
      JOIN public.group_posts gp ON gm.group_id = gp.group_id
      WHERE gp.id = group_post_comments.post_id AND gm.status = 'active'
    )
  );

CREATE POLICY "Comment authors can update their comments" ON public.group_post_comments
  FOR UPDATE USING (auth.uid() = author_id);

-- Create RLS policies for forum_categories
CREATE POLICY "Anyone can view forum categories" ON public.forum_categories
  FOR SELECT USING (is_active = TRUE);

-- Create RLS policies for forum_threads (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view forum threads" ON public.forum_threads;
DROP POLICY IF EXISTS "Authenticated users can create threads" ON public.forum_threads;
DROP POLICY IF EXISTS "Thread authors can update their threads" ON public.forum_threads;

CREATE POLICY "Anyone can view forum threads" ON public.forum_threads
  FOR SELECT USING (TRUE);

CREATE POLICY "Authenticated users can create threads" ON public.forum_threads
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Thread authors can update their threads" ON public.forum_threads
  FOR UPDATE USING (auth.uid() = author_id);

-- Create RLS policies for forum_replies
CREATE POLICY "Anyone can view forum replies" ON public.forum_replies
  FOR SELECT USING (TRUE);

CREATE POLICY "Authenticated users can create replies" ON public.forum_replies
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Reply authors can update their replies" ON public.forum_replies
  FOR UPDATE USING (auth.uid() = author_id);

-- Create RLS policies for group_invitations
CREATE POLICY "Users can view their invitations" ON public.group_invitations
  FOR SELECT USING (auth.uid() = invited_user_id);

CREATE POLICY "Group admins can create invitations" ON public.group_invitations
  FOR INSERT WITH CHECK (
    auth.uid() = invited_by AND 
    auth.uid() IN (
      SELECT user_id FROM public.group_members 
      WHERE group_id = group_invitations.group_id AND role = 'admin' AND status = 'active'
    )
  );

CREATE POLICY "Invited users can update invitation status" ON public.group_invitations
  FOR UPDATE USING (auth.uid() = invited_user_id);

-- Create RLS policies for group_join_requests
CREATE POLICY "Users can view their join requests" ON public.group_join_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Group admins can view join requests" ON public.group_join_requests
  FOR SELECT USING (auth.uid() IN (
    SELECT user_id FROM public.group_members 
    WHERE group_id = group_join_requests.group_id AND role = 'admin' AND status = 'active'
  ));

CREATE POLICY "Users can create join requests" ON public.group_join_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Group admins can update join requests" ON public.group_join_requests
  FOR UPDATE USING (auth.uid() IN (
    SELECT user_id FROM public.group_members 
    WHERE group_id = group_join_requests.group_id AND role = 'admin' AND status = 'active'
  ));

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_groups_updated_at
  BEFORE UPDATE ON public.groups
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_group_posts_updated_at
  BEFORE UPDATE ON public.group_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_group_post_comments_updated_at
  BEFORE UPDATE ON public.group_post_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_forum_threads_updated_at
  BEFORE UPDATE ON public.forum_threads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_forum_replies_updated_at
  BEFORE UPDATE ON public.forum_replies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update thread reply count and last reply info
CREATE OR REPLACE FUNCTION public.update_thread_reply_info()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.forum_threads 
    SET 
      reply_count = reply_count + 1,
      last_reply_at = NEW.created_at,
      last_reply_by = NEW.author_id
    WHERE id = NEW.thread_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.forum_threads 
    SET reply_count = reply_count - 1
    WHERE id = OLD.thread_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update thread reply info
CREATE TRIGGER update_thread_reply_info_trigger
  AFTER INSERT OR DELETE ON public.forum_replies
  FOR EACH ROW EXECUTE FUNCTION public.update_thread_reply_info();

-- Insert default forum categories
INSERT INTO public.forum_categories (name, description, slug, sort_order) VALUES
('General Discussion', 'General topics and discussions', 'general', 1),
('Academic Support', 'Help with studies, assignments, and academic questions', 'academic-support', 2),
('Research & Publications', 'Research discussions, paper reviews, and collaboration', 'research', 3),
('Career & Professional Development', 'Career advice, job opportunities, and professional growth', 'career', 4),
('Technology & Tools', 'Educational technology, software, and digital tools', 'technology', 5),
('Study Groups & Collaboration', 'Finding study partners and collaborative projects', 'study-groups', 6),
('University Life', 'Campus life, events, and university-specific discussions', 'university-life', 7),
('Off-Topic', 'Non-academic discussions and general chat', 'off-topic', 8)
ON CONFLICT (slug) DO NOTHING;
