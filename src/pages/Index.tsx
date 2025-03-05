
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Upload, LayoutDashboard, Users, FileText, BarChart3, Zap } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/ui/custom/HeroSection';
import FeatureCard from '@/components/ui/custom/FeatureCard';

const features = [
  {
    title: 'Single Sign-On',
    description: 'Secure access with MyDigital ID integration for all users.',
    icon: Users
  },
  {
    title: 'Project Dashboard',
    description: 'Real-time tracking of submission status and notifications.',
    icon: LayoutDashboard
  },
  {
    title: 'BIM Model Upload',
    description: 'Simple drag-and-drop interface for BIM model submissions.',
    icon: Upload
  },
  {
    title: 'Automated Compliance',
    description: 'AI-powered checking against Malaysian regulatory requirements.',
    icon: CheckCircle
  },
  {
    title: 'Multi-Agency Workflow',
    description: 'Collaborative submission process across government agencies.',
    icon: FileText
  },
  {
    title: 'Analytics & Reporting',
    description: 'Comprehensive insights into project performance and compliance.',
    icon: BarChart3
  }
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <MainLayout>
      <div className="pt-16">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-20 bg-secondary/40">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Designed to streamline the building plan submission process from end to end
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A simplified submission process designed for efficiency
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Process Steps */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
              
              <div className="space-y-12 md:space-y-0">
                {[
                  {
                    number: '01',
                    title: 'Create Account & Project',
                    description: 'Sign in using MyDigital ID and create your development project with all required details.'
                  },
                  {
                    number: '02',
                    title: 'Upload BIM Models',
                    description: 'Submit your BIM models through our drag-and-drop interface for automated compliance checking.'
                  },
                  {
                    number: '03',
                    title: 'Review & Collaborate',
                    description: 'Receive instant feedback on compliance issues and collaborate with stakeholders to resolve them.'
                  },
                  {
                    number: '04',
                    title: 'Approval & Certification',
                    description: 'Once approved, receive digital certification and proceed with your development project.'
                  }
                ].map((step, index) => (
                  <div key={step.number} className={`relative flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse text-left md:text-right' : 'text-left'}`}>
                    <div className="md:w-1/2 mb-8 md:mb-0">
                      <div className={`relative ${index % 2 !== 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                        <div className="absolute z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold shadow-lg -left-6 md:left-auto md:right-auto md:-translate-x-1/2 transform -translate-y-2">
                          {step.number}
                        </div>
                        <div className="md:absolute md:top-0 md:bottom-0 md:w-12 md:bg-transparent"></div>
                        <div className={`bg-card rounded-xl border shadow-sm p-6 md:p-8 ${index % 2 !== 0 ? 'md:mr-6' : 'md:ml-6'}`}>
                          <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <Zap className="w-12 h-12 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Streamline Your Building Submissions?</h2>
              <p className="text-xl opacity-90 mb-8">
                Join hundreds of developers and authorities already using the enhanced Nexus Portal
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/login" 
                  className="bg-white text-primary font-medium px-6 py-3 rounded-md shadow-sm hover:shadow-md transition-all"
                >
                  Get Started
                </Link>
                <Link 
                  to="/dashboard" 
                  className="bg-primary/20 backdrop-blur-sm border border-white/20 text-white font-medium px-6 py-3 rounded-md hover:bg-primary/30 transition-all"
                >
                  Explore Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
