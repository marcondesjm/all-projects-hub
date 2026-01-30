import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FolderKanban } from 'lucide-react';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(loginEmail, loginPassword);

    if (error) {
      toast({
        title: 'Erro ao entrar',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Bem-vindo de volta!',
        description: 'Login realizado com sucesso.',
      });
      navigate('/');
    }

    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signUp(signupEmail, signupPassword, signupName);

    if (error) {
      toast({
        title: 'Erro ao criar conta',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Conta criada!',
        description: 'Verifique seu email para confirmar o cadastro.',
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center">
            <FolderKanban className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">ProjectHub</h1>
          <p className="text-xs text-muted-foreground text-center">
            Organize todos os seus projetos Lovable em um só lugar
          </p>
        </div>

        <Card className="border-border/50 shadow-sm">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader className="pb-3 pt-4">
              <TabsList className="grid w-full grid-cols-2 h-9">
                <TabsTrigger value="login" className="text-sm">Entrar</TabsTrigger>
                <TabsTrigger value="signup" className="text-sm">Criar conta</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="pb-5">
              <TabsContent value="login" className="mt-0 space-y-3">
                <form onSubmit={handleLogin} className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="login-email" className="text-sm">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="login-password" className="text-sm">Senha</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="h-9"
                    />
                  </div>
                  <Button type="submit" className="w-full h-9" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Entrar'
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="mt-0 space-y-3">
                <form onSubmit={handleSignup} className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-name" className="text-sm">Nome</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Seu nome"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-email" className="text-sm">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-password" className="text-sm">Senha</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      minLength={6}
                      className="h-9"
                    />
                  </div>
                  <Button type="submit" className="w-full h-9" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Criar conta'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        {/* Demo link */}
        <p className="text-xs text-center text-muted-foreground">
          <Link to="/demo" className="text-primary hover:underline">
            Ver demonstração
          </Link>
          {' · '}
          15 dias grátis
        </p>
      </div>
    </div>
  );
}
