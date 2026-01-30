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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateProject, useAccounts, useTags, Project } from '@/hooks/useProjects';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface EditProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
}

const projectTypes = [
  { value: 'website', label: 'Website' },
  { value: 'landing', label: 'Landing Page' },
  { value: 'app', label: 'Aplicativo' },
  { value: 'funnel', label: 'Funil' },
  { value: 'other', label: 'Outro' },
] as const;

const projectStatuses = [
  { value: 'draft', label: 'Rascunho' },
  { value: 'published', label: 'Publicado' },
  { value: 'archived', label: 'Arquivado' },
] as const;

export function EditProjectModal({ open, onOpenChange, project }: EditProjectModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [accountId, setAccountId] = useState('');
  const [type, setType] = useState<'website' | 'landing' | 'app' | 'funnel' | 'other'>('website');
  const [status, setStatus] = useState<'published' | 'draft' | 'archived'>('draft');
  const [notes, setNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const { data: accounts = [] } = useAccounts();
  const { data: tags = [] } = useTags();
  const updateProject = useUpdateProject();
  const { toast } = useToast();

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description || '');
      setUrl(project.url || '');
      setAccountId(project.account_id);
      setType(project.type as typeof type);
      setStatus(project.status as typeof status);
      setNotes(project.notes || '');
      setSelectedTags(project.tags?.map(t => t.id) || []);
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!project || !name.trim() || !accountId) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha o nome e selecione uma conta.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await updateProject.mutateAsync({
        id: project.id,
        name: name.trim(),
        description: description.trim() || null,
        url: url.trim() || null,
        account_id: accountId,
        type,
        status,
        notes: notes.trim() || null,
        tagIds: selectedTags,
      });
      
      toast({
        title: 'Projeto atualizado!',
        description: `O projeto "${name}" foi atualizado.`,
      });
      
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar projeto',
        description: error.message || 'Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Projeto</DialogTitle>
          <DialogDescription>
            Atualize as informações do projeto.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-project-name">Nome do projeto *</Label>
            <Input
              id="edit-project-name"
              placeholder="Ex: Minha Landing Page"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-project-account">Conta Lovable *</Label>
            <Select value={accountId} onValueChange={setAccountId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma conta" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name} ({account.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-project-type">Tipo</Label>
              <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-project-status">Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {projectStatuses.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-project-url">URL do projeto</Label>
            <Input
              id="edit-project-url"
              type="url"
              placeholder="https://meu-projeto.lovable.app"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-project-description">Descrição</Label>
            <Textarea
              id="edit-project-description"
              placeholder="Descreva seu projeto..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-project-notes">Notas</Label>
            <Textarea
              id="edit-project-notes"
              placeholder="Anotações sobre o projeto..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>
          
          {tags.length > 0 && (
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTags.includes(tag.id) ? 'default' : 'outline'}
                    className={cn(
                      'cursor-pointer transition-all',
                      selectedTags.includes(tag.id) && 'ring-2 ring-primary/20'
                    )}
                    onClick={() => toggleTag(tag.id)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={updateProject.isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={updateProject.isPending}>
              {updateProject.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Salvar Alterações'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
