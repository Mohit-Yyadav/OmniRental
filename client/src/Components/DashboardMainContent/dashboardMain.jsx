

import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaMoneyBillWave, FaUsers, FaUserCheck, FaArrowRight } from 'react-icons/fa';
import './dashboardMain.css';
import { HiOutlineHome } from "react-icons/hi";

const DashboardBlocks = () => {
  return (
    <div>
      <div className="dashboard-container">
        <h2 className="dashboard-title">Dashboard</h2>
        
        <Row className="g-4">
          {/* Income Block */}
          <Col md={6} lg={3} className="Cardblock">
            <Card className="dashboard-card income-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="card-icon me-3">
                    <FaMoneyBillWave size={20} />
                  </div>
                  <Card.Title className="mb-0">My Total Income</Card.Title>
                </div>
                <Card.Text className="card-value">40,915.00</Card.Text>
                <div className="card-link">
                  <a href="#account-balance">
                    My Account balance <FaArrowRight />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Investor Account Block */}
          <Col md={6} lg={3} className="Cardblock">
            <Card className="dashboard-card tenants-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="card-icon me-3">
                    <FaUsers size={20} />
                  </div>
                  <Card.Title className="mb-0">My Investor Account Balance</Card.Title>
                </div>
                <Card.Text className="card-value">34,915.00</Card.Text>
                <div className="card-link">
                  <a href="#all-tenants">
                    My Account balance <FaArrowRight />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Investor Expense Block */}
          <Col md={6} lg={3} className="Cardblock">
            <Card className="dashboard-card admitted-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="card-icon me-3">
                    <FaUserCheck size={20} />
                  </div>
                  <Card.Title className="mb-0">My Investor Account Expense</Card.Title>
                </div>
                <Card.Text className="card-value">60000.00</Card.Text>
                <div className="card-link">
                  <a href="#admitted-tenants">
                    My Account balance <FaArrowRight />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      
      <div className="dashboard-container">
        <Row className="g-4">
          {/* All Tenants Block */}
          <Col md={6} lg={3} className="Cardblock">
            <Card className="dashboard-card income-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="card-icon me-3">
                    <FaMoneyBillWave size={20} />
                  </div>
                  <Card.Title className="mb-0">All Tenants</Card.Title>
                </div>
                <Card.Text className="card-value">0</Card.Text>
                <div className="card-link">
                  <a href="#account-balance">
                    All Admitted Tenants <FaArrowRight />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Admitted Tenants Block */}
          <Col md={6} lg={3} className="Cardblock">
            <Card className="dashboard-card admitted-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="card-icon me-3">
                    <FaUserCheck size={20} />
                  </div>
                  <Card.Title className="mb-0">All Admitted Tenants</Card.Title>
                </div>
                <Card.Text className="card-value">0</Card.Text>
                <div className="card-link">
                  <a href="#admitted-tenants">
                    View details <FaArrowRight />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Vacated Tenants Block */}
          <Col md={6} lg={3} className="Cardblock">
            <Card className="dashboard-card tenants-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="card-icon me-3">
                    <FaUsers size={20} />
                  </div>
                  <Card.Title className="mb-0">Recently Vacated</Card.Title>
                </div>
                <Card.Text className="card-value">0</Card.Text>
                <div className="card-link">
                  <a href="#all-tenants">
                    Tenants that vacated this month <FaArrowRight />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="dashboard-container">
        <Row className="g-4">
          {/* Rent Collected Block */}
          <Col md={6} lg={3} className="Cardblock">
            <Card className="dashboard-card income-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="card-icon me-3">
                    <FaMoneyBillWave size={20} />
                  </div>
                  <Card.Title className="mb-0">Total Rent Collected</Card.Title>
                </div>
                <Card.Text className="card-value">40,915.00</Card.Text>
                <div className="card-link">
                  <a href="#account-balance">
                    All Rent Collected <FaArrowRight />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Month's Collection Block */}
          <Col md={6} lg={3} className="Cardblock">
            <Card className="dashboard-card tenants-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="card-icon me-3">
                    <FaUsers size={20} />
                  </div>
                  <Card.Title className="mb-0">This Month's Collection</Card.Title>
                </div>
                <Card.Text className="card-value">0</Card.Text>
                <div className="card-link">
                  <a href="#all-tenants">
                    Rent Collected this month <FaArrowRight />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Rent Balance Block */}
          <Col md={6} lg={3} className="Cardblock">
            <Card className="dashboard-card admitted-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="card-icon me-3">
                    <FaUserCheck size={20} />
                  </div>
                  <Card.Title className="mb-0">Rent Account Balance</Card.Title>
                </div>
                <Card.Text className="card-value">0</Card.Text>
                <div className="card-link">
                  <a href="#admitted-tenants">
                    Rent Account Balance <FaArrowRight />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="dashboard-container">
        <Row className="g-4">
          {/* Apartments Block */}
          <Col md={6} lg={3} className="Cardblock">
            <Card className="dashboard-card income-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="card-icon me-3">
                    <FaMoneyBillWave size={20} />
                  </div>
                  <Card.Title className="mb-0">All Apartments</Card.Title>
                </div>
                <Card.Text className="card-value">1</Card.Text>
                <div className="card-link">
                  <a href="#account-balance">
                    All Existing Apartments <FaArrowRight />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Available Units Block */}
          <Col md={6} lg={3} className="Cardblock">
            <Card className="dashboard-card tenants-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="card-icon me-3">
                    <FaUsers size={20} />
                  </div>
                  <Card.Title className="mb-0">Available Rent Units</Card.Title>
                </div>
                <Card.Text className="card-value">45</Card.Text>
                <div className="card-link">
                  <a href="#all-tenants">
                    Available Renting Units <FaArrowRight />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* All Rental Units Block */}
          <Col md={6} lg={3} className="Cardblock">
            <Card className="dashboard-card admitted-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="card-icon me-3">
                    <FaUserCheck size={20} />
                  </div>
                  <Card.Title className="mb-0">All Rental units</Card.Title>
                </div>
                <Card.Text className="card-value">50</Card.Text>
                <div className="card-link">
                  <a href="#admitted-tenants">
                    All existing renting units <FaArrowRight />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashboardBlocks;