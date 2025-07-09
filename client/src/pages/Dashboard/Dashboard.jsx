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
import "../../assets/css/DashboardCss/Dashboard.css";
import Navbar from "../../Components/Navbar/navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import DashboardBlocks from '../../Components/DashboardMainContent/dashboardMain.jsx';

const Sidemenu = () => {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Navbar at the top */}
      <Navbar />
      
      {/* Main content area */}
      <Container fluid className="flex-grow-1 g-0 p-0 mw-100">
        <Row className="g-0 h-100 mw-100">
          {/* Sidebar - fixed width */}
          <Col lg={2} className="d-none d-lg-block h-100 bg-light p-0">
            <Sidebar />
          </Col>
          
          {/* Main content - takes remaining space */}
          <Col lg={10} className="h-100 p-0">
            <div className="w-100 h-100">
              <DashboardBlocks />
              {/* Other dashboard content */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sidemenu;