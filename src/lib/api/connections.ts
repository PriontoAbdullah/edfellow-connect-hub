import { supabase } from '../supabase';
import { Database } from '../../types/database';

// Type definitions
export type UserConnection =
  Database['public']['Tables']['user_connections']['Row'];
export type UserConnectionInsert =
  Database['public']['Tables']['user_connections']['Insert'];
export type UserConnectionUpdate =
  Database['public']['Tables']['user_connections']['Update'];

export type ConnectionRequest =
  Database['public']['Tables']['connection_requests']['Row'];
export type ConnectionRequestInsert =
  Database['public']['Tables']['connection_requests']['Insert'];
export type ConnectionRequestUpdate =
  Database['public']['Tables']['connection_requests']['Update'];

export interface ConnectionWithUser extends UserConnection {
  requester: {
    id: string;
    display_name: string;
    role: string;
    avatar?: string;
    university?: string;
    country: string;
  };
  addressee: {
    id: string;
    display_name: string;
    role: string;
    avatar?: string;
    university?: string;
    country: string;
  };
}

export interface ConnectionRequestWithUser extends ConnectionRequest {
  requester: {
    id: string;
    display_name: string;
    role: string;
    avatar?: string;
    university?: string;
    country: string;
  };
  addressee: {
    id: string;
    display_name: string;
    role: string;
    avatar?: string;
    university?: string;
    country: string;
  };
}

export interface ConnectionFilters {
  status?: 'pending' | 'accepted' | 'declined';
  role?: 'student' | 'professor' | 'university';
  country?: string;
  university?: string;
}

// =============================================
// USER CONNECTIONS API FUNCTIONS
// =============================================

/**
 * Get user connections
 */
export const getUserConnections = async (
  userId: string,
  status: 'pending' | 'accepted' | 'declined' = 'accepted',
  limit: number = 50,
  offset: number = 0
): Promise<{
  data: ConnectionWithUser[] | null;
  error: string | null;
  total?: number;
}> => {
  try {
    const { data, error, count } = await supabase
      .from('user_connections')
      .select(
        `
        *,
        requester:users!user_connections_requester_id_fkey(
          id,
          display_name,
          role,
          avatar,
          university,
          country
        ),
        addressee:users!user_connections_addressee_id_fkey(
          id,
          display_name,
          role,
          avatar,
          university,
          country
        )
      `,
        { count: 'exact' }
      )
      .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
      .eq('status', status)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching user connections:', error);
      return { data: null, error: error.message };
    }

    return {
      data: data as ConnectionWithUser[],
      error: null,
      total: count || 0,
    };
  } catch (error) {
    console.error('Unexpected error fetching user connections:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Get connection requests (pending)
 */
export const getConnectionRequests = async (
  userId: string,
  type: 'sent' | 'received' = 'received',
  limit: number = 20,
  offset: number = 0
): Promise<{
  data: ConnectionRequestWithUser[] | null;
  error: string | null;
  total?: number;
}> => {
  try {
    const filterField = type === 'sent' ? 'from_user_id' : 'to_user_id';

    const { data, error, count } = await supabase
      .from('connection_requests')
      .select('id, from_user_id, to_user_id, message, status, created_at', {
        count: 'exact',
      })
      .eq(filterField, userId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching connection requests:', error);
      return { data: null, error: error.message };
    }

    const requests = data || [];
    if (requests.length === 0) {
      return { data: [], error: null, total: 0 };
    }

    // Load requester user info in batch
    const requesterIds = Array.from(
      new Set(
        requests.map((r: any) =>
          type === 'sent' ? r.to_user_id : r.from_user_id
        )
      )
    );
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('id, display_name, role, avatar, university, country')
      .in('id', requesterIds);

    if (usersError) {
      console.error('Error loading users for requests:', usersError);
      return { data: null, error: usersError.message };
    }

    const userMap = new Map((usersData || []).map((u: any) => [u.id, u]));
    const withUsers: ConnectionRequestWithUser[] = requests.map((r: any) => {
      const requesterId = type === 'sent' ? r.to_user_id : r.from_user_id;
      const requester = userMap.get(requesterId);
      return {
        id: r.id,
        message: r.message,
        created_at: r.created_at,
        status: r.status,
        requester: requester || {
          id: requesterId,
          display_name: 'Unknown',
          role: 'student',
          avatar: undefined,
          university: undefined,
          country: '',
        },
      } as unknown as ConnectionRequestWithUser;
    });

    return { data: withUsers, error: null, total: count || 0 };
  } catch (error) {
    console.error('Unexpected error fetching connection requests:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Send connection request
 */
export const sendConnectionRequest = async (
  requesterId: string,
  addresseeId: string,
  message?: string
): Promise<{
  data: ConnectionRequest | null;
  error: string | null;
}> => {
  try {
    // Check if connection already exists
    const { data: existingConnection } = await supabase
      .from('user_connections')
      .select('id')
      .or(
        `and(requester_id.eq.${requesterId},addressee_id.eq.${addresseeId}),and(requester_id.eq.${addresseeId},addressee_id.eq.${requesterId})`
      )
      .maybeSingle();

    if (existingConnection) {
      return { data: null, error: 'Connection already exists' };
    }

    // Check if request already exists
    const { data: existingRequest } = await supabase
      .from('connection_requests')
      .select('id')
      .or(
        `and(from_user_id.eq.${requesterId},to_user_id.eq.${addresseeId}),and(from_user_id.eq.${addresseeId},to_user_id.eq.${requesterId})`
      )
      .eq('status', 'pending')
      .maybeSingle();

    if (existingRequest) {
      return { data: null, error: 'Connection request already exists' };
    }

    const { data, error } = await supabase
      .from('connection_requests')
      .insert({
        from_user_id: requesterId,
        to_user_id: addresseeId,
        message: message || '',
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error sending connection request:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Unexpected error sending connection request:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Accept connection request
 */
export const acceptConnectionRequest = async (
  requestId: string,
  addresseeId: string
): Promise<{
  data: UserConnection | null;
  error: string | null;
}> => {
  try {
    // Get the connection request
    const { data: request, error: requestError } = await supabase
      .from('connection_requests')
      .select('*')
      .eq('id', requestId)
      .eq('to_user_id', addresseeId)
      .eq('status', 'pending')
      .single();

    if (requestError || !request) {
      return { data: null, error: 'Connection request not found' };
    }

    // Update the request status
    const { error: updateError } = await supabase
      .from('connection_requests')
      .update({
        status: 'accepted',
        updated_at: new Date().toISOString(),
      })
      .eq('id', requestId);

    if (updateError) {
      console.error('Error updating connection request:', updateError);
      return { data: null, error: updateError.message };
    }

    // Create the connection
    const { data: connection, error: connectionError } = await supabase
      .from('user_connections')
      .insert({
        requester_id: request.from_user_id,
        addressee_id: request.to_user_id,
        status: 'accepted',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (connectionError) {
      console.error('Error creating connection:', connectionError);
      return { data: null, error: connectionError.message };
    }

    return { data: connection, error: null };
  } catch (error) {
    console.error('Unexpected error accepting connection request:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Decline connection request
 */
export const declineConnectionRequest = async (
  requestId: string,
  addresseeId: string
): Promise<{
  error: string | null;
}> => {
  try {
    const { error } = await supabase
      .from('connection_requests')
      .update({
        status: 'declined',
        updated_at: new Date().toISOString(),
      })
      .eq('id', requestId)
      .eq('to_user_id', addresseeId)
      .eq('status', 'pending');

    if (error) {
      console.error('Error declining connection request:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error('Unexpected error declining connection request:', error);
    return { error: 'An unexpected error occurred' };
  }
};

/**
 * Cancel connection request
 */
export const cancelConnectionRequest = async (
  requestId: string,
  requesterId: string
): Promise<{
  error: string | null;
}> => {
  try {
    const { error } = await supabase
      .from('connection_requests')
      .delete()
      .eq('id', requestId)
      .eq('from_user_id', requesterId)
      .eq('status', 'pending');

    if (error) {
      console.error('Error canceling connection request:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error('Unexpected error canceling connection request:', error);
    return { error: 'An unexpected error occurred' };
  }
};

/**
 * Remove connection
 */
export const removeConnection = async (
  connectionId: string,
  userId: string
): Promise<{
  error: string | null;
}> => {
  try {
    const { error } = await supabase
      .from('user_connections')
      .delete()
      .eq('id', connectionId)
      .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`);

    if (error) {
      console.error('Error removing connection:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error('Unexpected error removing connection:', error);
    return { error: 'An unexpected error occurred' };
  }
};

/**
 * Check if users are connected
 */
export const checkConnection = async (
  userId1: string,
  userId2: string
): Promise<{
  data: {
    isConnected: boolean;
    connectionId?: string;
    status?: 'pending' | 'accepted' | 'declined';
    isRequestSent?: boolean;
    isRequestReceived?: boolean;
  } | null;
  error: string | null;
}> => {
  try {
    // Check for existing connection
    const { data: connection } = await supabase
      .from('user_connections')
      .select('id, status')
      .or(
        `and(requester_id.eq.${userId1},addressee_id.eq.${userId2}),and(requester_id.eq.${userId2},addressee_id.eq.${userId1})`
      )
      .eq('status', 'accepted')
      .maybeSingle();

    if (connection) {
      return {
        data: {
          isConnected: true,
          connectionId: connection.id,
          status: connection.status as 'accepted',
        },
        error: null,
      };
    }

    // Check for pending requests
    const { data: sentRequest } = await supabase
      .from('connection_requests')
      .select('id, status')
      .eq('from_user_id', userId1)
      .eq('to_user_id', userId2)
      .eq('status', 'pending')
      .single();

    if (sentRequest) {
      return {
        data: {
          isConnected: false,
          status: sentRequest.status as 'pending',
          isRequestSent: true,
        },
        error: null,
      };
    }

    const { data: receivedRequest } = await supabase
      .from('connection_requests')
      .select('id, status')
      .eq('from_user_id', userId2)
      .eq('to_user_id', userId1)
      .eq('status', 'pending')
      .single();

    if (receivedRequest) {
      return {
        data: {
          isConnected: false,
          status: receivedRequest.status as 'pending',
          isRequestReceived: true,
        },
        error: null,
      };
    }

    return {
      data: {
        isConnected: false,
      },
      error: null,
    };
  } catch (error) {
    console.error('Unexpected error checking connection:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Get connection statistics
 */
export const getConnectionStats = async (
  userId: string
): Promise<{
  data: {
    totalConnections: number;
    pendingRequests: number;
    sentRequests: number;
  } | null;
  error: string | null;
}> => {
  try {
    const [connections, receivedRequests, sentRequests] = await Promise.all([
      supabase
        .from('user_connections')
        .select('*', { count: 'exact', head: true })
        .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
        .eq('status', 'accepted'),
      supabase
        .from('connection_requests')
        .select('*', { count: 'exact', head: true })
        .eq('to_user_id', userId)
        .eq('status', 'pending'),
      supabase
        .from('connection_requests')
        .select('*', { count: 'exact', head: true })
        .eq('from_user_id', userId)
        .eq('status', 'pending'),
    ]);

    return {
      data: {
        totalConnections: connections.count || 0,
        pendingRequests: receivedRequests.count || 0,
        sentRequests: sentRequests.count || 0,
      },
      error: null,
    };
  } catch (error) {
    console.error('Unexpected error fetching connection stats:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Search connections
 */
export const searchConnections = async (
  userId: string,
  query: string,
  filters: ConnectionFilters = {},
  limit: number = 20,
  offset: number = 0
): Promise<{
  data: ConnectionWithUser[] | null;
  error: string | null;
  total?: number;
}> => {
  try {
    let supabaseQuery = supabase
      .from('user_connections')
      .select(
        `
        *,
        requester:users!user_connections_requester_id_fkey(
          id,
          display_name,
          role,
          avatar,
          university,
          country
        ),
        addressee:users!user_connections_addressee_id_fkey(
          id,
          display_name,
          role,
          avatar,
          university,
          country
        )
      `,
        { count: 'exact' }
      )
      .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
      .eq('status', 'accepted');

    // Apply text search
    if (query) {
      supabaseQuery = supabaseQuery.or(
        `requester.display_name.ilike.%${query}%,addressee.display_name.ilike.%${query}%`
      );
    }

    // Apply filters
    if (filters.role) {
      supabaseQuery = supabaseQuery.or(
        `requester.role.eq.${filters.role},addressee.role.eq.${filters.role}`
      );
    }
    if (filters.country) {
      supabaseQuery = supabaseQuery.or(
        `requester.country.eq.${filters.country},addressee.country.eq.${filters.country}`
      );
    }
    if (filters.university) {
      supabaseQuery = supabaseQuery.or(
        `requester.university.ilike.%${filters.university}%,addressee.university.ilike.%${filters.university}%`
      );
    }

    supabaseQuery = supabaseQuery
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await supabaseQuery;

    if (error) {
      console.error('Error searching connections:', error);
      return { data: null, error: error.message };
    }

    return {
      data: data as ConnectionWithUser[],
      error: null,
      total: count || 0,
    };
  } catch (error) {
    console.error('Unexpected error searching connections:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Subscribe to connection updates
 */
export const subscribeToConnections = (
  userId: string,
  callback: (payload: any) => void
) => {
  let subscription = supabase
    .channel('connections_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'user_connections',
        filter: `requester_id=eq.${userId}`,
      },
      callback
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'user_connections',
        filter: `addressee_id=eq.${userId}`,
      },
      callback
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'connection_requests',
        filter: `from_user_id=eq.${userId}`,
      },
      callback
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'connection_requests',
        filter: `to_user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};
