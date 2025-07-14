import React, { useState } from 'react';

const Maintenance = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample maintenance data
  const maintenanceRequests = [
    { 
      id: 1, 
      property: 'Beachfront Villa', 
      tenant: 'John Smith', 
      issue: 'Leaking faucet', 
      date: '2023-05-15', 
      status: 'completed',
      priority: 'medium'
    },
    { 
      id: 2, 
      property: 'Downtown Loft', 
      tenant: 'Sarah Johnson', 
      issue: 'AC not working', 
      date: '2023-05-18', 
      status: 'in-progress',
      priority: 'high'
    },
    { 
      id: 3, 
      property: 'Mountain Cabin', 
      tenant: 'Michael Brown', 
      issue: 'Broken window', 
      date: '2023-05-20', 
      status: 'pending',
      priority: 'high'
    },
    { 
      id: 4, 
      property: 'Urban Apartment', 
      tenant: 'Emily Davis', 
      issue: 'Light fixture replacement', 
      date: '2023-05-22', 
      status: 'pending',
      priority: 'low'
    }
  ];

  const filteredRequests = statusFilter === 'all' 
    ? maintenanceRequests 
    : maintenanceRequests.filter(req => req.status === statusFilter);

  return (
    <div className="maintenance-container">
      <header className="maintenance-header">
        <h2 className="maintenance-title">Maintenance Management</h2>
        <button className="maintenance-new-request-btn">
          + New Maintenance Request
        </button>
      </header>

      <div className="maintenance-tabs">
        <button 
          className={`maintenance-tab ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          Requests
        </button>
        <button 
          className={`maintenance-tab ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          Schedule
        </button>
        <button 
          className={`maintenance-tab ${activeTab === 'vendors' ? 'active' : ''}`}
          onClick={() => setActiveTab('vendors')}
        >
          Vendors
        </button>
        <button 
          className={`maintenance-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>

      <div className="maintenance-controls">
        <div className="maintenance-search">
          <input 
            type="text" 
            placeholder="Search maintenance requests..." 
            className="maintenance-search-input"
          />
          <button className="maintenance-search-btn">
            <i className="maintenance-search-icon">🔍</i>
          </button>
        </div>
        <select 
          className="maintenance-status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {activeTab === 'requests' && (
        <div className="maintenance-requests">
          <table className="maintenance-table">
            <thead>
              <tr className="maintenance-table-header">
                <th>Property</th>
                <th>Tenant</th>
                <th>Issue</th>
                <th>Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(request => (
                <tr key={request.id} className="maintenance-table-row">
                  <td>{request.property}</td>
                  <td>{request.tenant}</td>
                  <td>{request.issue}</td>
                  <td>{request.date}</td>
                  <td>
                    <span className={`maintenance-priority maintenance-priority-${request.priority}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`maintenance-status maintenance-status-${request.status}`}>
                      {request.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td>
                    <button className="maintenance-action-btn maintenance-view-btn">View</button>
                    <button className="maintenance-action-btn maintenance-edit-btn">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="maintenance-schedule">
          <div className="maintenance-calendar-placeholder">
            [Maintenance Calendar Would Appear Here]
          </div>
          <div className="maintenance-upcoming">
            <h3 className="maintenance-upcoming-title">Upcoming Maintenance</h3>
            <ul className="maintenance-upcoming-list">
              <li className="maintenance-upcoming-item">
                <span className="maintenance-upcoming-date">May 25, 2023</span>
                <span className="maintenance-upcoming-desc">Annual HVAC inspection - Beachfront Villa</span>
              </li>
              <li className="maintenance-upcoming-item">
                <span className="maintenance-upcoming-date">June 1, 2023</span>
                <span className="maintenance-upcoming-desc">Fire extinguisher check - All properties</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'vendors' && (
        <div className="maintenance-vendors">
          <div className="maintenance-vendor-cards">
            <div className="maintenance-vendor-card">
              <h3 className="maintenance-vendor-name">ACME Plumbing</h3>
              <p className="maintenance-vendor-contact">John Doe - (555) 123-4567</p>
              <p className="maintenance-vendor-specialty">Specializes in: Pipes, Faucets, Water Heaters</p>
              <div className="maintenance-vendor-actions">
                <button className="maintenance-vendor-btn maintenance-call-btn">Call</button>
                <button className="maintenance-vendor-btn maintenance-email-btn">Email</button>
              </div>
            </div>
            <div className="maintenance-vendor-card">
              <h3 className="maintenance-vendor-name">Quick Fix Electric</h3>
              <p className="maintenance-vendor-contact">Sarah Smith - (555) 987-6543</p>
              <p className="maintenance-vendor-specialty">Specializes in: Wiring, Fixtures, Panels</p>
              <div className="maintenance-vendor-actions">
                <button className="maintenance-vendor-btn maintenance-call-btn">Call</button>
                <button className="maintenance-vendor-btn maintenance-email-btn">Email</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="maintenance-history">
          <div className="maintenance-history-stats">
            <div className="maintenance-stat-card">
              <h4>Completed This Month</h4>
              <p className="maintenance-stat-value">24</p>
            </div>
            <div className="maintenance-stat-card">
              <h4>Average Response Time</h4>
              <p className="maintenance-stat-value">2.3 days</p>
            </div>
            <div className="maintenance-stat-card">
              <h4>Most Common Issue</h4>
              <p className="maintenance-stat-value">Plumbing</p>
            </div>
          </div>
          <div className="maintenance-history-chart">
            [Maintenance History Chart Would Appear Here]
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;