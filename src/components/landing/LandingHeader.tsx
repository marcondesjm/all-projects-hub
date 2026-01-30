import { Button } from '@/components/ui/button';
import { FolderKanban, Play, ArrowRight, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'bg-background/95 backdrop-blur-lg border-b border-border shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <FolderKanban className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">ProjectHub</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link to="/demo">
            <Button variant="ghost" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Ver Demo
            </Button>
          </Link>
          <Link to="/auth">
            <Button size="sm">
              Começar Grátis
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/demo">
                  <Button variant="ghost" className="w-full justify-start">
                    <Play className="w-4 h-4 mr-2" />
                    Ver Demo
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="w-full">
                    Começar Grátis
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
