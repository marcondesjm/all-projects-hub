import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  'Contas ilimitadas',
  'Projetos ilimitados',
  'Tags personalizadas',
  'Busca instantânea (Ctrl+K)',
  'Estatísticas e gráficos',
  'Controle de créditos',
  'Exportação de dados',
  'Suporte prioritário',
];

export function PricingSection() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Investimento
          </span>
          <h2 className="text-2xl md:text-4xl font-bold mt-3 mb-4">
            Menos que um café por dia
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Por menos de R$ 1 por dia, você economiza horas de trabalho toda semana.
          </p>
        </motion.div>

        <motion.div
          className="bg-card border-2 border-primary rounded-2xl p-6 md:p-8 max-w-lg mx-auto relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Popular badge */}
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-bl-lg flex items-center gap-1">
            <Zap className="w-3 h-3" />
            MAIS POPULAR
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-1">Plano Pro</h3>
            <p className="text-muted-foreground">Tudo que você precisa</p>
          </div>
          
          <div className="flex items-baseline justify-center gap-1 mb-2">
            <span className="text-5xl md:text-6xl font-bold">R$29</span>
            <span className="text-2xl font-bold">,90</span>
            <span className="text-muted-foreground">/mês</span>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mb-6">
            ou R$ 287,00/ano (economize 20%)
          </p>
          
          <ul className="space-y-3 mb-8">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <Link to="/auth" className="block">
            <Button size="lg" className="w-full h-14 text-lg font-semibold">
              Começar Teste Grátis de 15 Dias
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          
          <div className="mt-6 space-y-2 text-center text-sm text-muted-foreground">
            <p>✓ Sem cartão de crédito para começar</p>
            <p>✓ Pagamento via PIX</p>
            <p>✓ Cancele quando quiser</p>
          </div>
        </motion.div>

        {/* Money back guarantee */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Badge variant="outline" className="px-4 py-2">
            🛡️ Garantia de 7 dias após o pagamento. Não gostou? Devolvemos seu dinheiro.
          </Badge>
        </motion.div>
      </div>
    </section>
  );
}
