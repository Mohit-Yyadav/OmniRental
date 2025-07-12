// src/routes/PublicRoutes.js
import Home from '../pages/public/Home';
import Properties from '../pages/public/Properties';
import AboutUs from '../pages/public/AboutUs';
import Contact from '../pages/public/Contact';
import PropertyDetail from '../pages/PropertyDetail';
import Login from '../Components/auth/Login';
import Register from '../Components/auth/Register';
import Mainhome from '../pages/public/Mainhome';

const publicRoutes = [
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <Mainhome /> },
      { path: 'properties', element: <Properties /> },
      { path: 'about', element: <AboutUs /> },
      { path: 'contact', element: <Contact /> },
      { path: 'property/:id', element: <PropertyDetail /> },
    ],
  },

  // ✅ These are outside the <Home /> layout (standalone)
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Register /> },
];

export default publicRoutes;
