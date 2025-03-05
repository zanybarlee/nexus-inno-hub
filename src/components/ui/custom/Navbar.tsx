
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import UserAvatar from './UserAvatar';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check login status on component mount and route changes
  useEffect(() => {
    const role = sessionStorage.getItem('userRole');
    setIsLoggedIn(!!role);
    setUserRole(role || '');
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
    setUserRole('');
    
    // Show toast notification
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account"
    });
    
    // Navigate to home page
    navigate('/');
  };
  
  // Get nav links based on user role
  const getNavLinks = () => {
    const commonLinks = [
      { name: 'Home', path: '/' },
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Reports', path: '/reports' },
    ];
    
    if (userRole === 'developer') {
      return [
        ...commonLinks,
        { name: 'Projects', path: '/projects/create' },
        { name: 'Upload', path: '/upload' },
      ];
    } else if (userRole === 'authority') {
      return [
        ...commonLinks,
        { name: 'Reviews', path: '/projects/1/review' },
      ];
    } else if (userRole === 'qp') {
      return [
        ...commonLinks,
        { name: 'QP Dashboard', path: '/qp/dashboard' },
      ];
    }
    
    // Default links for non-logged in users or unknown roles
    return [
      { name: 'Home', path: '/' },
      { name: 'Login', path: '/login' },
    ];
  };
  
  const navLinks = getNavLinks();
  
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
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 mr-2">
                  <UserAvatar role={userRole as any} size={20} />
                  <span className="text-sm font-medium capitalize">{userRole}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
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
              <div className="flex flex-col space-y-3">
                <div className="flex items-center gap-2">
                  <UserAvatar role={userRole as any} size={20} />
                  <span className="text-sm font-medium capitalize">{userRole}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
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
