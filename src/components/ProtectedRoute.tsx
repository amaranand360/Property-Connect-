
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('user' | 'owner' | 'admin')[];
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/login' 
}: ProtectedRouteProps) => {
  const { isAuthenticated, userType } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles.length > 0 && userType && !allowedRoles.includes(userType)) {
    // Redirect to appropriate dashboard based on user type
    const dashboardRoutes = {
      user: '/search',
      owner: '/owner-dashboard',
      admin: '/admin'
    };
    return <Navigate to={dashboardRoutes[userType]} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
