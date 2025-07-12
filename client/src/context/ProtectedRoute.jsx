// client/src/context/ProtectedRoute.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    } else if (
      !isLoading &&
      isAuthenticated &&
      roles.length &&
      !roles.includes(user?.role)
    ) {
      navigate('/unauthorized');
    }
  }, [isLoading, isAuthenticated, user, roles, navigate]);

  if (isLoading || !isAuthenticated) return <div>Loading...</div>;
  return children;
};

export default ProtectedRoute;
