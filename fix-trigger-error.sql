-- Fix the trigger error by dropping the problematic trigger
-- This trigger expects a 'mentions' column that doesn't exist in your posts table

DROP TRIGGER IF EXISTS create_mention_notifications_trigger ON public.posts;
DROP FUNCTION IF EXISTS public.create_mention_notifications();
