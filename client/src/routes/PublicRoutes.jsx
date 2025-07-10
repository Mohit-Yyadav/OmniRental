import Home from '../pages/public/Home';
import Properties from '../pages/public/Properties';
import AboutUs from '../pages/public/AboutUs';
import Contact from '../pages/public/Contact';
import PropertyDetail from '../pages/PropertyDetail';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

import Mainhome from '../pages/public/Mainhome';

const publicRoutes = [
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <Mainhome /> },  // Renders at /
      { path: 'properties', element: <Properties /> },
      { path: 'about', element: <AboutUs /> },
      { path: 'contact', element: <Contact /> },
      { path: 'property/:id', element: <PropertyDetail /> },
    ],
  },
  // Independent routes (no Navbar/Footer)
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
 
];

export default publicRoutes;