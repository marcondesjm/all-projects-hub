import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { 
  FolderKanban, 
  Tags, 
  Search, 
  BarChart3, 
  Coins, 
  Download,
  Clock,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: FolderKanban,
    title: 'Multi-Contas Centralizado',
    benefit: 'Conecte todas as suas contas Lovable e acesse todos os projetos em um único lugar.',
    highlight: 'Sem trocar de conta',
  },
  {
    icon: Tags,
    title: 'Organização Inteligente',
    benefit: 'Tags coloridas, favoritos e filtros para classificar projetos do seu jeito.',
    highlight: 'Encontre em 2 cliques',
  },
  {
    icon: Search,
    title: 'Busca em Segundos',
    benefit: 'Pressione Ctrl+K e encontre qualquer projeto em todas as contas instantaneamente.',
    highlight: 'Busca global',
  },
  {
    icon: BarChart3,
    title: 'Visão de Estatísticas',
    benefit: 'Gráficos de status, tipo e progresso para entender seu portfólio completo.',
    highlight: 'Dados em tempo real',
  },
  {
    icon: Coins,
    title: 'Controle de Créditos',
    benefit: 'Acompanhe os créditos de cada conta diretamente no painel principal.',
    highlight: 'Nunca fique zerado',
  },
  {
    icon: Download,
    title: 'Backup Completo',
    benefit: 'Exporte todos os seus dados em JSON e importe quando precisar.',
    highlight: 'Seus dados, seu controle',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Funcionalidades
          </span>
          <h2 className="text-2xl md:text-4xl font-bold mt-3 mb-4">
            Tudo que você precisa para ser{' '}
            <span className="text-primary">mais produtivo</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Cada funcionalidade foi pensada para economizar seu tempo e 
            eliminar a frustração de gerenciar múltiplas contas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {feature.highlight}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.benefit}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
