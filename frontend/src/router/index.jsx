import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import GuestRoute from '../components/GuestRoute';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import ProtectedRoute from '../components/ProtectedRoute';
import Admin from '../pages/Admin';
import Success from '../pages/Success';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { 
        index: true, 
        element: <Home /> 
      },
      {
        path: 'login',
        element: <GuestRoute><Login /></GuestRoute>,
      },
      {
        path: 'register',
        element: <GuestRoute><Register /></GuestRoute>,
      },
      { 
        path: 'products', 
        element: <Products />
      },
      {
        path: 'cart',
        element: <ProtectedRoute><Cart /></ProtectedRoute>,
      },
      {
        path: 'admin',
        element: <ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>
      },
      { 
        path: 'success', 
        element: <Success /> 
      },
    ],
  },
]);

export default router;