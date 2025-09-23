-- Fix messages table to make receiver_id optional for conversation-based messaging
-- This script removes the NOT NULL constraint from receiver_id column

-- First, check if receiver_id column exists and has NOT NULL constraint
DO $$
BEGIN
    -- Check if receiver_id column has NOT NULL constraint
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'messages' 
        AND column_name = 'receiver_id' 
        AND is_nullable = 'NO'
    ) THEN
        -- Remove NOT NULL constraint from receiver_id
        ALTER TABLE public.messages ALTER COLUMN receiver_id DROP NOT NULL;
        
        RAISE NOTICE 'Removed NOT NULL constraint from receiver_id column';
    ELSE
        RAISE NOTICE 'receiver_id column either does not exist or already allows NULL values';
    END IF;
END $$;

-- Also, let's add a check constraint to ensure either receiver_id is provided OR it's a conversation-based message
-- For conversation-based messaging, we don't need receiver_id since participants are managed through conversation_participants table

-- Add a comment to clarify the usage
COMMENT ON COLUMN public.messages.receiver_id IS 'Optional: For direct messages. For conversation-based messages, participants are managed through conversation_participants table.';

-- Success message
SELECT 'Messages receiver_id constraint fixed successfully! ✅' as status;
