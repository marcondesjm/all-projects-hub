import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ProjectStatus, ProjectType } from '@/types/project';

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface FilterBarProps {
  statusFilter: ProjectStatus | 'all';
  typeFilter: ProjectType | 'all';
  tagFilter: string | null;
  onStatusChange: (status: ProjectStatus | 'all') => void;
  onTypeChange: (type: ProjectType | 'all') => void;
  onTagChange: (tag: string | null) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  tags?: Tag[];
}

export function FilterBar({
  statusFilter,
  typeFilter,
  tagFilter,
  onStatusChange,
  onTypeChange,
  onTagChange,
  onClearFilters,
  hasActiveFilters,
  tags = [],
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {/* Status Filter */}
      <Select value={statusFilter} onValueChange={(value) => onStatusChange(value as ProjectStatus | 'all')}>
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos Status</SelectItem>
          <SelectItem value="published">Publicado</SelectItem>
          <SelectItem value="draft">Rascunho</SelectItem>
          <SelectItem value="archived">Arquivado</SelectItem>
        </SelectContent>
      </Select>

      {/* Type Filter */}
      <Select value={typeFilter} onValueChange={(value) => onTypeChange(value as ProjectType | 'all')}>
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos Tipos</SelectItem>
          <SelectItem value="website">Website</SelectItem>
          <SelectItem value="landing">Landing Page</SelectItem>
          <SelectItem value="app">Aplicativo</SelectItem>
          <SelectItem value="funnel">Funil</SelectItem>
          <SelectItem value="other">Outro</SelectItem>
        </SelectContent>
      </Select>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {tags.slice(0, 6).map((tag) => (
            <Badge
              key={tag.id}
              variant={tagFilter === tag.name ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onTagChange(tagFilter === tag.name ? null : tag.name)}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <X className="w-3.5 h-3.5" />
          Limpar filtros
        </Button>
      )}
    </div>
  );
}
