import { useState, useEffect } from 'react';
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
import { useUpdateAccount, useDeleteAccount, LovableAccount } from '@/hooks/useProjects';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Coins, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface EditAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: LovableAccount | null;
}

const colors = [
  { id: 'blue', label: 'Azul', class: 'bg-blue-500' },
  { id: 'emerald', label: 'Verde', class: 'bg-emerald-500' },
  { id: 'amber', label: 'Amarelo', class: 'bg-amber-500' },
  { id: 'rose', label: 'Rosa', class: 'bg-rose-500' },
  { id: 'violet', label: 'Violeta', class: 'bg-violet-500' },
] as const;

export function EditAccountModal({ open, onOpenChange, account }: EditAccountModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [credits, setCredits] = useState('');
  const [selectedColor, setSelectedColor] = useState<'blue' | 'emerald' | 'amber' | 'rose' | 'violet'>('blue');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const updateAccount = useUpdateAccount();
  const deleteAccount = useDeleteAccount();
  const { toast } = useToast();

  useEffect(() => {
    if (account) {
      setName(account.name);
      setEmail(account.email);
      setCredits(account.credits?.toString() || '0');
      setSelectedColor(account.color);
    }
  }, [account]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!account || !name.trim() || !email.trim()) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha o nome e email da conta.',
        variant: 'destructive',
      });
      return;
    }

    const creditsValue = credits.trim() ? parseInt(credits, 10) : 0;
    if (isNaN(creditsValue) || creditsValue < 0) {
      toast({
        title: 'Créditos inválidos',
        description: 'Digite um número válido para os créditos.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await updateAccount.mutateAsync({
        id: account.id,
        name: name.trim(),
        email: email.trim(),
        color: selectedColor,
        credits: creditsValue,
      });
      
      toast({
        title: 'Conta atualizada!',
        description: `A conta "${name}" foi atualizada.`,
      });
      
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar conta',
        description: error.message || 'Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!account) return;

    try {
      await deleteAccount.mutateAsync(account.id);
      toast({
        title: 'Conta excluída',
        description: `A conta "${account.name}" foi excluída.`,
      });
      setDeleteDialogOpen(false);
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Erro ao excluir conta',
        description: error.message || 'Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  if (!account) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Conta Lovable</DialogTitle>
            <DialogDescription>
              Atualize as informações da conta.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-account-name">Nome da conta</Label>
              <Input
                id="edit-account-name"
                placeholder="Ex: Projetos Pessoais"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-account-email">Email da conta Lovable</Label>
              <Input
                id="edit-account-email"
                type="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-account-credits" className="flex items-center gap-2">
                <Coins className="w-4 h-4" />
                Créditos disponíveis
              </Label>
              <Input
                id="edit-account-credits"
                type="number"
                min="0"
                placeholder="0"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
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
            
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setDeleteDialogOpen(true)}
                disabled={updateAccount.isPending || deleteAccount.isPending}
                className="sm:mr-auto"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={updateAccount.isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={updateAccount.isPending}>
                {updateAccount.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir conta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A conta "{account.name}" e todos os projetos 
              associados serão permanentemente excluídos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteAccount.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                'Excluir'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
