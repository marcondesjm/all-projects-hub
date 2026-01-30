import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateAccount, useDeleteAccount, LovableAccount } from '@/hooks/useProjects';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Coins, Trash2, Key, Globe, User, Mail, FileText } from 'lucide-react';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
  const [adminEmail, setAdminEmail] = useState('');
  const [credits, setCredits] = useState('');
  const [supabaseProjectId, setSupabaseProjectId] = useState('');
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [serviceRoleKey, setServiceRoleKey] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedColor, setSelectedColor] = useState<'blue' | 'emerald' | 'amber' | 'rose' | 'violet'>('blue');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const updateAccount = useUpdateAccount();
  const deleteAccount = useDeleteAccount();
  const { toast } = useToast();

  useEffect(() => {
    if (account) {
      setName(account.name);
      setEmail(account.email);
      setAdminEmail(account.admin_email || '');
      setCredits(account.credits?.toString() || '0');
      setSupabaseProjectId(account.supabase_project_id || '');
      setSupabaseUrl(account.supabase_url || '');
      setAnonKey(account.anon_key || '');
      setServiceRoleKey(account.service_role_key || '');
      setNotes(account.notes || '');
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
        admin_email: adminEmail.trim() || null,
        color: selectedColor,
        credits: creditsValue,
        supabase_project_id: supabaseProjectId.trim() || null,
        supabase_url: supabaseUrl.trim() || null,
        anon_key: anonKey.trim() || null,
        service_role_key: serviceRoleKey.trim() || null,
        notes: notes.trim() || null,
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
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Editar Conta Lovable</DialogTitle>
            <DialogDescription>
              Atualize as informações da conta e configurações Supabase.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="flex-1 pr-4">
            <form onSubmit={handleSubmit} className="space-y-4 pb-4">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-account-name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nome da conta *
                  </Label>
                  <Input
                    id="edit-account-name"
                    placeholder="Ex: Projetos Pessoais"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-account-email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email de cadastro Lovable *
                  </Label>
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
                  <Label htmlFor="edit-admin-email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email de administrador
                  </Label>
                  <Input
                    id="edit-admin-email"
                    type="email"
                    placeholder="admin@exemplo.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
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
              </div>

              {/* Configurações Supabase (Accordion) */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="supabase">
                  <AccordionTrigger className="text-sm font-medium">
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Configurações Supabase
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="edit-supabase-project-id">Project ID</Label>
                      <Input
                        id="edit-supabase-project-id"
                        placeholder="Ex: abcdefghijklmnop"
                        value={supabaseProjectId}
                        onChange={(e) => setSupabaseProjectId(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-supabase-url">URL do Projeto</Label>
                      <Input
                        id="edit-supabase-url"
                        placeholder="https://xxx.supabase.co"
                        value={supabaseUrl}
                        onChange={(e) => setSupabaseUrl(e.target.value)}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="keys">
                  <AccordionTrigger className="text-sm font-medium">
                    <span className="flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      API Keys
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="edit-anon-key">Anon Key (Pública)</Label>
                      <Input
                        id="edit-anon-key"
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp..."
                        value={anonKey}
                        onChange={(e) => setAnonKey(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-service-role-key">Service Role Key (Privada)</Label>
                      <Input
                        id="edit-service-role-key"
                        type="password"
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp..."
                        value={serviceRoleKey}
                        onChange={(e) => setServiceRoleKey(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        ⚠️ Mantenha esta chave em segredo. Nunca compartilhe publicamente.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="notes">
                  <AccordionTrigger className="text-sm font-medium">
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Notas e observações
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <Textarea
                      id="edit-notes"
                      placeholder="Adicione notas, observações ou informações adicionais sobre esta conta..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <DialogFooter className="flex-col sm:flex-row gap-2 pt-4">
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
          </ScrollArea>
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
