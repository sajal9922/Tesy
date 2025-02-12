import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ element, allowedRoles, user, ...rest }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve user data from localStorage
  // const user = JSON.parse(localStorage.getItem('loggedUser'));

  useEffect(() => {
    // Save user data to localStorage
    localStorage.setItem('logedUser', JSON.stringify(user));
  }, [user]);

  return Array.isArray(user?.roles) &&
    user.roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
