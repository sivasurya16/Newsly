import { Navigate } from 'react-router-dom';
import useAuth from './components/auth/useAuth';

const GuestGuard = ({ children }: { children: React.Component }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default GuestGuard