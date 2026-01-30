import { FolderKanban, Star, Globe, Archive, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardsProps {
  totalProjects: number;
  favorites: number;
  published: number;
  archived: number;
  overdue?: number;
}

export function StatsCards({ totalProjects, favorites, published, archived, overdue = 0 }: StatsCardsProps) {
  const stats = [
    {
      label: 'Total de Projetos',
      value: totalProjects,
      icon: FolderKanban,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Favoritos',
      value: favorites,
      icon: Star,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      label: 'Publicados',
      value: published,
      icon: Globe,
      color: 'text-status-published',
      bgColor: 'bg-status-published/10',
    },
    {
      label: 'Atrasados',
      value: overdue,
      icon: AlertTriangle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      highlight: overdue > 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        
        return (
          <div
            key={stat.label}
            className={cn(
              'bg-card rounded-xl border border-border p-4 shadow-card hover:shadow-card-hover transition-all duration-300',
              stat.highlight && 'border-destructive/50 animate-pulse'
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn('p-2.5 rounded-lg', stat.bgColor)}>
                <Icon className={cn('w-5 h-5', stat.color)} />
              </div>
              <div>
                <p className={cn('text-2xl font-bold text-card-foreground', stat.highlight && 'text-destructive')}>
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
