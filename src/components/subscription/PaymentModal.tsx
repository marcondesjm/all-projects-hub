import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useSubmitPaymentReceipt, useTrial } from '@/hooks/useTrial';
import { 
  Copy, 
  Check, 
  Loader2, 
  QrCode, 
  CreditCard,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PIX_KEY = '48996029392';
const PIX_NAME = 'Marcondes Jorge Machado';
const PIX_AMOUNT = 29.90;

// Generate PIX QR Code payload (simplified EMV format)
function generatePixPayload() {
  const payload = [
    '00020126580014br.gov.bcb.pix',
    `0114${PIX_KEY}`,
    '52040000',
    '5303986',
    `5405${PIX_AMOUNT.toFixed(2)}`,
    '5802BR',
    `5913${PIX_NAME.substring(0, 13)}`,
    '6008BRASILIA',
    '62070503***',
    '6304',
  ].join('');
  
  return payload;
}

export function PaymentModal({ open, onOpenChange }: PaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState<'payment' | 'confirm'>('payment');
  
  const { toast } = useToast();
  const submitReceipt = useSubmitPaymentReceipt();
  const { data: trial } = useTrial();

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      toast({
        title: 'Chave PIX copiada!',
        description: 'Cole no seu app do banco.',
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      toast({
        title: 'Erro ao copiar',
        description: 'Copie manualmente: ' + PIX_KEY,
        variant: 'destructive',
      });
    }
  };

  const handleSubmitReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!receiptUrl.trim()) {
      toast({
        title: 'URL obrigatória',
        description: 'Cole o link do comprovante.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await submitReceipt.mutateAsync({ receiptUrl, notes });
      toast({
        title: 'Comprovante enviado!',
        description: 'Aguarde a verificação do pagamento.',
      });
      setStep('confirm');
    } catch (error: any) {
      toast({
        title: 'Erro ao enviar',
        description: error.message || 'Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const isPendingVerification = trial?.paymentStatus === 'pending_verification';

  if (isPendingVerification || step === 'confirm') {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Aguardando Verificação</h3>
            <p className="text-muted-foreground mb-4">
              Seu comprovante foi enviado e está sendo analisado. 
              Você receberá uma notificação assim que for aprovado.
            </p>
            <p className="text-sm text-muted-foreground">
              Tempo médio de verificação: até 24 horas úteis
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Assinatura Mensal
          </DialogTitle>
          <DialogDescription>
            Acesso completo a todas as funcionalidades por apenas R$29,90/mês
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[60vh] pr-4">
          <div className="space-y-6">
          {/* Price Card */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Valor mensal</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-sm text-muted-foreground">R$</span>
              <span className="text-4xl font-bold text-foreground">29,90</span>
              <span className="text-sm text-muted-foreground">/mês</span>
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                ✓ Projetos ilimitados
              </span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                ✓ Contas ilimitadas
              </span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                ✓ Exportação de dados
              </span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                ✓ Logs de atividade
              </span>
            </div>
          </div>

          {/* PIX Payment */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              Pagamento via PIX
            </h4>

            {/* QR Code Placeholder */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg border">
                <div className="w-40 h-40 bg-muted flex items-center justify-center rounded">
                  <div className="text-center">
                    <QrCode className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">
                      Escaneie o QR Code
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PIX Key */}
            <div className="space-y-2">
              <Label>Chave PIX (Celular)</Label>
              <div className="flex gap-2">
                <Input 
                  value={PIX_KEY} 
                  readOnly 
                  className="bg-muted font-mono"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleCopyPix}
                  className={cn(copied && "bg-green-500/10 border-green-500 text-green-500")}
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Favorecido: <strong>{PIX_NAME}</strong>
              </p>
            </div>
          </div>

          {/* Receipt Form */}
          <form onSubmit={handleSubmitReceipt} className="space-y-4 border-t pt-4">
            <h4 className="font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Enviar Comprovante
            </h4>

            <div className="space-y-2">
              <Label htmlFor="receiptUrl">Link do Comprovante *</Label>
              <Input
                id="receiptUrl"
                placeholder="https://drive.google.com/... ou cole a imagem"
                value={receiptUrl}
                onChange={(e) => setReceiptUrl(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Envie o comprovante para o Google Drive, Dropbox ou outro serviço e cole o link aqui.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Observações (opcional)</Label>
              <Textarea
                id="notes"
                placeholder="Informações adicionais sobre o pagamento..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={submitReceipt.isPending}
            >
              {submitReceipt.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Enviar Comprovante
                </>
              )}
            </Button>
          </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
