import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import { useStores } from '_stores/use-stores';

const ProtectedRoute = observer(() => {
  const { authStore } = useStores();

  return authStore.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
});

export default ProtectedRoute;
