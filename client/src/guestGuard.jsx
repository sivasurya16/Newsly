import { Navigate } from 'react-router-dom';
import useAuth from './auth/useAuth';

const GuestGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default GuestGuard