import { useState } from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Star, 
  Archive, 
  Settings, 
  Plus,
  ChevronDown,
  Users,
  Tag,
  LogOut,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useAuth } from '@/hooks/useAuth';
import { LovableAccount } from '@/hooks/useProjects';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  selectedAccount: string | null;
  onAccountChange: (accountId: string | null) => void;
  accounts: LovableAccount[];
  isLoading?: boolean;
  onAddAccount?: () => void;
}

const accountColorMap: Record<string, string> = {
  blue: 'bg-account-blue',
  emerald: 'bg-account-emerald',
  amber: 'bg-account-amber',
  rose: 'bg-account-rose',
  violet: 'bg-account-violet',
};

export function Sidebar({ 
  activeView, 
  onViewChange, 
  selectedAccount, 
  onAccountChange,
  accounts,
  isLoading,
  onAddAccount
}: SidebarProps) {
  const [accountsOpen, setAccountsOpen] = useState(true);
  const { signOut, user } = useAuth();

  const navItems = [
    { id: 'all', label: 'Todos os Projetos', icon: LayoutDashboard },
    { id: 'favorites', label: 'Favoritos', icon: Star },
    { id: 'archived', label: 'Arquivados', icon: Archive },
    { id: 'tags', label: 'Tags', icon: Tag },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <FolderKanban className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-sidebar-foreground">ProjectHub</h1>
            <p className="text-xs text-muted-foreground">Gerenciador Lovable</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id && !selectedAccount;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                onViewChange(item.id);
                onAccountChange(null);
              }}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}

        {/* Accounts Section */}
        <div className="pt-4">
          <Collapsible open={accountsOpen} onOpenChange={setAccountsOpen}>
            <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-sidebar-foreground transition-colors">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5" />
                Contas
              </div>
              <ChevronDown className={cn(
                'w-3.5 h-3.5 transition-transform duration-200',
                accountsOpen ? 'rotate-0' : '-rotate-90'
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 mt-1">
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              ) : accounts.length === 0 ? (
                <p className="text-xs text-muted-foreground px-3 py-2">
                  Nenhuma conta adicionada
                </p>
              ) : (
                accounts.map((account) => {
                  const isActive = selectedAccount === account.id;
                  
                  return (
                    <button
                      key={account.id}
                      onClick={() => {
                        onAccountChange(account.id);
                        onViewChange('all');
                      }}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                      )}
                    >
                      <span className={cn('w-2.5 h-2.5 rounded-full', accountColorMap[account.color] || 'bg-muted')} />
                      <span className="flex-1 text-left truncate">{account.name}</span>
                    </button>
                  );
                })
              )}
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-muted-foreground hover:text-sidebar-foreground mt-2"
                onClick={onAddAccount}
              >
                <Plus className="w-4 h-4" />
                Adicionar Conta
              </Button>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        {user && (
          <div className="px-3 py-2 mb-2">
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        )}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200">
          <Settings className="w-4 h-4" />
          Configurações
        </button>
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
