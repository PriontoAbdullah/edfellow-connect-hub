-- Fix messages table foreign key constraint for reply_to_id
-- This script adds the missing foreign key constraint that Supabase expects

-- First, check if the foreign key already exists with a different name
-- and drop it if it does
DO $$
BEGIN
    -- Drop existing foreign key constraint if it exists with a different name
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name LIKE '%reply_to%' 
        AND table_name = 'messages' 
        AND constraint_type = 'FOREIGN KEY'
    ) THEN
        -- Get the constraint name and drop it
        DECLARE
            constraint_name text;
        BEGIN
            SELECT tc.constraint_name INTO constraint_name
            FROM information_schema.table_constraints tc
            WHERE tc.table_name = 'messages' 
            AND tc.constraint_type = 'FOREIGN KEY'
            AND tc.constraint_name LIKE '%reply_to%';
            
            EXECUTE 'ALTER TABLE public.messages DROP CONSTRAINT ' || constraint_name;
        END;
    END IF;
END $$;

-- Add the foreign key constraint with the expected name (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'messages_reply_to_id_fkey' 
        AND table_name = 'messages' 
        AND constraint_type = 'FOREIGN KEY'
    ) THEN
        ALTER TABLE public.messages 
        ADD CONSTRAINT messages_reply_to_id_fkey 
        FOREIGN KEY (reply_to_id) 
        REFERENCES public.messages(id) 
        ON DELETE SET NULL;
    END IF;
END $$;

-- Also ensure the sender_id foreign key has the expected name
DO $$
BEGIN
    -- Drop existing sender_id foreign key if it exists with a different name
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name LIKE '%sender_id%' 
        AND table_name = 'messages' 
        AND constraint_type = 'FOREIGN KEY'
        AND constraint_name != 'messages_sender_id_fkey'
    ) THEN
        DECLARE
            constraint_name text;
        BEGIN
            SELECT tc.constraint_name INTO constraint_name
            FROM information_schema.table_constraints tc
            WHERE tc.table_name = 'messages' 
            AND tc.constraint_type = 'FOREIGN KEY'
            AND tc.constraint_name LIKE '%sender_id%'
            AND tc.constraint_name != 'messages_sender_id_fkey';
            
            EXECUTE 'ALTER TABLE public.messages DROP CONSTRAINT ' || constraint_name;
        END;
    END IF;
END $$;

-- Add the sender_id foreign key constraint with the expected name (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'messages_sender_id_fkey' 
        AND table_name = 'messages' 
        AND constraint_type = 'FOREIGN KEY'
    ) THEN
        ALTER TABLE public.messages 
        ADD CONSTRAINT messages_sender_id_fkey 
        FOREIGN KEY (sender_id) 
        REFERENCES public.users(id) 
        ON DELETE CASCADE;
    END IF;
END $$;

-- Also ensure the receiver_id foreign key has the expected name
DO $$
BEGIN
    -- Drop existing receiver_id foreign key if it exists with a different name
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name LIKE '%receiver_id%' 
        AND table_name = 'messages' 
        AND constraint_type = 'FOREIGN KEY'
        AND constraint_name != 'messages_receiver_id_fkey'
    ) THEN
        DECLARE
            constraint_name text;
        BEGIN
            SELECT tc.constraint_name INTO constraint_name
            FROM information_schema.table_constraints tc
            WHERE tc.table_name = 'messages' 
            AND tc.constraint_type = 'FOREIGN KEY'
            AND tc.constraint_name LIKE '%receiver_id%'
            AND tc.constraint_name != 'messages_receiver_id_fkey';
            
            EXECUTE 'ALTER TABLE public.messages DROP CONSTRAINT ' || constraint_name;
        END;
    END IF;
END $$;

-- Add the receiver_id foreign key constraint with the expected name (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'messages_receiver_id_fkey' 
        AND table_name = 'messages' 
        AND constraint_type = 'FOREIGN KEY'
    ) THEN
        ALTER TABLE public.messages 
        ADD CONSTRAINT messages_receiver_id_fkey 
        FOREIGN KEY (receiver_id) 
        REFERENCES public.users(id) 
        ON DELETE CASCADE;
    END IF;
END $$;

-- Also ensure the conversation_id foreign key has the expected name
DO $$
BEGIN
    -- Drop existing conversation_id foreign key if it exists with a different name
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name LIKE '%conversation_id%' 
        AND table_name = 'messages' 
        AND constraint_type = 'FOREIGN KEY'
        AND constraint_name != 'messages_conversation_id_fkey'
    ) THEN
        DECLARE
            constraint_name text;
        BEGIN
            SELECT tc.constraint_name INTO constraint_name
            FROM information_schema.table_constraints tc
            WHERE tc.table_name = 'messages' 
            AND tc.constraint_type = 'FOREIGN KEY'
            AND tc.constraint_name LIKE '%conversation_id%'
            AND tc.constraint_name != 'messages_conversation_id_fkey';
            
            EXECUTE 'ALTER TABLE public.messages DROP CONSTRAINT ' || constraint_name;
        END;
    END IF;
END $$;

-- Add the conversation_id foreign key constraint with the expected name (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'messages_conversation_id_fkey' 
        AND table_name = 'messages' 
        AND constraint_type = 'FOREIGN KEY'
    ) THEN
        ALTER TABLE public.messages 
        ADD CONSTRAINT messages_conversation_id_fkey 
        FOREIGN KEY (conversation_id) 
        REFERENCES public.conversations(id) 
        ON DELETE CASCADE;
    END IF;
END $$;

-- Success message
SELECT 'Messages foreign key constraints fixed successfully! ✅' as status;
