import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';

function Cart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded transition"
        >
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Tu carrito</h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
          >
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-indigo-600 font-bold">{item.price.toFixed(2)}€</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full font-bold transition"
              >
                -
              </button>
              <span className="w-6 text-center font-semibold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full font-bold transition"
              >
                +
              </button>
            </div>

            <div className="ml-6 text-right">
              <p className="font-bold text-gray-800">
                {(item.price * item.quantity).toFixed(2)}€
              </p>
              <button
                onClick={() => removeItem(item._id)}
                className="text-red-500 hover:text-red-700 text-sm mt-1 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6 flex justify-between items-center">
        <div>
          <p className="text-gray-500">Total</p>
          <p className="text-3xl font-bold text-indigo-600">
            {getTotal().toFixed(2)}€
          </p>
        </div>
        <button
          onClick={handleCheckout}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          Proceder al pago
        </button>
      </div>
    </div>
  );
}

export default Cart;