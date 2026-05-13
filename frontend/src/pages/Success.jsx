import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';

function Success() {
  const { clearCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="text-6xl">🎉</div>
      <h1 className="text-3xl font-bold text-gray-800">¡Pago completado!</h1>
      <p className="text-gray-500">Tu pedido ha sido procesado correctamente.</p>
      <button
        onClick={() => navigate('/products')}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg transition"
      >
        Seguir comprando
      </button>
    </div>
  );
}

export default Success;