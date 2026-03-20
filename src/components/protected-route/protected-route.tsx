import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store/store';
import { Preloader } from '@ui';

export const ProtectedRouteAuth = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const { user, isAuthChecked } = useSelector((state) => state.user);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export const ProtectedRouteUnAuth = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { user, isAuthChecked } = useSelector((state) => state.user);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (user) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};
