import { APP_VERSION, getFormattedVersion, getFormattedReleaseDate } from '@/config/version';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm px-4 py-3">
      <div className="container mx-auto flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} All Projects Hub</span>
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 cursor-help">
              <Badge variant="outline" className="text-xs font-mono">
                {getFormattedVersion()}
              </Badge>
              <span className="hidden sm:inline">
                Atualizado em {getFormattedReleaseDate()}
              </span>
              <Info className="w-3.5 h-3.5 text-muted-foreground/60" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="space-y-2">
              <p className="font-medium">{APP_VERSION.releaseName}</p>
              <ul className="text-xs space-y-1">
                {APP_VERSION.changelog.map((item, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </footer>
  );
}
