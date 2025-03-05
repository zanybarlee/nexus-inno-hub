
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check login status on component mount and route changes
  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    setIsLoggedIn(!!userRole);
  }, [location.pathname]);
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const handleLogout = () => {
    // Clear user session
    sessionStorage.removeItem('userRole');
    setIsLoggedIn(false);
    
    // Show toast notification
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account"
    });
    
    // Navigate to home page
    navigate('/');
  };
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Projects', path: '/projects/create' },
    { name: 'Upload', path: '/upload' },
  ];
  
  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/"
            className="font-bold text-xl flex items-center"
          >
            <span className="text-primary">Nexus</span>
            <span className="ml-1">Portal</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="btn-primary inline-flex items-center justify-center"
              >
                Login
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 px-4 py-6 bg-background border-t">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="btn-primary inline-flex items-center justify-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
