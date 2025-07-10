import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PropTypes from 'prop-types';
import LoadingSpinner from '../common/LoadingSpinner'; // Assume you have a custom spinner component

const AuthRoute = ({ children, allowedRoles = [], redirectUnauthorized = '/' }) => {
  const location = useLocation();
  const { currentUser, loading, error } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading && !error) {
      const authorized = currentUser && 
                       (allowedRoles.length === 0 || allowedRoles.includes(currentUser.role));
      setIsAuthorized(authorized);
      setAuthChecked(true);
    }

    if (error) {
      setAuthChecked(true);
    }
  }, [currentUser, loading, error, allowedRoles]);

  // Show loading state while checking auth
  if (loading || !authChecked) {
    return <LoadingSpinner fullScreen />;
  }

  // Handle auth errors
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="alert alert-error max-w-md">
          Authentication error: {error.message || 'Please try again later'}
        </div>
      </div>
    );
  }

  // Redirect unauthenticated users to login with return URL
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect unauthorized users (wrong role)
  if (!isAuthorized) {
    return <Navigate to={redirectUnauthorized} replace />;
  }

  // Render children if all checks pass
  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  redirectUnauthorized: PropTypes.string
};

AuthRoute.defaultProps = {
  allowedRoles: [],
  redirectUnauthorized: '/'
};

export default AuthRoute;