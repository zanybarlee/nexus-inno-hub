
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, User, Lock, ArrowRight } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/custom/Button';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleMyDigitalLogin = () => {
    setIsLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <MainLayout showNav={false}>
      <div className="min-h-screen flex items-center justify-center p-4 bg-secondary/40">
        <div className="w-full max-w-md">
          <div className="bg-card backdrop-blur-sm rounded-xl border shadow-elevation-medium p-8 animate-scale-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <KeyRound className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">Welcome to NBeS Portal</h1>
              <p className="text-muted-foreground mt-2">Sign in to access your account</p>
            </div>
            
            <div className="space-y-6">
              <Button
                variant="primary"
                fullWidth
                leftIcon={<User size={20} />}
                isLoading={isLoading}
                onClick={handleMyDigitalLogin}
              >
                Sign in with MyDigital ID
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      id="email"
                      placeholder="name@example.com"
                      className="input-base w-full pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="password"
                      id="password"
                      placeholder="••••••••"
                      className="input-base w-full pl-10"
                    />
                  </div>
                </div>
                
                <Button
                  variant="secondary"
                  fullWidth
                  rightIcon={<ArrowRight size={18} />}
                >
                  Sign In
                </Button>
              </form>
              
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <a href="#" className="text-primary font-medium hover:underline">
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
