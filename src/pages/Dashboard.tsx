import { useState, useMemo } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { FilterBar } from '@/components/projects/FilterBar';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectList } from '@/components/projects/ProjectList';
import { AddAccountModal } from '@/components/accounts/AddAccountModal';
import { EditAccountModal } from '@/components/accounts/EditAccountModal';
import { AddProjectModal } from '@/components/projects/AddProjectModal';
import { EditProjectModal } from '@/components/projects/EditProjectModal';
import { TagsManager } from '@/components/tags/TagsManager';
import { useAccounts, useProjects, useToggleFavorite, useUpdateProject, useDeleteProject, LovableAccount, Project } from '@/hooks/useProjects';
import { ProjectStatus, ProjectType } from '@/types/project';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeView, setActiveView] = useState('all');
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ProjectType | 'all'>('all');
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  // Modal states
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const [editAccountOpen, setEditAccountOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<LovableAccount | null>(null);
  const [addProjectOpen, setAddProjectOpen] = useState(false);
  const [tagsManagerOpen, setTagsManagerOpen] = useState(false);
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  const { data: accounts = [], isLoading: accountsLoading } = useAccounts();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const toggleFavorite = useToggleFavorite();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const { toast } = useToast();

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // View filter
    if (activeView === 'favorites') {
      filtered = filtered.filter(p => p.is_favorite);
    } else if (activeView === 'archived') {
      filtered = filtered.filter(p => p.status === 'archived');
    }

    // Account filter
    if (selectedAccount) {
      filtered = filtered.filter(p => p.account_id === selectedAccount);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(p => p.type === typeFilter);
    }

    // Tag filter
    if (tagFilter) {
      filtered = filtered.filter(p => 
        p.tags?.some(tag => tag.name === tagFilter)
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        (p.description?.toLowerCase().includes(query)) ||
        p.tags?.some(tag => tag.name.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [projects, activeView, selectedAccount, statusFilter, typeFilter, tagFilter, searchQuery]);

  const handleToggleFavorite = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      toggleFavorite.mutate({ id: projectId, isFavorite: !project.is_favorite });
    }
  };

  const handleEditProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setEditingProject(project);
      setEditProjectOpen(true);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    setDeletingProjectId(projectId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingProjectId) return;
    
    const project = projects.find(p => p.id === deletingProjectId);
    try {
      await deleteProject.mutateAsync(deletingProjectId);
      toast({
        title: 'Projeto excluído',
        description: `O projeto "${project?.name}" foi excluído.`,
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao excluir',
        description: error.message || 'Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setDeletingProjectId(null);
    }
  };

  const handleArchiveProject = async (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const newStatus = project.status === 'archived' ? 'draft' : 'archived';
    try {
      await updateProject.mutateAsync({ id: projectId, status: newStatus });
      toast({
        title: newStatus === 'archived' ? 'Projeto arquivado' : 'Projeto restaurado',
        description: `O projeto "${project.name}" foi ${newStatus === 'archived' ? 'arquivado' : 'restaurado'}.`,
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
    if (view === 'tags') {
      setTagsManagerOpen(true);
    }
  };

  const clearFilters = () => {
    setStatusFilter('all');
    setTypeFilter('all');
    setTagFilter(null);
  };

  const hasActiveFilters = statusFilter !== 'all' || typeFilter !== 'all' || tagFilter !== null;

  const stats = {
    totalProjects: projects.length,
    favorites: projects.filter(p => p.is_favorite).length,
    published: projects.filter(p => p.status === 'published').length,
    archived: projects.filter(p => p.status === 'archived').length,
  };

  const getAccount = (accountId: string): LovableAccount | undefined => 
    accounts.find(a => a.id === accountId);

  const getViewTitle = () => {
    if (selectedAccount) {
      const account = getAccount(selectedAccount);
      return account?.name || 'Conta';
    }
    switch (activeView) {
      case 'favorites': return 'Projetos Favoritos';
      case 'archived': return 'Projetos Arquivados';
      case 'tags': return 'Organizar por Tags';
      default: return 'Todos os Projetos';
    }
  };

  // Transform project data for components
  const transformedProjects = filteredProjects.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description || '',
    url: p.url || '',
    screenshot: p.screenshot,
    status: p.status,
    type: p.type,
    accountId: p.account_id,
    createdAt: new Date(p.created_at),
    updatedAt: new Date(p.updated_at),
    isFavorite: p.is_favorite,
    tags: p.tags?.map(t => t.name) || [],
    notes: p.notes,
    viewCount: p.view_count,
  }));

  const transformedAccounts = accounts.map(a => ({
    id: a.id,
    email: a.email,
    name: a.name,
    color: a.color,
    projectCount: projects.filter(p => p.account_id === a.id).length,
  }));

  const isLoading = accountsLoading || projectsLoading;

  const deletingProject = deletingProjectId ? projects.find(p => p.id === deletingProjectId) : null;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeView={activeView}
        onViewChange={handleViewChange}
        selectedAccount={selectedAccount}
        onAccountChange={setSelectedAccount}
        accounts={accounts}
        isLoading={accountsLoading}
        onAddAccount={() => setAddAccountOpen(true)}
        onEditAccount={(account) => {
          setEditingAccount(account);
          setEditAccountOpen(true);
        }}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onNewProject={() => setAddProjectOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {/* Stats */}
          <StatsCards {...stats} />

          {/* Title */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">{getViewTitle()}</h2>
            <span className="text-sm text-muted-foreground">
              {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Filters */}
          <FilterBar
            statusFilter={statusFilter}
            typeFilter={typeFilter}
            tagFilter={tagFilter}
            onStatusChange={setStatusFilter}
            onTypeChange={setTypeFilter}
            onTagChange={setTagFilter}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* Projects */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
              <p className="text-sm text-muted-foreground">Carregando projetos...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">
                {projects.length === 0 ? 'Nenhum projeto ainda' : 'Nenhum projeto encontrado'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {projects.length === 0 
                  ? 'Adicione uma conta Lovable e comece a gerenciar seus projetos'
                  : 'Tente ajustar seus filtros ou termo de busca'
                }
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {transformedProjects.map((project, index) => {
                const account = getAccount(project.accountId);
                return (
                  <div
                    key={project.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProjectCard
                      project={project}
                      account={account ? {
                        id: account.id,
                        email: account.email,
                        name: account.name,
                        color: account.color,
                        projectCount: transformedAccounts.find(a => a.id === account.id)?.projectCount || 0,
                      } : undefined}
                      onToggleFavorite={handleToggleFavorite}
                      onEdit={handleEditProject}
                      onDelete={handleDeleteProject}
                      onArchive={handleArchiveProject}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <ProjectList
              projects={transformedProjects}
              accounts={transformedAccounts}
              onToggleFavorite={handleToggleFavorite}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              onArchive={handleArchiveProject}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <AddAccountModal 
        open={addAccountOpen} 
        onOpenChange={setAddAccountOpen} 
      />

      <EditAccountModal
        open={editAccountOpen}
        onOpenChange={setEditAccountOpen}
        account={editingAccount}
      />
      
      <AddProjectModal 
        open={addProjectOpen} 
        onOpenChange={setAddProjectOpen} 
      />
      
      <EditProjectModal
        open={editProjectOpen}
        onOpenChange={setEditProjectOpen}
        project={editingProject}
      />
      
      <TagsManager 
        open={tagsManagerOpen} 
        onOpenChange={setTagsManagerOpen} 
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O projeto "{deletingProject?.name}" será 
              permanentemente excluído.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
