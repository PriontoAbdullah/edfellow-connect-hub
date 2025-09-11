import { supabase } from '../supabase';
import { Database } from '../../types/database';

// Types for landing page data
export interface LandingPageStats {
  totalUsers: number;
  totalPrograms: number;
  totalPosts: number;
  totalConnections: number;
  activeMentors: number;
  completedSessions: number;
}

export interface FeaturedProgram {
  id: string;
  title: string;
  description: string;
  university: {
    name: string;
    logo_url?: string;
    country: string;
  };
  degree_level: string;
  duration: string;
  location: string;
  cost: string;
  rating: number;
  applications_count: number;
  image_url?: string;
  tags: string[];
  is_featured: boolean;
}

export interface RecentPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
    country: string;
  };
  post_type: 'text' | 'image' | 'video' | 'link' | 'poll';
  visibility: 'public' | 'connections' | 'private';
  tags: string[];
  likes_count: number;
  comments_count: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    role: string;
    university?: string;
    avatar?: string;
    country: string;
  };
  rating: number;
  created_at: string;
}

// Landing page statistics
export const getLandingPageStats = async (): Promise<{
  data: LandingPageStats | null;
  error: string | null;
}> => {
  try {
    // Get total users
    const { count: totalUsers, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (usersError) throw usersError;

    // Get total programs
    const { count: totalPrograms, error: programsError } = await supabase
      .from('university_programs')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    if (programsError) throw programsError;

    // Get total posts
    const { count: totalPosts, error: postsError } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('visibility', 'public');

    if (postsError) throw postsError;

    // Get total connections
    const { count: totalConnections, error: connectionsError } = await supabase
      .from('user_connections')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'accepted');

    if (connectionsError) throw connectionsError;

    // Get active mentors (professors with mentorship enabled)
    const { count: activeMentors, error: mentorsError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'professor')
      .not('mentorship_interests', 'is', null);

    if (mentorsError) throw mentorsError;

    // Get completed mentorship sessions
    const { count: completedSessions, error: sessionsError } = await supabase
      .from('mentorship_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed');

    if (sessionsError) throw sessionsError;

    const stats: LandingPageStats = {
      totalUsers: totalUsers || 0,
      totalPrograms: totalPrograms || 0,
      totalPosts: totalPosts || 0,
      totalConnections: totalConnections || 0,
      activeMentors: activeMentors || 0,
      completedSessions: completedSessions || 0,
    };

    return { data: stats, error: null };
  } catch (error) {
    console.error('Error fetching landing page stats:', error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : 'Failed to fetch statistics',
    };
  }
};

// Featured programs
export const getFeaturedPrograms = async (
  limit: number = 6
): Promise<{
  data: FeaturedProgram[] | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('university_programs')
      .select(
        `
        id,
        title,
        description,
        program_type,
        duration_months,
        department,
        tuition_fee,
        currency,
        language,
        is_featured,
        university:university_id (
          id,
          display_name,
          avatar,
          country
        )
      `
      )
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    // Transform the data to match our interface
    const featuredPrograms: FeaturedProgram[] =
      data?.map((program) => ({
        id: program.id,
        title: program.title,
        description: program.description,
        university: {
          name: program.university?.display_name || 'Unknown University',
          logo_url: program.university?.avatar,
          country: program.university?.country || 'Unknown',
        },
        degree_level: program.program_type,
        duration: `${program.duration_months} months`,
        location: program.department,
        cost: `${program.tuition_fee} ${program.currency}`,
        rating: 4.5, // Default rating since we don't have this field
        applications_count: 0, // Default since we don't have this field
        image_url: undefined,
        tags: [program.program_type, program.department],
        is_featured: program.is_featured,
      })) || [];

    return { data: featuredPrograms, error: null };
  } catch (error) {
    console.error('Error fetching featured programs:', error);
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch featured programs',
    };
  }
};

// Recent public posts
export const getRecentPublicPosts = async (
  limit: number = 8
): Promise<{
  data: RecentPost[] | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        id,
        content,
        post_type,
        tags,
        created_at,
        author:author_id (
          id,
          display_name,
          role,
          avatar,
          country
        )
      `
      )
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    // Transform the data to match our interface
    const recentPosts: RecentPost[] =
      data?.map((post) => ({
        id: post.id,
        title: 'Post', // Default title since posts table doesn't have title
        content: post.content,
        author: {
          name: post.author?.display_name || 'Anonymous',
          role: post.author?.role || 'student',
          avatar: post.author?.avatar,
          country: post.author?.country || 'Unknown',
        },
        post_type: post.post_type,
        visibility: 'public', // Default to public since no visibility column
        tags: post.tags || [],
        likes_count: 0, // Default since no likes_count column
        comments_count: 0, // Default since no comments_count column
        created_at: post.created_at,
      })) || [];

    return { data: recentPosts, error: null };
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : 'Failed to fetch recent posts',
    };
  }
};

// User testimonials
export const getTestimonials = async (
  limit: number = 6
): Promise<{
  data: Testimonial[] | null;
  error: string | null;
}> => {
  try {
    // For now, we'll create some sample testimonials since we don't have a testimonials table yet
    // In a real implementation, you'd have a testimonials table
    const sampleTestimonials: Testimonial[] = [
      {
        id: '1',
        content:
          'EdFellow Connect has transformed my academic journey. The mentorship program connected me with amazing professors who guided me through my research.',
        author: {
          name: 'Sarah Johnson',
          role: 'student',
          university: 'Stanford University',
          country: 'US',
        },
        rating: 5,
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        content:
          'As a professor, I love how this platform allows me to connect with students globally and share knowledge beyond my university walls.',
        author: {
          name: 'Dr. Michael Chen',
          role: 'professor',
          university: 'MIT',
          country: 'US',
        },
        rating: 5,
        created_at: new Date().toISOString(),
      },
      {
        id: '3',
        content:
          "The study groups feature helped me find like-minded students for collaborative learning. It's been a game-changer for my academic success.",
        author: {
          name: 'Ahmed Hassan',
          role: 'student',
          university: 'University of Toronto',
          country: 'CA',
        },
        rating: 5,
        created_at: new Date().toISOString(),
      },
      {
        id: '4',
        content:
          'Our university has seen increased student engagement since joining EdFellow Connect. The platform bridges the gap between institutions.',
        author: {
          name: 'Dr. Emily Rodriguez',
          role: 'university',
          university: 'University of Barcelona',
          country: 'ES',
        },
        rating: 5,
        created_at: new Date().toISOString(),
      },
      {
        id: '5',
        content:
          "The networking opportunities here are incredible. I've made connections that led to research collaborations and career opportunities.",
        author: {
          name: 'Priya Patel',
          role: 'student',
          university: 'Oxford University',
          country: 'GB',
        },
        rating: 5,
        created_at: new Date().toISOString(),
      },
      {
        id: '6',
        content:
          'EdFellow Connect has revolutionized how we approach international education. The platform makes global learning accessible to everyone.',
        author: {
          name: 'Prof. James Wilson',
          role: 'professor',
          university: 'Harvard University',
          country: 'US',
        },
        rating: 5,
        created_at: new Date().toISOString(),
      },
    ];

    return { data: sampleTestimonials.slice(0, limit), error: null };
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : 'Failed to fetch testimonials',
    };
  }
};

// Get all landing page data in one call
export const getLandingPageData = async (): Promise<{
  data: {
    stats: LandingPageStats;
    featuredPrograms: FeaturedProgram[];
    recentPosts: RecentPost[];
    testimonials: Testimonial[];
  } | null;
  error: string | null;
}> => {
  try {
    // Fetch all data in parallel
    const [statsResult, programsResult, postsResult, testimonialsResult] =
      await Promise.all([
        getLandingPageStats(),
        getFeaturedPrograms(6),
        getRecentPublicPosts(8),
        getTestimonials(6),
      ]);

    // Check for errors
    if (statsResult.error) throw new Error(`Stats: ${statsResult.error}`);
    if (programsResult.error)
      throw new Error(`Programs: ${programsResult.error}`);
    if (postsResult.error) throw new Error(`Posts: ${postsResult.error}`);
    if (testimonialsResult.error)
      throw new Error(`Testimonials: ${testimonialsResult.error}`);

    // Return combined data
    return {
      data: {
        stats: statsResult.data!,
        featuredPrograms: programsResult.data!,
        recentPosts: postsResult.data!,
        testimonials: testimonialsResult.data!,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error fetching landing page data:', error);
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch landing page data',
    };
  }
};

// Community Groups (Study Groups)
export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  member_count: number;
  activity_level: 'low' | 'medium' | 'high';
  last_activity: string;
  tags: string[];
  is_featured: boolean;
  privacy: 'public' | 'private';
  created_at: string;
}

export const getCommunityGroups = async (
  limit: number = 6
): Promise<{
  data: CommunityGroup[] | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('groups')
      .select(
        `
        id,
        name,
        description,
        cover_image,
        max_members,
        category,
        subject_area,
        university,
        department,
        level,
        is_private,
        is_verified,
        created_at
      `
      )
      .eq('is_private', false)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    const communityGroups: CommunityGroup[] =
      data?.map((group) => ({
        id: group.id,
        name: group.name,
        description: group.description,
        image_url: group.cover_image,
        member_count: group.max_members || 0,
        activity_level: 'medium', // Default activity level
        last_activity: group.created_at, // Use created_at as last_activity
        tags: [group.category, group.subject_area].filter(Boolean),
        is_featured: group.is_verified || false,
        privacy: group.is_private ? 'private' : 'public',
        created_at: group.created_at,
      })) || [];

    return { data: communityGroups, error: null };
  } catch (error) {
    console.error('Error fetching community groups:', error);
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch community groups',
    };
  }
};

// Community Users (Featured Profiles)
export interface CommunityUser {
  id: string;
  display_name: string;
  role: 'student' | 'professor' | 'university';
  avatar?: string;
  country: string;
  university?: string;
  field?: string;
  program?: string;
  status?: string;
  publications?: string;
  ranking?: string;
  students?: string;
  skills?: string[];
  fields?: string[];
  rating: number;
  connections_count: number;
  is_featured: boolean;
}

export const getCommunityUsers = async (
  limit: number = 6
): Promise<{
  data: CommunityUser[] | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(
        `
        id,
        display_name,
        role,
        avatar,
        country,
        university,
        field,
        program,
        status,
        publications,
        ranking,
        students,
        skills,
        fields,
        rating,
        connections_count,
        profile_views
      `
      )
      .not('bio', 'is', null)
      .order('profile_views', { ascending: false })
      .limit(limit);

    if (error) throw error;

    const communityUsers: CommunityUser[] =
      data?.map((user) => ({
        id: user.id,
        display_name: user.display_name,
        role: user.role,
        avatar: user.avatar,
        country: user.country || 'Unknown',
        university: user.university,
        field: user.field,
        program: user.program,
        status: user.status,
        publications: user.publications,
        ranking: user.ranking,
        students: user.students,
        skills: user.skills || [],
        fields: user.fields || [],
        rating: 4.5, // Default rating
        connections_count: user.connections || 0,
        is_featured: true, // Default to true for sample data
      })) || [];

    return { data: communityUsers, error: null };
  } catch (error) {
    console.error('Error fetching community users:', error);
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch community users',
    };
  }
};

// Featured Professors (Mentorship Showcase)
export interface FeaturedProfessor {
  id: string;
  display_name: string;
  avatar?: string;
  title: string;
  university: string;
  rating: number;
  reviews_count: number;
  hourly_rate: number;
  specialties: string[];
  sessions_completed: number;
  availability: string;
  is_featured: boolean;
}

export const getFeaturedProfessors = async (
  limit: number = 6
): Promise<{
  data: FeaturedProfessor[] | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(
        `
        id,
        display_name,
        avatar,
        title,
        university,
        rating,
        reviews_count,
        hourly_rate,
        specialties,
        sessions_completed,
        availability,
        profile_views
      `
      )
      .eq('role', 'professor')
      .not('mentorship_interests', 'is', null)
      .order('rating', { ascending: false })
      .limit(limit);

    if (error) throw error;

    const featuredProfessors: FeaturedProfessor[] =
      data?.map((professor) => ({
        id: professor.id,
        display_name: professor.display_name,
        avatar: professor.avatar,
        title: professor.title || 'Professor',
        university: professor.university || 'Unknown University',
        rating: professor.rating || 0,
        reviews_count: professor.reviews_count || 0,
        hourly_rate: professor.hourly_rate || 0,
        specialties: professor.specialties || [],
        sessions_completed: professor.sessions_completed || 0,
        availability: professor.availability || 'Available',
        is_featured: true, // Default to true for sample data
      })) || [];

    return { data: featuredProfessors, error: null };
  } catch (error) {
    console.error('Error fetching featured professors:', error);
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch featured professors',
    };
  }
};

// Opportunities (Jobs, Scholarships, Internships)
export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: 'job' | 'scholarship' | 'internship' | 'research';
  organization: string;
  organization_logo?: string;
  location: string;
  salary?: string;
  duration?: string;
  requirements: string[];
  benefits: string[];
  application_deadline?: string;
  rating: number;
  applications_count: number;
  image_url?: string;
  tags: string[];
  is_featured: boolean;
  created_at: string;
}

export const getOpportunities = async (
  limit: number = 6
): Promise<{
  data: Opportunity[] | null;
  error: string | null;
}> => {
  try {
    // Get jobs
    const { data: jobs, error: jobsError } = await supabase
      .from('job_postings')
      .select(
        `
        id,
        title,
        description,
        company_name,
        company_logo,
        location,
        job_type,
        category,
        salary_min,
        salary_max,
        currency,
        experience_level,
        education_level,
        skills_required,
        requirements,
        benefits,
        application_deadline,
        is_featured,
        created_at
      `
      )
      .eq('is_active', true)
      .eq('is_featured', true)
      .limit(Math.ceil(limit / 2));

    if (jobsError) throw jobsError;

    // Get scholarships
    const { data: scholarships, error: scholarshipsError } = await supabase
      .from('scholarships')
      .select(
        `
        id,
        title,
        description,
        amount,
        eligibility_criteria,
        application_deadline,
        is_active,
        university_id,
        created_at
      `
      )
      .eq('is_active', true)
      .limit(Math.ceil(limit / 2));

    if (scholarshipsError) throw scholarshipsError;

    // Combine and transform data
    const opportunities: Opportunity[] = [
      ...(jobs?.map((job) => ({
        id: job.id,
        title: job.title,
        description: job.description,
        type: 'job' as const,
        organization: job.company_name,
        organization_logo: job.company_logo,
        location: job.location,
        salary:
          job.salary_min && job.salary_max
            ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
            : 'Salary not specified',
        requirements: job.requirements || [],
        benefits: job.benefits || [],
        application_deadline: job.application_deadline,
        rating: 4.0, // Default rating
        applications_count: 0, // Default count
        image_url: undefined,
        tags: [job.job_type, job.category, job.experience_level].filter(
          Boolean
        ),
        is_featured: job.is_featured || false,
        created_at: job.created_at,
      })) || []),
      ...(scholarships?.map((scholarship) => ({
        id: scholarship.id,
        title: scholarship.title,
        description: scholarship.description,
        type: 'scholarship' as const,
        organization: 'University', // Default organization
        organization_logo: undefined,
        location: 'Various',
        salary: scholarship.amount,
        duration: undefined,
        requirements: scholarship.eligibility_criteria
          ? [scholarship.eligibility_criteria]
          : [],
        benefits: [],
        application_deadline: scholarship.application_deadline,
        rating: 4.0, // Default rating
        applications_count: 0, // Default count
        image_url: undefined,
        tags: ['scholarship'],
        is_featured: true, // Default to true for sample data
        created_at: scholarship.created_at,
      })) || []),
    ];

    // Sort by rating and limit
    const sortedOpportunities = opportunities
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);

    return { data: sortedOpportunities, error: null };
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch opportunities',
    };
  }
};

// Real-time subscription for statistics updates
export const subscribeToLandingPageStats = (
  callback: (stats: LandingPageStats) => void
) => {
  // Subscribe to user count changes
  const userSubscription = supabase
    .channel('landing-stats-users')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'users' },
      async () => {
        const { data } = await getLandingPageStats();
        if (data) callback(data);
      }
    )
    .subscribe();

  // Subscribe to program count changes
  const programSubscription = supabase
    .channel('landing-stats-programs')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'university_programs' },
      async () => {
        const { data } = await getLandingPageStats();
        if (data) callback(data);
      }
    )
    .subscribe();

  // Subscribe to post count changes
  const postSubscription = supabase
    .channel('landing-stats-posts')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'posts' },
      async () => {
        const { data } = await getLandingPageStats();
        if (data) callback(data);
      }
    )
    .subscribe();

  // Return cleanup function
  return () => {
    userSubscription.unsubscribe();
    programSubscription.unsubscribe();
    postSubscription.unsubscribe();
  };
};
