import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';

const AuthRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser, loading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsAuthorized(
        currentUser && 
        (allowedRoles.length === 0 || allowedRoles.includes(currentUser.role))
      );
    }
  }, [currentUser, loading, allowedRoles]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string)
};

export default AuthRoute;