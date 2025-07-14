import React from 'react';

const TenantManagement = () => {
  // Sample tenant data
  const tenants = [
    { id: 1, name: 'John Smith', property: 'Beachfront Villa', rent: '$2,500', status: 'Current' },
    { id: 2, name: 'Sarah Johnson', property: 'Downtown Loft', rent: '$1,800', status: 'Past Due' },
    { id: 3, name: 'Michael Brown', property: 'Mountain Cabin', rent: '$1,200', status: 'Current' }
  ];

  return (
    <div className="tenant-management-container">
      <header className="tenant-management-header">
        <h2 className="tenant-management-title">Tenant Management</h2>
        <button className="tenant-management-add-btn">Add New Tenant</button>
      </header>

      <div className="tenant-management-controls">
        <div className="tenant-management-search">
          <input 
            type="text" 
            placeholder="Search tenants..." 
            className="tenant-management-search-input"
          />
          <button className="tenant-management-search-btn">Search</button>
        </div>
        <select className="tenant-management-filter">
          <option>All Tenants</option>
          <option>Current</option>
          <option>Past Due</option>
          <option>Lease Ending</option>
        </select>
      </div>

      <div className="tenant-management-table-container">
        <table className="tenant-management-table">
          <thead>
            <tr className="tenant-management-table-header">
              <th>Tenant Name</th>
              <th>Property</th>
              <th>Monthly Rent</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map(tenant => (
              <tr key={tenant.id} className="tenant-management-table-row">
                <td>{tenant.name}</td>
                <td>{tenant.property}</td>
                <td>{tenant.rent}</td>
                <td>
                  <span className={`tenant-status tenant-status-${tenant.status.toLowerCase().replace(' ', '-')}`}>
                    {tenant.status}
                  </span>
                </td>
                <td>
                  <button className="tenant-management-action-btn tenant-management-edit-btn">Edit</button>
                  <button className="tenant-management-action-btn tenant-management-delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tenant-management-pagination">
        <button className="tenant-management-pagination-btn">Previous</button>
        <span className="tenant-management-page-info">Page 1 of 3</span>
        <button className="tenant-management-pagination-btn">Next</button>
      </div>
    </div>
  );
};

export default TenantManagement;