import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  FolderKanban, 
  Tags, 
  Search, 
  BarChart3, 
  Download, 
  Star,
  CheckCircle2,
  ArrowRight,
  Play,
  Sparkles,
  Coins,
  Eye,
  Clock,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const features = [
  {
    icon: FolderKanban,
    title: 'Multi-Contas',
    description: 'Gerencie projetos de várias contas Lovable em um único painel centralizado.',
  },
  {
    icon: Tags,
    title: 'Tags & Filtros',
    description: 'Organize seus projetos com tags personalizadas e filtre por status, tipo ou categoria.',
  },
  {
    icon: Search,
    title: 'Busca Instantânea',
    description: 'Encontre qualquer projeto em segundos com a busca global (Ctrl+K).',
  },
  {
    icon: BarChart3,
    title: 'Estatísticas',
    description: 'Visualize métricas e gráficos sobre seus projetos em tempo real.',
  },
  {
    icon: Coins,
    title: 'Créditos',
    description: 'Acompanhe os créditos de cada conta Lovable diretamente no painel.',
  },
  {
    icon: Download,
    title: 'Backup & Export',
    description: 'Exporte todos os seus dados em JSON e importe quando precisar.',
  },
];

const benefits = [
  'Dashboard centralizado para todas as contas',
  'Organização visual por cores e tags',
  'Busca rápida com atalho de teclado',
  'Favoritos e projetos arquivados',
  'Contador de visualizações por projeto',
  'Notas e anotações internas',
  'Gráficos de status e tipo',
  'Exportação e importação de dados',
];

const testimonials = [
  {
    name: 'Carlos Silva',
    role: 'Desenvolvedor Freelancer',
    content: 'Finalmente consigo gerenciar todos os meus projetos Lovable em um só lugar. Economizo horas toda semana!',
    avatar: 'CS',
  },
  {
    name: 'Ana Rodrigues',
    role: 'Product Designer',
    content: 'A organização por tags e as estatísticas são incríveis. Minha produtividade aumentou muito.',
    avatar: 'AR',
  },
  {
    name: 'Pedro Santos',
    role: 'Dono de Agência',
    content: 'Com múltiplas contas de clientes, o ProjectHub é essencial. Não vivo mais sem ele.',
    avatar: 'PS',
  },
];

const faqs = [
  {
    question: 'Como funciona o período de teste gratuito?',
    answer: 'Você tem 15 dias para testar todas as funcionalidades do ProjectHub sem precisar cadastrar cartão de crédito. Após o período, você pode optar por assinar o plano Pro ou continuar com acesso limitado.',
  },
  {
    question: 'Posso conectar quantas contas Lovable eu quiser?',
    answer: 'Sim! Com o plano Pro você pode conectar contas ilimitadas e gerenciar todos os seus projetos em um único painel centralizado.',
  },
  {
    question: 'Meus dados estão seguros?',
    answer: 'Absolutamente. Utilizamos criptografia de ponta a ponta e seguimos as melhores práticas de segurança. Seus dados são armazenados em servidores seguros e você pode exportar ou excluir suas informações a qualquer momento.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer: 'Aceitamos pagamento via PIX. Após a confirmação do pagamento, seu plano é ativado imediatamente. Você pode cancelar a qualquer momento, sem multas ou burocracia.',
  },
  {
    question: 'O ProjectHub sincroniza automaticamente com minhas contas Lovable?',
    answer: 'Os projetos são gerenciados manualmente no ProjectHub. Você adiciona os projetos que deseja acompanhar e pode atualizar as informações como status, notas e progresso sempre que precisar.',
  },
  {
    question: 'Posso usar o ProjectHub em equipe?',
    answer: 'Atualmente o ProjectHub é focado em uso individual. Estamos trabalhando em funcionalidades de colaboração para equipes que serão lançadas em breve!',
  },
  {
    question: 'O que acontece se eu cancelar minha assinatura?',
    answer: 'Você mantém acesso até o final do período pago. Após isso, sua conta volta para o modo limitado, mas seus dados são mantidos por 90 dias caso queira reativar.',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FolderKanban className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">ProjectHub</span>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/demo">
              <Button variant="ghost" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Demo
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm">
                Entrar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div {...fadeInUp}>
            <Badge variant="secondary" className="mb-6 px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              15 dias grátis • Sem cartão de crédito
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Gerencie todos os seus projetos{' '}
            <span className="text-primary">Lovable</span>{' '}
            em um só lugar
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Dashboard centralizado para organizar, monitorar e acompanhar 
            projetos de múltiplas contas Lovable. Nunca mais perca tempo 
            alternando entre contas.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/auth">
              <Button size="lg" className="text-lg px-8 h-12">
                Começar Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg" className="text-lg px-8 h-12">
                <Play className="w-5 h-5 mr-2" />
                Ver Demonstração
              </Button>
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="mt-16 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 text-center text-xs text-muted-foreground">
                  projecthub.lovable.app
                </div>
              </div>
              <div className="aspect-[16/9] bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
                  {[
                    { icon: FolderKanban, label: '24 Projetos', color: 'text-blue-500' },
                    { icon: Star, label: '8 Favoritos', color: 'text-amber-500' },
                    { icon: Eye, label: '1.2k Views', color: 'text-emerald-500' },
                    { icon: Clock, label: '12 Ativos', color: 'text-violet-500' },
                  ].map((stat, i) => (
                    <div 
                      key={i} 
                      className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
                    >
                      <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                      <p className="font-semibold">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Funcionalidades</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo que você precisa para gerenciar projetos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ferramentas poderosas para organizar, monitorar e acompanhar 
              todos os seus projetos Lovable de forma eficiente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Benefícios</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Por que usar o ProjectHub?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Desenvolvido especialmente para quem trabalha com múltiplos 
                projetos e contas na plataforma Lovable.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <div className="relative bg-card border border-border rounded-2xl p-6 shadow-xl">
                <div className="space-y-4">
                  {[
                    { color: 'bg-blue-500', name: 'Trabalho', projects: 12, credits: 150 },
                    { color: 'bg-emerald-500', name: 'Freelance', projects: 8, credits: 75 },
                    { color: 'bg-amber-500', name: 'Pessoal', projects: 5, credits: 200 },
                  ].map((account, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${account.color}`} />
                      <div className="flex-1">
                        <p className="font-medium">{account.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {account.projects} projetos
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary flex items-center gap-1">
                          <Coins className="w-3.5 h-3.5" />
                          {account.credits}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Depoimentos</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que nossos usuários dizem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Preços</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simples e acessível
            </h2>
            <p className="text-lg text-muted-foreground">
              Comece grátis por 15 dias. Sem compromisso.
            </p>
          </div>

          <motion.div
            className="bg-card border-2 border-primary rounded-2xl p-8 max-w-md mx-auto relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
              POPULAR
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-muted-foreground mb-6">Tudo que você precisa</p>
            
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold">R$29,90</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              {[
                'Contas ilimitadas',
                'Projetos ilimitados',
                'Tags personalizadas',
                'Busca avançada',
                'Estatísticas e gráficos',
                'Exportação de dados',
                'Suporte prioritário',
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link to="/auth" className="block">
              <Button size="lg" className="w-full">
                Começar 15 dias grátis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            
            <p className="text-center text-xs text-muted-foreground mt-4">
              Pagamento via PIX • Cancele quando quiser
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Tire suas dúvidas sobre o ProjectHub
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-lg mb-3 px-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para organizar seus projetos?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Junte-se a centenas de desenvolvedores que já usam o ProjectHub.
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="text-lg px-8 h-12">
                Criar Conta Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <FolderKanban className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold">ProjectHub</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2025 ProjectHub. Todos os direitos reservados.
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Termos</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
              <a href="#" className="hover:text-foreground transition-colors">Suporte</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
