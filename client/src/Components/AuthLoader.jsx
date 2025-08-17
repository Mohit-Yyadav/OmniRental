// src/components/AuthLoader.jsx
const AuthLoader = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="auth-loader">
        <div className="spinner"></div>
        <p>Loading authentication...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="auth-error">
        <h3>Authentication Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return null;
};

export default AuthLoader;