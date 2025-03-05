
import { 
  User, 
  Hammer, 
  ClipboardCheck, 
  Building2 
} from 'lucide-react';

type UserRole = 'developer' | 'qp' | 'authority' | '';

interface UserAvatarProps {
  role: UserRole;
  size?: number;
  showBackground?: boolean;
}

const UserAvatar = ({ 
  role, 
  size = 24, 
  showBackground = true 
}: UserAvatarProps) => {
  // Get the appropriate icon based on role
  const getIconByRole = () => {
    switch(role) {
      case 'developer':
        return <Building2 size={size} />;
      case 'qp':
        return <ClipboardCheck size={size} />;
      case 'authority':
        return <Hammer size={size} />;
      default:
        return <User size={size} />;
    }
  };

  // If no role, just return the default user icon without background
  if (!role) {
    return <User size={size} />;
  }
  
  // Get background color based on role
  const getBgColor = () => {
    switch(role) {
      case 'developer':
        return 'bg-blue-100 text-blue-600';
      case 'qp':
        return 'bg-green-100 text-green-600';
      case 'authority':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return showBackground ? (
    <div className={`rounded-full p-1 flex items-center justify-center ${getBgColor()}`}>
      {getIconByRole()}
    </div>
  ) : (
    getIconByRole()
  );
};

export default UserAvatar;
