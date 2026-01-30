import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface LovableAccount {
  id: string;
  user_id: string;
  email: string;
  name: string;
  color: 'blue' | 'emerald' | 'amber' | 'rose' | 'violet';
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  user_id: string;
  name: string;
  color: string;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  account_id: string;
  name: string;
  description: string | null;
  url: string | null;
  screenshot: string | null;
  status: 'published' | 'draft' | 'archived';
  type: 'website' | 'landing' | 'app' | 'funnel' | 'other';
  is_favorite: boolean;
  notes: string | null;
  view_count: number;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
}

// Accounts
export function useAccounts() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['accounts', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lovable_accounts')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as LovableAccount[];
    },
    enabled: !!user,
  });
}

export function useCreateAccount() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (account: Omit<LovableAccount, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('lovable_accounts')
        .insert({ ...account, user_id: user!.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<LovableAccount> & { id: string }) => {
      const { data, error } = await supabase
        .from('lovable_accounts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('lovable_accounts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// Tags
export function useTags() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['tags', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data as Tag[];
    },
    enabled: !!user,
  });
}

export function useCreateTag() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (tag: Omit<Tag, 'id' | 'user_id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('tags')
        .insert({ ...tag, user_id: user!.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
}

// Projects
export function useProjects() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['projects', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_tags (
            tag_id,
            tags (*)
          )
        `)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform data to include tags array
      return data.map(project => ({
        ...project,
        tags: project.project_tags?.map((pt: any) => pt.tags) || [],
      })) as Project[];
    },
    enabled: !!user,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (project: Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'view_count' | 'tags'> & { tagIds?: string[] }) => {
      const { tagIds, ...projectData } = project;
      
      const { data, error } = await supabase
        .from('projects')
        .insert({ ...projectData, user_id: user!.id })
        .select()
        .single();
      
      if (error) throw error;
      
      // Add tags if provided
      if (tagIds && tagIds.length > 0) {
        const { error: tagError } = await supabase
          .from('project_tags')
          .insert(tagIds.map(tagId => ({
            project_id: data.id,
            tag_id: tagId,
          })));
        
        if (tagError) throw tagError;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, tagIds, ...updates }: Partial<Project> & { id: string; tagIds?: string[] }) => {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      // Update tags if provided
      if (tagIds !== undefined) {
        // Remove existing tags
        await supabase
          .from('project_tags')
          .delete()
          .eq('project_id', id);
        
        // Add new tags
        if (tagIds.length > 0) {
          const { error: tagError } = await supabase
            .from('project_tags')
            .insert(tagIds.map(tagId => ({
              project_id: id,
              tag_id: tagId,
            })));
          
          if (tagError) throw tagError;
        }
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, isFavorite }: { id: string; isFavorite: boolean }) => {
      const { error } = await supabase
        .from('projects')
        .update({ is_favorite: isFavorite })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
