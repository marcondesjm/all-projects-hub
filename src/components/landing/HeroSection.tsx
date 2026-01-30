import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            15 dias grátis • Sem cartão de crédito
          </Badge>
        </motion.div>
        
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Cansado de perder tempo{' '}
          <span className="text-primary">alternando entre contas</span>{' '}
          Lovable?
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Encontre qualquer projeto em segundos. Organize múltiplas contas 
          em um único painel. Ganhe até <strong className="text-foreground">2 horas por semana</strong> de produtividade.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/auth">
            <Button size="lg" className="text-base md:text-lg px-6 md:px-8 h-12 md:h-14 shadow-lg hover:shadow-xl transition-shadow w-full sm:w-auto">
              Começar Teste Grátis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/demo">
            <Button variant="outline" size="lg" className="text-base md:text-lg px-6 md:px-8 h-12 md:h-14 w-full sm:w-auto">
              <Play className="w-5 h-5 mr-2" />
              Ver em Ação
            </Button>
          </Link>
        </motion.div>

        {/* Trust signals */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Setup em 2 minutos
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Sem cartão de crédito
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Cancele quando quiser
          </span>
        </motion.div>
      </div>
    </section>
  );
}
