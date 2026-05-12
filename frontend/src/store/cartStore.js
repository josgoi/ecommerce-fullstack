import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('cart')) || [],

  addItem: (product) => {
    const items = get().items;
    const existing = items.find((i) => i._id === product._id);

    let updatedItems;
    if (existing) {
      // Si ya existe aumentamos la cantidad
      updatedItems = items.map((i) =>
        i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      // Si no existe lo añadimos con quantity 1
      updatedItems = [...items, { ...product, quantity: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedItems));
    set({ items: updatedItems });
  },

  removeItem: (productId) => {
    const updatedItems = get().items.filter((i) => i._id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    set({ items: updatedItems });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity < 1) return;
    const updatedItems = get().items.map((i) =>
      i._id === productId ? { ...i, quantity } : i
    );
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    set({ items: updatedItems });
  },

  clearCart: () => {
    localStorage.removeItem('cart');
    set({ items: [] });
  },

  getTotal: () => {
    return get().items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  },

  getTotalItems: () => {
    return get().items.reduce((acc, i) => acc + i.quantity, 0);
  },
}));

export default useCartStore;