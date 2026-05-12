import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';

function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { getTotalItems, clearCart } = useCartStore();

  const handleLogout = () => {
    logout();
    clearCart();
    navigate('/login');
};

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-400">
        🛒 MiTienda
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/products" className="hover:text-indigo-400 transition">
          Productos
        </Link>

        {user ? (
          <>
            <Link to="/cart" className="hover:text-indigo-400 transition">
              Carrito {getTotalItems() > 0 && (
                <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full ml-1">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            {user.role === 'admin' && (
              <Link to="/admin" className="hover:text-indigo-400 transition">
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-1 rounded transition"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-indigo-400 transition">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-1 rounded transition"
            >
              Registro
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;