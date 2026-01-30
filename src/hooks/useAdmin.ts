import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface AdminUser {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  onboarding_completed: boolean;
  plan: 'free' | 'pro' | 'business';
  max_accounts: number;
  max_projects: number;
  subscription_started_at: string | null;
  subscription_expires_at: string | null;
  role: 'admin' | 'viewer' | 'collaborator';
  accounts_count: number;
  projects_count: number;
}

export function useAdminUsers() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['admin-users', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_users_view')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as AdminUser[];
    },
    enabled: !!user,
  });
}

export function useAdminStats() {
  const { data: users = [] } = useAdminUsers();
  
  const stats = {
    totalUsers: users.length,
    freeUsers: users.filter(u => u.plan === 'free').length,
    proUsers: users.filter(u => u.plan === 'pro').length,
    businessUsers: users.filter(u => u.plan === 'business').length,
    admins: users.filter(u => u.role === 'admin').length,
    totalAccounts: users.reduce((sum, u) => sum + u.accounts_count, 0),
    totalProjects: users.reduce((sum, u) => sum + u.projects_count, 0),
  };

  return stats;
}
