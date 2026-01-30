import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

const demoAccount = {
  name: 'Conta Demonstração',
  email: 'demo@exemplo.com',
  color: 'blue' as const,
  credits: 100,
};

const demoProjects = [
  {
    name: 'E-commerce Fashion Store',
    description: 'Loja virtual completa com carrinho, checkout e integração de pagamentos',
    url: 'https://fashion-store.lovable.app',
    screenshot: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    status: 'published',
    type: 'website',
    progress: 100,
    is_favorite: true,
    notes: 'Projeto exemplo para demonstrar funcionalidades do painel.',
    view_count: 245,
    deadline: null, // Completed, no deadline
  },
  {
    name: 'Landing Page Startup',
    description: 'Página de captura com formulário e integração de email marketing',
    url: 'https://startup-landing.lovable.app',
    screenshot: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    status: 'published',
    type: 'landing',
    progress: 100,
    is_favorite: false,
    view_count: 189,
    deadline: null, // Completed, no deadline
  },
  {
    name: 'Dashboard Analytics',
    description: 'Painel administrativo com gráficos e relatórios em tempo real',
    url: 'https://analytics-dash.lovable.app',
    screenshot: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    status: 'draft',
    type: 'app',
    progress: 65,
    is_favorite: false,
    notes: 'Em desenvolvimento - falta integrar API de dados.',
    view_count: 67,
    deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days overdue
  },
  {
    name: 'Funil de Vendas Curso',
    description: 'Funil completo com VSL, página de vendas e checkout',
    url: 'https://curso-digital.lovable.app',
    screenshot: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=450&fit=crop',
    status: 'draft',
    type: 'funnel',
    progress: 40,
    is_favorite: false,
    notes: 'Precisa finalizar urgente!',
    view_count: 1024,
    deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days overdue
  },
];

const demoTags = [
  { name: 'E-commerce', color: 'blue' },
  { name: 'Landing Page', color: 'emerald' },
  { name: 'Dashboard', color: 'violet' },
  { name: 'SaaS', color: 'amber' },
];

export function useSeedDemoData() {
  const { user } = useAuth();
  const [seeding, setSeeding] = useState(false);

  const seedDemoData = useCallback(async () => {
    if (!user?.id) return false;
    
    setSeeding(true);
    
    try {
      // Check if user already has data
      const { data: existingAccounts } = await supabase
        .from('lovable_accounts')
        .select('id')
        .eq('user_id', user.id)
        .limit(1);

      if (existingAccounts && existingAccounts.length > 0) {
        console.log('User already has data, skipping seed');
        setSeeding(false);
        return false;
      }

      // Create demo account
      const { data: account, error: accountError } = await supabase
        .from('lovable_accounts')
        .insert({
          ...demoAccount,
          user_id: user.id,
        })
        .select()
        .single();

      if (accountError) throw accountError;

      // Create demo tags
      const { data: tags, error: tagsError } = await supabase
        .from('tags')
        .insert(demoTags.map(tag => ({
          ...tag,
          user_id: user.id,
        })))
        .select();

      if (tagsError) throw tagsError;

      // Create demo projects
      const projectsToInsert = demoProjects.map(project => ({
        ...project,
        user_id: user.id,
        account_id: account.id,
      }));

      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .insert(projectsToInsert)
        .select();

      if (projectsError) throw projectsError;

      // Link tags to projects
      if (projects && tags) {
        const projectTagLinks = [
          { project: projects[0], tags: [tags[0], tags[3]] }, // E-commerce + SaaS
          { project: projects[1], tags: [tags[1]] }, // Landing Page
          { project: projects[2], tags: [tags[2], tags[3]] }, // Dashboard + SaaS
          { project: projects[3], tags: [tags[1]] }, // Landing Page (funnel)
        ];

        for (const link of projectTagLinks) {
          if (link.project) {
            await supabase
              .from('project_tags')
              .insert(
                link.tags.map(tag => ({
                  project_id: link.project.id,
                  tag_id: tag.id,
                }))
              );
          }
        }
      }

      console.log('Demo data seeded successfully');
      setSeeding(false);
      return true;
    } catch (error) {
      console.error('Error seeding demo data:', error);
      setSeeding(false);
      return false;
    }
  }, [user?.id]);

  return {
    seedDemoData,
    seeding,
  };
}
