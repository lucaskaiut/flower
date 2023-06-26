import { useAuth } from './Hooks/useAuth';
import { AuthRoutes } from './AuthRoutes';
import { LoginRoutes } from './LoginRoutes';

export const Router = () => {
  const { isUserLogged, isLoading } = useAuth();

  if (isLoading) {
    return <></>;
  }

  return isUserLogged ? <AuthRoutes /> : <LoginRoutes />;
};
