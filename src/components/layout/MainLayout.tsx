
import { ReactNode } from 'react';
import Navbar from '../ui/custom/Navbar';

interface MainLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export default function MainLayout({ children, showNav = true }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {showNav && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      <footer className="py-6 border-t">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Enhanced NBeS Portal. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
