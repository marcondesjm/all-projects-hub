import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FolderPlus, 
  Tags, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingTourProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  onSkip: () => void;
}

const steps = [
  {
    id: 1,
    title: 'Bem-vindo ao ProjectHub! 🚀',
    description: 'Gerencie todos os seus projetos Lovable em um só lugar. Vamos fazer um tour rápido para você começar.',
    icon: Sparkles,
    color: 'bg-gradient-to-br from-primary to-primary/60',
  },
  {
    id: 2,
    title: 'Conecte suas Contas',
    description: 'Adicione suas contas Lovable para importar e organizar seus projetos automaticamente. Cada conta pode ter uma cor única para fácil identificação.',
    icon: LayoutDashboard,
    color: 'bg-gradient-to-br from-primary to-accent',
  },
  {
    id: 3,
    title: 'Organize com Tags',
    description: 'Use tags personalizadas para categorizar seus projetos. Filtre rapidamente por status, tipo ou qualquer tag que você criar.',
    icon: Tags,
    color: 'bg-gradient-to-br from-primary/80 to-secondary',
  },
];

export function OnboardingTour({ currentStep, onStepChange, onComplete, onSkip }: OnboardingTourProps) {
  const [isVisible, setIsVisible] = useState(true);
  const step = steps[currentStep] || steps[0];
  const Icon = step.icon;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    } else {
      onStepChange(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onSkip, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative w-full max-w-lg bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Content */}
            <div className="p-8 pt-10">
              {/* Icon */}
              <motion.div
                key={step.id}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className={cn(
                  'w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6',
                  step.color
                )}
              >
                <Icon className="w-10 h-10 text-primary-foreground" />
              </motion.div>

              {/* Text */}
              <motion.div
                key={`text-${step.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  {step.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* Step indicators */}
              <div className="flex items-center justify-center gap-2 mt-8 mb-6">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onStepChange(index)}
                    className={cn(
                      'w-2.5 h-2.5 rounded-full transition-all duration-300',
                      index === currentStep
                        ? 'bg-primary w-8'
                        : index < currentStep
                          ? 'bg-primary/50'
                          : 'bg-muted-foreground/30'
                    )}
                    aria-label={`Ir para passo ${index + 1}`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Pular tour
                </Button>

                <div className="flex items-center gap-2">
                  {currentStep > 0 && (
                    <Button variant="outline" onClick={handlePrev}>
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Anterior
                    </Button>
                  )}
                  <Button onClick={handleNext} className="min-w-[120px]">
                    {isLastStep ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Começar
                      </>
                    ) : (
                      <>
                        Próximo
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
