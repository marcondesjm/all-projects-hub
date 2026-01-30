import { motion } from 'framer-motion';
import { FolderKanban, Star, Eye, Clock, TrendingUp } from 'lucide-react';

export function DashboardPreview() {
  const stats = [
    { icon: FolderKanban, value: '47', label: 'Projetos', color: 'text-blue-500' },
    { icon: Star, value: '12', label: 'Favoritos', color: 'text-amber-500' },
    { icon: Eye, value: '2.4k', label: 'Visualizações', color: 'text-emerald-500' },
    { icon: TrendingUp, value: '89%', label: 'Produtividade', color: 'text-violet-500' },
  ];

  return (
    <section className="pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-3xl blur-3xl -z-10" />
          
          <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
            {/* Browser chrome */}
            <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center text-xs text-muted-foreground">
                app.projecthub.com.br
              </div>
            </div>
            
            {/* Dashboard preview */}
            <div className="p-6 md:p-8 bg-gradient-to-br from-background via-background to-muted/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={i} 
                    className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  >
                    <stat.icon className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 ${stat.color}`} />
                    <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Mini project cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { name: 'E-commerce App', status: 'Publicado', color: 'bg-emerald-500' },
                  { name: 'Landing Page', status: 'Em progresso', color: 'bg-blue-500' },
                  { name: 'Dashboard Admin', status: 'Rascunho', color: 'bg-amber-500' },
                ].map((project, i) => (
                  <motion.div
                    key={i}
                    className="bg-muted/50 rounded-lg p-3 flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
                  >
                    <div className={`w-2 h-2 rounded-full ${project.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{project.name}</p>
                      <p className="text-xs text-muted-foreground">{project.status}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
