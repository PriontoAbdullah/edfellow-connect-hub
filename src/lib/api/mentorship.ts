import { supabase } from '@/lib/supabase';

export interface MentorshipProfile {
  id: string;
  user_id: string;
  title: string;
  description: string;
  expertise_areas: string[];
  hourly_rate?: number;
  currency: string;
  session_duration_minutes: number;
  max_sessions_per_week: number;
  is_available: boolean;
  is_featured: boolean;
  rating: number;
  total_sessions: number;
  total_rating_count: number;
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    email?: string;
  };
}

export interface MentorshipAvailability {
  id: string;
  mentorship_profile_id: string;
  day_of_week: number; // 0 = Sunday, 1 = Monday, etc.
  start_time: string;
  end_time: string;
  timezone: string;
  is_recurring: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MentorshipSession {
  id: string;
  mentorship_profile_id: string;
  mentee_id: string;
  session_type: 'one-on-one' | 'group' | 'workshop' | 'consultation';
  title: string;
  description?: string;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  status:
    | 'scheduled'
    | 'confirmed'
    | 'in-progress'
    | 'completed'
    | 'cancelled'
    | 'no-show';
  meeting_link?: string;
  meeting_platform?: 'zoom' | 'teams' | 'google-meet' | 'in-person' | 'other';
  location?: string;
  notes?: string;
  mentee_notes?: string;
  mentor_notes?: string;
  rating?: number;
  feedback?: string;
  created_at: string;
  updated_at: string;
  mentorship_profile?: MentorshipProfile;
  mentee?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    email?: string;
  };
}

export interface MentorshipRequest {
  id: string;
  mentorship_profile_id: string;
  mentee_id: string;
  request_type: 'session' | 'ongoing' | 'consultation';
  title: string;
  description: string;
  preferred_dates?: string[];
  preferred_times?: string[];
  duration_minutes: number;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  response_message?: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
  mentorship_profile?: MentorshipProfile;
  mentee?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    email?: string;
  };
}

export interface MentorshipReview {
  id: string;
  session_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  review_text?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  session?: MentorshipSession;
  reviewer?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
  };
  reviewee?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
  };
}

export interface MentorshipCalendarEvent {
  id: string;
  session_id?: string;
  mentorship_profile_id: string;
  event_type: 'session' | 'availability' | 'blocked' | 'holiday';
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  is_all_day: boolean;
  is_recurring: boolean;
  recurrence_pattern?: any;
  created_by: string;
  created_at: string;
  updated_at: string;
  session?: MentorshipSession;
  mentorship_profile?: MentorshipProfile;
  creator?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
  };
}

export interface MentorshipNotification {
  id: string;
  user_id: string;
  session_id?: string;
  request_id?: string;
  notification_type:
    | 'session_reminder'
    | 'session_cancelled'
    | 'request_received'
    | 'request_accepted'
    | 'request_declined'
    | 'review_received'
    | 'availability_updated';
  title: string;
  message: string;
  is_read: boolean;
  scheduled_for?: string;
  created_at: string;
  session?: MentorshipSession;
  request?: MentorshipRequest;
}

// Mentorship Profile Functions
export const createMentorshipProfile = async (profileData: {
  title: string;
  description: string;
  expertise_areas: string[];
  hourly_rate?: number;
  currency?: string;
  session_duration_minutes?: number;
  max_sessions_per_week?: number;
}): Promise<{ data: MentorshipProfile | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('mentorship_profiles')
      .insert({
        ...profileData,
        user_id: user.id,
        currency: profileData.currency || 'USD',
        session_duration_minutes: profileData.session_duration_minutes || 60,
        max_sessions_per_week: profileData.max_sessions_per_week || 10,
      })
      .select(
        `
        *,
        user:user_id(id, display_name, avatar, role, email)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to create mentorship profile' };
  }
};

export const getMentorshipProfiles = async (filters?: {
  expertise_area?: string;
  is_available?: boolean;
  is_featured?: boolean;
  min_rating?: number;
  max_hourly_rate?: number;
  search?: string;
}): Promise<{ data: MentorshipProfile[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('mentorship_profiles')
      .select(
        `
        *,
        user:user_id(id, display_name, avatar, role, email)
      `
      )
      .order('is_featured', { ascending: false })
      .order('rating', { ascending: false })
      .order('created_at', { ascending: false });

    if (filters?.expertise_area) {
      query = query.contains('expertise_areas', [filters.expertise_area]);
    }

    if (filters?.is_available !== undefined) {
      query = query.eq('is_available', filters.is_available);
    }

    if (filters?.is_featured !== undefined) {
      query = query.eq('is_featured', filters.is_featured);
    }

    if (filters?.min_rating) {
      query = query.gte('rating', filters.min_rating);
    }

    if (filters?.max_hourly_rate) {
      query = query.lte('hourly_rate', filters.max_hourly_rate);
    }

    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch mentorship profiles' };
  }
};

export const getMentorshipProfile = async (
  profileId: string
): Promise<{ data: MentorshipProfile | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('mentorship_profiles')
      .select(
        `
        *,
        user:user_id(id, display_name, avatar, role, email)
      `
      )
      .eq('id', profileId)
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch mentorship profile' };
  }
};

export const updateMentorshipProfile = async (
  profileId: string,
  updates: Partial<MentorshipProfile>
): Promise<{ data: MentorshipProfile | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('mentorship_profiles')
      .update(updates)
      .eq('id', profileId)
      .select(
        `
        *,
        user:user_id(id, display_name, avatar, role, email)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to update mentorship profile' };
  }
};

// Mentorship Availability Functions
export const createMentorshipAvailability = async (availabilityData: {
  mentorship_profile_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  timezone?: string;
  is_recurring?: boolean;
}): Promise<{ data: MentorshipAvailability | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('mentorship_availability')
      .insert({
        ...availabilityData,
        timezone: availabilityData.timezone || 'UTC',
        is_recurring: availabilityData.is_recurring || true,
      })
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to create mentorship availability' };
  }
};

export const getMentorshipAvailability = async (
  profileId: string
): Promise<{ data: MentorshipAvailability[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('mentorship_availability')
      .select('*')
      .eq('mentorship_profile_id', profileId)
      .eq('is_active', true)
      .order('day_of_week', { ascending: true })
      .order('start_time', { ascending: true });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch mentorship availability' };
  }
};

export const updateMentorshipAvailability = async (
  availabilityId: string,
  updates: Partial<MentorshipAvailability>
): Promise<{ data: MentorshipAvailability | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('mentorship_availability')
      .update(updates)
      .eq('id', availabilityId)
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to update mentorship availability' };
  }
};

export const deleteMentorshipAvailability = async (
  availabilityId: string
): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase
      .from('mentorship_availability')
      .delete()
      .eq('id', availabilityId);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    return { error: 'Failed to delete mentorship availability' };
  }
};

// Mentorship Session Functions
export const createMentorshipSession = async (sessionData: {
  mentorship_profile_id: string;
  mentee_id: string;
  session_type: 'one-on-one' | 'group' | 'workshop' | 'consultation';
  title: string;
  description?: string;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  meeting_link?: string;
  meeting_platform?: 'zoom' | 'teams' | 'google-meet' | 'in-person' | 'other';
  location?: string;
}): Promise<{ data: MentorshipSession | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('mentorship_sessions')
      .insert(sessionData)
      .select(
        `
        *,
        mentorship_profile:mentorship_profile_id(*, user:user_id(id, display_name, avatar, role, email)),
        mentee:mentee_id(id, display_name, avatar, role, email)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to create mentorship session' };
  }
};

export const getMentorshipSessions = async (filters?: {
  mentorship_profile_id?: string;
  mentee_id?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
}): Promise<{ data: MentorshipSession[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('mentorship_sessions')
      .select(
        `
        *,
        mentorship_profile:mentorship_profile_id(*, user:user_id(id, display_name, avatar, role, email)),
        mentee:mentee_id(id, display_name, avatar, role, email)
      `
      )
      .order('start_time', { ascending: true });

    if (filters?.mentorship_profile_id) {
      query = query.eq('mentorship_profile_id', filters.mentorship_profile_id);
    }

    if (filters?.mentee_id) {
      query = query.eq('mentee_id', filters.mentee_id);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.date_from) {
      query = query.gte('scheduled_date', filters.date_from);
    }

    if (filters?.date_to) {
      query = query.lte('scheduled_date', filters.date_to);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch mentorship sessions' };
  }
};

export const updateMentorshipSession = async (
  sessionId: string,
  updates: Partial<MentorshipSession>
): Promise<{ data: MentorshipSession | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('mentorship_sessions')
      .update(updates)
      .eq('id', sessionId)
      .select(
        `
        *,
        mentorship_profile:mentorship_profile_id(*, user:user_id(id, display_name, avatar, role, email)),
        mentee:mentee_id(id, display_name, avatar, role, email)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to update mentorship session' };
  }
};

// Mentorship Request Functions
export const createMentorshipRequest = async (requestData: {
  mentorship_profile_id: string;
  mentee_id: string;
  request_type: 'session' | 'ongoing' | 'consultation';
  title: string;
  description: string;
  preferred_dates?: string[];
  preferred_times?: string[];
  duration_minutes?: number;
  expires_at?: string;
}): Promise<{ data: MentorshipRequest | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('mentorship_requests')
      .insert({
        ...requestData,
        mentee_id: user.id,
        duration_minutes: requestData.duration_minutes || 60,
      })
      .select(
        `
        *,
        mentorship_profile:mentorship_profile_id(*, user:user_id(id, display_name, avatar, role, email)),
        mentee:mentee_id(id, display_name, avatar, role, email)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to create mentorship request' };
  }
};

export const getMentorshipRequests = async (filters?: {
  mentorship_profile_id?: string;
  mentee_id?: string;
  status?: string;
}): Promise<{ data: MentorshipRequest[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('mentorship_requests')
      .select(
        `
        *,
        mentorship_profile:mentorship_profile_id(*, user:user_id(id, display_name, avatar, role, email)),
        mentee:mentee_id(id, display_name, avatar, role, email)
      `
      )
      .order('created_at', { ascending: false });

    if (filters?.mentorship_profile_id) {
      query = query.eq('mentorship_profile_id', filters.mentorship_profile_id);
    }

    if (filters?.mentee_id) {
      query = query.eq('mentee_id', filters.mentee_id);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch mentorship requests' };
  }
};

export const updateMentorshipRequest = async (
  requestId: string,
  updates: Partial<MentorshipRequest>
): Promise<{ data: MentorshipRequest | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('mentorship_requests')
      .update(updates)
      .eq('id', requestId)
      .select(
        `
        *,
        mentorship_profile:mentorship_profile_id(*, user:user_id(id, display_name, avatar, role, email)),
        mentee:mentee_id(id, display_name, avatar, role, email)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to update mentorship request' };
  }
};

// Mentorship Review Functions
export const createMentorshipReview = async (reviewData: {
  session_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  review_text?: string;
  is_public?: boolean;
}): Promise<{ data: MentorshipReview | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('mentorship_reviews')
      .insert({
        ...reviewData,
        is_public: reviewData.is_public || true,
      })
      .select(
        `
        *,
        session:session_id(*),
        reviewer:reviewer_id(id, display_name, avatar, role),
        reviewee:reviewee_id(id, display_name, avatar, role)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to create mentorship review' };
  }
};

export const getMentorshipReviews = async (filters?: {
  reviewee_id?: string;
  reviewer_id?: string;
  is_public?: boolean;
}): Promise<{ data: MentorshipReview[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('mentorship_reviews')
      .select(
        `
        *,
        session:session_id(*),
        reviewer:reviewer_id(id, display_name, avatar, role),
        reviewee:reviewee_id(id, display_name, avatar, role)
      `
      )
      .order('created_at', { ascending: false });

    if (filters?.reviewee_id) {
      query = query.eq('reviewee_id', filters.reviewee_id);
    }

    if (filters?.reviewer_id) {
      query = query.eq('reviewer_id', filters.reviewer_id);
    }

    if (filters?.is_public !== undefined) {
      query = query.eq('is_public', filters.is_public);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch mentorship reviews' };
  }
};

// Calendar Functions
export const getMentorshipCalendarEvents = async (
  profileId: string,
  dateFrom: string,
  dateTo: string
): Promise<{
  data: MentorshipCalendarEvent[] | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('mentorship_calendar_events')
      .select(
        `
        *,
        session:session_id(*),
        mentorship_profile:mentorship_profile_id(*),
        creator:created_by(id, display_name, avatar, role)
      `
      )
      .eq('mentorship_profile_id', profileId)
      .gte('start_time', dateFrom)
      .lte('end_time', dateTo)
      .order('start_time', { ascending: true });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch calendar events' };
  }
};

// Notification Functions
export const getMentorshipNotifications = async (
  userId?: string
): Promise<{ data: MentorshipNotification[] | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('mentorship_notifications')
      .select(
        `
        *,
        session:session_id(*),
        request:request_id(*)
      `
      )
      .eq('user_id', userId || user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch notifications' };
  }
};

export const markNotificationAsRead = async (
  notificationId: string
): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase
      .from('mentorship_notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    return { error: 'Failed to mark notification as read' };
  }
};
