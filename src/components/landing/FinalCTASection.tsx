import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Pare de perder tempo agora
          </h2>
          
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl mx-auto">
            Cada dia sem o ProjectHub é tempo perdido procurando projetos 
            e alternando entre contas. Comece seu teste grátis em 2 minutos.
          </p>
          
          <Link to="/auth">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 h-14 font-semibold shadow-xl hover:shadow-2xl transition-shadow"
            >
              Começar Meu Teste Grátis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          
          <p className="mt-6 text-sm opacity-70">
            15 dias grátis • Sem cartão • Cancele quando quiser
          </p>
        </motion.div>
      </div>
    </section>
  );
}
