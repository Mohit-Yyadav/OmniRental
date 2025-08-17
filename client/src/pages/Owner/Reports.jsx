import React, { useState } from 'react';

const Reports = () => {
  const [activeReport, setActiveReport] = useState('financial');
  const [dateRange, setDateRange] = useState('this-month');

  // Sample report data
  const reportData = {
    financial: {
      title: "Financial Summary",
      description: "Overview of income, expenses, and net profit",
      columns: ["Period", "Total Income", "Total Expenses", "Net Profit", "Occupancy Rate"],
      rows: [
        ["May 2023", "$12,500", "$8,200", "$4,300", "92%"],
        ["April 2023", "$11,800", "$7,900", "$3,900", "89%"],
        ["March 2023", "$12,100", "$8,500", "$3,600", "91%"]
      ]
    },
    maintenance: {
      title: "Maintenance Report",
      description: "Tracking of maintenance requests and costs",
      columns: ["Property", "Issue", "Date", "Status", "Cost"],
      rows: [
        ["Beachfront Villa", "AC Repair", "2023-05-15", "Completed", "$350"],
        ["Downtown Loft", "Plumbing", "2023-05-18", "Completed", "$275"],
        ["Mountain Cabin", "Window Replacement", "2023-05-20", "Pending", "-"]
      ]
    },
    tenant: {
      title: "Tenant Activity",
      description: "Lease agreements and tenant turnover",
      columns: ["Tenant", "Property", "Move-In Date", "Lease End", "Status"],
      rows: [
        ["John Smith", "Beachfront Villa", "2022-06-01", "2023-12-01", "Current"],
        ["Sarah Johnson", "Downtown Loft", "2023-01-15", "2024-01-15", "Current"],
        ["Michael Brown", "Mountain Cabin", "2021-09-01", "2023-09-01", "Ending Soon"]
      ]
    }
  };

  return (
    <div className="reports-container">
      <header className="reports-header">
        <h2 className="reports-title">Property Reports</h2>
        <div className="reports-date-range">
          <select 
            className="reports-date-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="this-quarter">This Quarter</option>
            <option value="this-year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </header>

      <div className="reports-nav">
        <button 
          className={`reports-nav-btn ${activeReport === 'financial' ? 'active' : ''}`}
          onClick={() => setActiveReport('financial')}
        >
          Financial Reports
        </button>
        <button 
          className={`reports-nav-btn ${activeReport === 'maintenance' ? 'active' : ''}`}
          onClick={() => setActiveReport('maintenance')}
        >
          Maintenance Reports
        </button>
        <button 
          className={`reports-nav-btn ${activeReport === 'tenant' ? 'active' : ''}`}
          onClick={() => setActiveReport('tenant')}
        >
          Tenant Reports
        </button>
        <button 
          className={`reports-nav-btn ${activeReport === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveReport('custom')}
        >
          Custom Reports
        </button>
      </div>

      <div className="reports-content">
        {activeReport !== 'custom' ? (
          <>
            <div className="reports-info">
              <h3 className="reports-info-title">{reportData[activeReport].title}</h3>
              <p className="reports-info-desc">{reportData[activeReport].description}</p>
            </div>

            <div className="reports-table-container">
              <table className="reports-table">
                <thead>
                  <tr className="reports-table-header">
                    {reportData[activeReport].columns.map((column, index) => (
                      <th key={index}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportData[activeReport].rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="reports-table-row">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="reports-actions">
              <button className="reports-export-btn reports-export-pdf">
                Export as PDF
              </button>
              <button className="reports-export-btn reports-export-excel">
                Export as Excel
              </button>
              <button className="reports-export-btn reports-print">
                Print Report
              </button>
            </div>

            <div className="reports-chart-container">
              <h4 className="reports-chart-title">Visual Representation</h4>
              <div className="reports-chart-placeholder">
                [Chart visualization would appear here]
              </div>
            </div>
          </>
        ) : (
          <div className="reports-custom">
            <h3 className="reports-custom-title">Create Custom Report</h3>
            
            <div className="reports-custom-form">
              <div className="reports-custom-field">
                <label className="reports-custom-label">Report Name</label>
                <input 
                  type="text" 
                  className="reports-custom-input"
                  placeholder="My Custom Report"
                />
              </div>

              <div className="reports-custom-field">
                <label className="reports-custom-label">Data Source</label>
                <select className="reports-custom-select">
                  <option>Financial Data</option>
                  <option>Maintenance Records</option>
                  <option>Tenant Information</option>
                  <option>Property Details</option>
                </select>
              </div>

              <div className="reports-custom-field">
                <label className="reports-custom-label">Columns to Include</label>
                <div className="reports-custom-checkboxes">
                  <label className="reports-custom-checkbox">
                    <input type="checkbox" /> Property Name
                  </label>
                  <label className="reports-custom-checkbox">
                    <input type="checkbox" /> Tenant Name
                  </label>
                  <label className="reports-custom-checkbox">
                    <input type="checkbox" /> Rent Amount
                  </label>
                  <label className="reports-custom-checkbox">
                    <input type="checkbox" /> Lease Dates
                  </label>
                  <label className="reports-custom-checkbox">
                    <input type="checkbox" /> Maintenance Costs
                  </label>
                </div>
              </div>

              <div className="reports-custom-field">
                <label className="reports-custom-label">Date Range</label>
                <div className="reports-custom-dates">
                  <input type="date" className="reports-custom-date" />
                  <span className="reports-custom-to">to</span>
                  <input type="date" className="reports-custom-date" />
                </div>
              </div>

              <button className="reports-custom-generate">
                Generate Custom Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;