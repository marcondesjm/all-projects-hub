import { Star, ExternalLink, MoreHorizontal, Copy, Edit, Trash2 } from 'lucide-react';
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

interface ProjectListProps {
  projects: Project[];
  accounts: LovableAccount[];
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

export function ProjectList({ projects, accounts, onToggleFavorite }: ProjectListProps) {
  const getAccount = (accountId: string) => accounts.find(a => a.id === accountId)!;

  return (
    <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Projeto
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Status
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Conta
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Tags
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Atualizado
            </th>
            <th className="w-12"></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => {
            const account = getAccount(project.accountId);
            const status = statusConfig[project.status];

            return (
              <tr
                key={project.id}
                className={cn(
                  'group hover:bg-muted/50 transition-colors',
                  index !== projects.length - 1 && 'border-b border-border'
                )}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onToggleFavorite(project.id)}
                      className={cn(
                        'p-1 rounded transition-colors',
                        project.isFavorite
                          ? 'text-amber-500'
                          : 'text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-amber-500'
                      )}
                    >
                      <Star className={cn('w-4 h-4', project.isFavorite && 'fill-current')} />
                    </button>
                    <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      {project.screenshot ? (
                        <img
                          src={project.screenshot}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          ?
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground">{project.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="outline" className={cn('text-xs', status.className)}>
                    {status.label}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className={cn('w-2 h-2 rounded-full', accountColorMap[account.color])} />
                    <span className="text-sm">{account.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-normal">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs font-normal">
                        +{project.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">
                  {formatDistanceToNow(project.updatedAt, { addSuffix: true, locale: ptBR })}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-4 h-4" />
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
