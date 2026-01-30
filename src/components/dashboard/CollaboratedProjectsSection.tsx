import { useCollaboratedProjects, CollaboratedProject } from '@/hooks/useCollaboratedProjects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users, Calendar, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface CollaboratedProjectsSectionProps {
  onEditProject?: (projectId: string) => void;
}

export function CollaboratedProjectsSection({ onEditProject }: CollaboratedProjectsSectionProps) {
  const { data: collaboratedProjects = [], isLoading } = useCollaboratedProjects();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (collaboratedProjects.length === 0) {
    return null;
  }

  const now = new Date();

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">
          Projetos Compartilhados Comigo
        </h2>
        <Badge variant="secondary" className="ml-2">
          {collaboratedProjects.length}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {collaboratedProjects.map((project) => {
          const isOverdue = project.deadline && 
            new Date(project.deadline) < now && 
            project.status !== 'published' && 
            project.status !== 'archived';

          return (
            <div 
              key={project.id}
              className={cn(
                "bg-card rounded-xl border shadow-card p-4 transition-all hover:shadow-card-hover",
                isOverdue && "border-destructive/50"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground truncate">
                    {project.name}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    De: {project.owner_email || 'Desconhecido'}
                  </p>
                </div>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "ml-2 text-xs shrink-0",
                    project.role === 'admin' && "border-primary/50 text-primary",
                    project.role === 'editor' && "border-yellow-500/50 text-yellow-600 dark:text-yellow-400",
                    project.role === 'viewer' && "border-muted-foreground/50 text-muted-foreground"
                  )}
                >
                  {project.role === 'admin' ? 'Admin' : 
                   project.role === 'editor' ? 'Editor' : 'Visualizador'}
                </Badge>
              </div>

              {project.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {project.description}
                </p>
              )}

              {/* Deadline display - synchronized from owner */}
              {project.deadline && (
                <div className={cn(
                  "flex items-center gap-2 text-xs p-2 rounded-md mb-3",
                  isOverdue 
                    ? "bg-destructive/10 text-destructive" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {isOverdue ? (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  ) : (
                    <Calendar className="w-3.5 h-3.5" />
                  )}
                  <span>
                    Prazo: {format(new Date(project.deadline), "dd/MM/yyyy", { locale: ptBR })}
                    {isOverdue && " (Atrasado)"}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                <Badge variant="secondary" className="text-xs">
                  {project.collaboration_type === 'project' ? 'Projeto' : 'Conta'}
                </Badge>
                <span>
                  {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true, locale: ptBR })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
