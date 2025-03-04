
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,hsl(var(--primary)/15)_0%,hsl(var(--background)/30)_100%)]"></div>
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-accent to-primary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 animate-fade-in">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-border bg-secondary/50 backdrop-blur-sm mb-8">
            <span className="text-sm font-medium">Revolutionizing Building Submissions</span>
          </div>
          
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 tracking-tight">
            <span className="block">Simplifying Building</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Plan Submissions</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            A modern, AI-powered platform designed to streamline the regulatory process for developers, QPs, and local authorities.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/login" className="btn-primary min-w-[150px] h-12 flex items-center justify-center text-base sm:text-lg">
              Get Started
            </Link>
            <Link to="/dashboard" className="flex items-center text-base sm:text-lg font-medium text-foreground hover:text-primary transition-colors">
              Explore Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-x-0 -bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%+11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-accent to-primary opacity-20 sm:left-[calc(50%+30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
      </div>
    </section>
  );
};

export default HeroSection;
