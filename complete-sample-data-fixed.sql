-- COMPLETE SAMPLE DATA SCRIPT - ALL TABLES FIXED
-- This script adds sample data to make the application functional
-- All table structures have been verified and corrected

-- First, let's update existing users with better data
-- Update the first user to be a student
UPDATE public.users 
SET 
  display_name = 'Sarah Johnson',
  role = 'student',
  first_name = 'Sarah',
  last_name = 'Johnson',
  country = 'US',
  university = 'Stanford University',
  major = 'Computer Science',
  bio = 'Passionate CS student interested in AI and machine learning',
  skills = ARRAY['Python', 'JavaScript', 'React'],
  profile_completed = true,
  email_verified = true,
  avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
WHERE id = (SELECT id FROM public.users LIMIT 1);

-- Insert sample university programs (using existing user as university)
INSERT INTO public.university_programs (id, title, description, program_type, department, duration_months, tuition_fee, currency, language, is_active, is_featured, created_by, university_id) VALUES
('11111111-1111-1111-1111-111111111111', 'Master of Computer Science', 'Advanced computer science program with focus on AI and machine learning', 'graduate', 'Computer Science', 24, 58000, 'USD', 'English', true, true, (SELECT id FROM public.users LIMIT 1), (SELECT id FROM public.users LIMIT 1)),
('22222222-2222-2222-2222-222222222222', 'PhD in Engineering', 'Doctoral program in engineering with research opportunities', 'phd', 'Engineering', 48, 65000, 'USD', 'English', true, true, (SELECT id FROM public.users LIMIT 1), (SELECT id FROM public.users LIMIT 1));

-- Insert sample groups
INSERT INTO public.groups (id, name, description, category, subject_area, university, department, level, max_members, is_private, is_verified, created_by) VALUES
('33333333-3333-3333-3333-333333333333', 'Computer Science Students', 'Connect and collaborate on coding challenges, projects, and career opportunities', 'study', 'Computer Science', 'Stanford University', 'Computer Science', 'mixed', 100, false, true, (SELECT id FROM public.users LIMIT 1)),
('44444444-4444-4444-4444-444444444444', 'Engineering Students Global', 'Connect with engineering students worldwide. Share projects, discuss innovations, and collaborate on technical challenges', 'study', 'Engineering', 'MIT', 'Engineering', 'mixed', 150, false, true, (SELECT id FROM public.users LIMIT 1));

-- Insert sample job postings
INSERT INTO public.job_postings (id, title, description, company_name, location, job_type, category, salary_min, salary_max, currency, experience_level, education_level, skills_required, requirements, benefits, is_active, is_featured, posted_by) VALUES
('55555555-5555-5555-5555-555555555555', 'Software Engineer Intern', 'Join our team as a software engineer intern and work on cutting-edge projects', 'Tech Corp', 'San Francisco, CA', 'internship', 'technical', 80000, 120000, 'USD', 'entry', 'bachelor', ARRAY['Python', 'JavaScript', 'React'], ARRAY['Python', 'JavaScript', 'React'], ARRAY['Health Insurance', '401k', 'Flexible Hours'], true, true, (SELECT id FROM public.users LIMIT 1)),
('66666666-6666-6666-6666-666666666666', 'Data Science Intern', 'Work with our data science team on machine learning projects', 'Data Inc', 'New York, NY', 'internship', 'research', 70000, 100000, 'USD', 'entry', 'bachelor', ARRAY['Python', 'Machine Learning', 'Statistics'], ARRAY['Python', 'Machine Learning', 'Statistics'], ARRAY['Health Insurance', '401k', 'Remote Work'], true, true, (SELECT id FROM public.users LIMIT 1));

-- Insert sample scholarships (using the actual table structure - no currency column)
INSERT INTO public.scholarships (id, title, description, amount, eligibility_criteria, application_deadline, is_active, university_id) VALUES
('77777777-7777-7777-7777-777777777777', 'Merit Scholarship', 'Scholarship for outstanding academic performance', '$10,000', 'GPA 3.5+, Full-time student', NOW() + INTERVAL '30 days', true, (SELECT id FROM public.users LIMIT 1)),
('88888888-8888-8888-8888-888888888888', 'Research Fellowship', 'Fellowship for graduate research students', '$25,000', 'Graduate student, Research proposal', NOW() + INTERVAL '45 days', true, (SELECT id FROM public.users LIMIT 1));

-- Insert sample posts (using basic structure without is_public)
INSERT INTO public.posts (id, author_id, content, post_type, tags, created_at) VALUES
('99999999-9999-9999-9999-999999999999', (SELECT id FROM public.users LIMIT 1), 'Just finished my machine learning project! Excited to share the results with the community.', 'text', ARRAY['Machine Learning', 'Project'], NOW()),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', (SELECT id FROM public.users LIMIT 1), 'Looking for motivated students to join my research lab. We focus on AI applications in healthcare.', 'text', ARRAY['Research', 'AI', 'Healthcare'], NOW());

-- Skip connections for now - need at least 2 users to create valid connections
-- INSERT INTO public.user_connections (id, requester_id, addressee_id, status, created_at) VALUES
-- ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', (SELECT id FROM public.users LIMIT 1), (SELECT id FROM public.users LIMIT 1), 'accepted', NOW());

-- Insert sample mentorship profiles
INSERT INTO public.mentorship_profiles (id, user_id, title, description, expertise_areas, hourly_rate, currency, is_available, is_featured, rating, total_sessions) VALUES
('cccccccc-cccc-cccc-cccc-cccccccccccc', (SELECT id FROM public.users LIMIT 1), 'AI and Machine Learning Mentor', 'Experienced professor offering mentorship in AI and machine learning', ARRAY['Machine Learning', 'AI', 'Research'], 75, 'USD', true, true, 4.9, 847);

-- Insert sample notifications
INSERT INTO public.notifications (id, user_id, type, title, message, is_read, created_at) VALUES
('dddddddd-dddd-dddd-dddd-dddddddddddd', (SELECT id FROM public.users LIMIT 1), 'connection_request', 'New Connection Request', 'Dr. Michael Chen wants to connect with you', false, NOW()),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', (SELECT id FROM public.users LIMIT 1), 'connection_accepted', 'Welcome to EdFellow!', 'Welcome to the EdFellow Connect Hub. Start exploring and connecting!', false, NOW());
