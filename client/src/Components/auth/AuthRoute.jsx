import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import PropTypes from 'prop-types';
import LoadingSpinner from '../common/LoadingSpinner';

const AuthRoute = ({ children, allowedRoles = [], redirectUnauthorized = '/' }) => {
  const location = useLocation();
  const { currentUser, loading, error } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Only mark auth as checked when we have definitive user data
    if (!loading && currentUser !== undefined) {
      setAuthChecked(true);
    }
  }, [loading, currentUser]);

  if (loading || !authChecked) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="alert alert-error max-w-md">
          Authentication error: {error.message || 'Please try again later'}
        </div>
      </div>
    );
  }

  // User not logged in - redirect to login with return location
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role
  const hasRequiredRole = allowedRoles.length === 0 || 
                        (currentUser && allowedRoles.includes(currentUser.role));

  if (!hasRequiredRole) {
    return <Navigate to={redirectUnauthorized} replace />;
  }

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