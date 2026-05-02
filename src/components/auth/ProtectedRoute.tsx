import { Navigate, useLocation } from 'react-router-dom';
import { useLearnerIsAuthenticated } from '@/contexts/LearnerAuthContext';
import { useFounderIsAuthenticated } from '@/contexts/FounderAuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requiredRole?: 'learner' | 'founder';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
  requiredRole,
}) => {
  const learnerIsAuthenticated = useLearnerIsAuthenticated();
  const founderIsAuthenticated = useFounderIsAuthenticated();
  const location = useLocation();

  // For founder routes, check founder auth
  if (requiredRole === 'founder') {
    if (!founderIsAuthenticated) {
      return <Navigate to="/founder/login" state={{ from: location.pathname }} replace />;
    }
  } else {
    // For learner routes (default), check learner auth
    if (!learnerIsAuthenticated) {
      return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
