import { FolderKanban } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FolderKanban className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold">ProjectHub</span>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/demo" className="hover:text-foreground transition-colors">
              Demonstração
            </Link>
            <a href="#" className="hover:text-foreground transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Suporte
            </a>
          </nav>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ProjectHub. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
