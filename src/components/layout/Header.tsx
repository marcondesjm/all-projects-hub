import { Search, Bell, Grid3X3, List, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function Header({ searchQuery, onSearchChange, viewMode, onViewModeChange }: HeaderProps) {
  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-border bg-card/50 backdrop-blur-sm">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar projetos por nome, tag ou descrição..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background border-border focus-visible:ring-primary/20"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 ml-6">
        {/* View Toggle */}
        <div className="flex items-center bg-muted rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={cn(
              'p-1.5 rounded-md transition-all duration-200',
              viewMode === 'grid'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={cn(
              'p-1.5 rounded-md transition-all duration-200',
              viewMode === 'list'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </Button>

        {/* New Project */}
        <Button className="gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          Novo Projeto
        </Button>
      </div>
    </header>
  );
}
