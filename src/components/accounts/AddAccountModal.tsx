import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateAccount } from '@/hooks/useProjects';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const colors = [
  { id: 'blue', label: 'Azul', class: 'bg-blue-500' },
  { id: 'emerald', label: 'Verde', class: 'bg-emerald-500' },
  { id: 'amber', label: 'Amarelo', class: 'bg-amber-500' },
  { id: 'rose', label: 'Rosa', class: 'bg-rose-500' },
  { id: 'violet', label: 'Violeta', class: 'bg-violet-500' },
] as const;

export function AddAccountModal({ open, onOpenChange }: AddAccountModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedColor, setSelectedColor] = useState<'blue' | 'emerald' | 'amber' | 'rose' | 'violet'>('blue');
  
  const createAccount = useCreateAccount();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha o nome e email da conta.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createAccount.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        color: selectedColor,
      });
      
      toast({
        title: 'Conta adicionada!',
        description: `A conta "${name}" foi adicionada com sucesso.`,
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSelectedColor('blue');
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Erro ao adicionar conta',
        description: error.message || 'Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Conta Lovable</DialogTitle>
          <DialogDescription>
            Adicione uma nova conta Lovable para organizar seus projetos.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account-name">Nome da conta</Label>
            <Input
              id="account-name"
              placeholder="Ex: Projetos Pessoais"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="account-email">Email da conta Lovable</Label>
            <Input
              id="account-email"
              type="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Cor de identificação</Label>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setSelectedColor(color.id)}
                  className={cn(
                    'w-8 h-8 rounded-full transition-all duration-200',
                    color.class,
                    selectedColor === color.id 
                      ? 'ring-2 ring-offset-2 ring-primary scale-110' 
                      : 'hover:scale-105'
                  )}
                  title={color.label}
                />
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createAccount.isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={createAccount.isPending}>
              {createAccount.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adicionando...
                </>
              ) : (
                'Adicionar Conta'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
