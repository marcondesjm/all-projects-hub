import { useState, useMemo } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { FilterBar } from '@/components/projects/FilterBar';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectList } from '@/components/projects/ProjectList';
import { mockProjects, mockAccounts } from '@/data/mockData';
import { ProjectStatus, ProjectType } from '@/types/project';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeView, setActiveView] = useState('all');
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ProjectType | 'all'>('all');
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [projects, setProjects] = useState(mockProjects);

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // View filter
    if (activeView === 'favorites') {
      filtered = filtered.filter(p => p.isFavorite);
    } else if (activeView === 'archived') {
      filtered = filtered.filter(p => p.status === 'archived');
    }

    // Account filter
    if (selectedAccount) {
      filtered = filtered.filter(p => p.accountId === selectedAccount);
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
      filtered = filtered.filter(p => p.tags.includes(tagFilter));
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [projects, activeView, selectedAccount, statusFilter, typeFilter, tagFilter, searchQuery]);

  const handleToggleFavorite = (projectId: string) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === projectId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  const clearFilters = () => {
    setStatusFilter('all');
    setTypeFilter('all');
    setTagFilter(null);
  };

  const hasActiveFilters = statusFilter !== 'all' || typeFilter !== 'all' || tagFilter !== null;

  const stats = {
    totalProjects: projects.length,
    favorites: projects.filter(p => p.isFavorite).length,
    published: projects.filter(p => p.status === 'published').length,
    archived: projects.filter(p => p.status === 'archived').length,
  };

  const getAccount = (accountId: string) => mockAccounts.find(a => a.id === accountId)!;

  const getViewTitle = () => {
    if (selectedAccount) {
      const account = getAccount(selectedAccount);
      return account.name;
    }
    switch (activeView) {
      case 'favorites': return 'Projetos Favoritos';
      case 'archived': return 'Projetos Arquivados';
      case 'tags': return 'Organizar por Tags';
      default: return 'Todos os Projetos';
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        selectedAccount={selectedAccount}
        onAccountChange={setSelectedAccount}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
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
          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">Nenhum projeto encontrado</h3>
              <p className="text-sm text-muted-foreground">
                Tente ajustar seus filtros ou termo de busca
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProjectCard
                    project={project}
                    account={getAccount(project.accountId)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </div>
              ))}
            </div>
          ) : (
            <ProjectList
              projects={filteredProjects}
              accounts={mockAccounts}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </main>
      </div>
    </div>
  );
}
