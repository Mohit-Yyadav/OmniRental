// import React from 'react';
// import "../../assets/css/DashboardCss/Dashboard.css";
// import Navbar from "../../Components/Navbar/navbar";
// import Sidebar from "../../Components/Sidebar/Sidebar"
// import DashboardBlocks from '../../Components/DashboardMainContent/dashboardMain.jsx';
// import { Link } from "react-router-dom";

// import { HiOutlineHome } from "react-icons/hi";
// import { IoMdPerson } from "react-icons/io";
// import { RiBillLine } from "react-icons/ri";
// import { IoMdCall } from "react-icons/io";
// import { MdOutlineEditNote } from "react-icons/md";
// import { IoGiftSharp } from "react-icons/io5";
// import { MdApartment } from "react-icons/md";
// import { FaLightbulb } from "react-icons/fa";
// import { IoLocationSharp } from "react-icons/io5";
// import { RiSecurePaymentFill } from "react-icons/ri";
// import { CiBellOn } from "react-icons/ci";

// const Sidemenu = () => {
//   return (
    
//     <div>
//       <Navbar/>
//       <Sidebar/>
//        <div className="dashboard-page">
//       <DashboardBlocks />
//       {/* Other dashboard content */}
//     </div>
//      </div>
//   );
// };

// export default Sidemenu;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "../../assets/css/Dashboard.css";
import Navbar from "../../Components/layout/Navbar/navbar.jsx";
import Sidebar from "../../Components/layout/Sidebar/Sidebar.jsx";
import DashboardBlocks from '../../Components/DashboardMainContent/dashboardMain.jsx';

const Sidemenu = () => {
  return (
    <div className="dashboard-layout">
      <Navbar />

      <div className="dashboard-body">
        <div className="dashboard-sidebar">
          <Sidebar />
        </div>

        <div className="dashboard-main">
          <DashboardBlocks />
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;