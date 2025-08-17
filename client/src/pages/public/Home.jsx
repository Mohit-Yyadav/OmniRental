import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Outlet /> {/* This will render the child routes */}
      </div>
      <Footer />
    </>
  );
};

export default Home;