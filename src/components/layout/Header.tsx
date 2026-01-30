import { Search, Bell, Grid3X3, List, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ReactNode } from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onNewProject?: () => void;
  mobileMenuTrigger?: ReactNode;
  onOpenSearch?: () => void;
}

export function Header({ searchQuery, onSearchChange, viewMode, onViewModeChange, onNewProject, mobileMenuTrigger, onOpenSearch }: HeaderProps) {
  return (
    <header className="h-14 sm:h-16 px-3 sm:px-6 flex items-center justify-between border-b border-border bg-card/50 backdrop-blur-sm gap-2 sm:gap-4">
      {/* Mobile Menu */}
      {mobileMenuTrigger}

      {/* Search */}
      <div className="flex-1 max-w-xl">
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className="relative cursor-pointer"
              onClick={onOpenSearch}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar projetos... (⌘K)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenSearch?.();
                }}
                className="pl-10 bg-background border-border focus-visible:ring-primary/20 text-sm cursor-pointer"
                aria-label="Buscar projetos por nome, tag ou descrição"
                readOnly={!!onOpenSearch}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Busca global (⌘K ou Ctrl+K)</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 sm:gap-3">
        {/* View Toggle */}
        <div className="hidden sm:flex items-center bg-muted rounded-lg p-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onViewModeChange('grid')}
                aria-label="Visualização em grade"
                aria-pressed={viewMode === 'grid'}
                className={cn(
                  'p-1.5 rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  viewMode === 'grid'
                    ? 'bg-background shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Visualização em grade</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onViewModeChange('list')}
                aria-label="Visualização em lista"
                aria-pressed={viewMode === 'list'}
                className={cn(
                  'p-1.5 rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  viewMode === 'list'
                    ? 'bg-background shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Visualização em lista</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications - hidden on small screens */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hidden sm:flex" aria-label="Notificações">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Notificações</p>
          </TooltipContent>
        </Tooltip>

        {/* New Project */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="gap-2 shadow-sm text-sm" onClick={onNewProject} size="sm">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Novo Projeto</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Criar novo projeto (Ctrl+N)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
