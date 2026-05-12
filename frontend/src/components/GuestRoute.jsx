import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function GuestRoute({ children }) {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default GuestRoute;