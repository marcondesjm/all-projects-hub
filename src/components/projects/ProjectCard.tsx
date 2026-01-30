import { Star, ExternalLink, MoreHorizontal, Copy, Edit, Trash2, Eye } from 'lucide-react';
import { Project, LovableAccount } from '@/types/project';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProjectCardProps {
  project: Project;
  account?: LovableAccount;
  onToggleFavorite: (projectId: string) => void;
}

const accountColorMap = {
  blue: 'bg-account-blue',
  emerald: 'bg-account-emerald',
  amber: 'bg-account-amber',
  rose: 'bg-account-rose',
  violet: 'bg-account-violet',
};

const statusConfig = {
  published: { label: 'Publicado', className: 'bg-status-published/10 text-status-published border-status-published/20' },
  draft: { label: 'Rascunho', className: 'bg-status-draft/10 text-status-draft border-status-draft/20' },
  archived: { label: 'Arquivado', className: 'bg-status-archived/10 text-status-archived border-status-archived/20' },
};

export function ProjectCard({ project, account, onToggleFavorite }: ProjectCardProps) {
  const status = statusConfig[project.status];

  return (
    <div className="group bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden hover-lift">
      {/* Screenshot */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Eye className="w-8 h-8" />
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/90 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Abrir
            </a>
            <Badge variant="secondary" className={cn('text-xs', status.className)}>
              {status.label}
            </Badge>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(project.id)}
          className={cn(
            'absolute top-3 right-3 p-1.5 rounded-full transition-all duration-200',
            project.isFavorite
              ? 'bg-amber-500 text-white'
              : 'bg-white/80 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-white hover:text-amber-500'
          )}
        >
          <Star className={cn('w-4 h-4', project.isFavorite && 'fill-current')} />
        </button>

        {/* Account Indicator */}
        {account && (
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className={cn('w-2.5 h-2.5 rounded-full ring-2 ring-white/50', accountColorMap[account.color])} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-card-foreground line-clamp-1">{project.name}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 rounded-md hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Abrir Projeto
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Copy className="w-4 h-4" />
                Copiar Link
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Edit className="w-4 h-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                <Trash2 className="w-4 h-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs font-normal">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
          <span>{account?.name || 'Sem conta'}</span>
          <span>
            {formatDistanceToNow(project.updatedAt, { addSuffix: true, locale: ptBR })}
          </span>
        </div>
      </div>
    </div>
  );
}
