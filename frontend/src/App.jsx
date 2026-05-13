import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import useAuthStore from './store/authStore';

function App() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser && user) {
        logout();
        navigate('/login');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user, logout, navigate]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;