import Home from '../pages/public/Home';
import Properties from '../pages/public/Properties';
import AboutUs from '../pages/public/AboutUs';
import Contact from '../pages/public/Contact';
import PropertyDetail from '../pages/PropertyDetail';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import TenantSignup from '../components/tenants/TenantSignup';

const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/properties', element: <Properties /> },
  { path: '/about', element: <AboutUs /> },
  { path: '/contact', element: <Contact /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },
  { path: '/property/:id', element: <PropertyDetail /> },
  { path: '/tenant/signup', element: <TenantSignup /> },
];

export default publicRoutes;