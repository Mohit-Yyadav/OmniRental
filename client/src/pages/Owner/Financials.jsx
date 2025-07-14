import React, { useState } from 'react';

const Financials = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('monthly');

  // Sample financial data
  const financialData = {
    overview: {
      totalIncome: 12500,
      totalExpenses: 8200,
      netProfit: 4300,
      occupancyRate: '92%'
    },
    transactions: [
      { id: 1, date: '2023-05-15', description: 'Rent - Beachfront Villa', amount: 2500, type: 'income' },
      { id: 2, date: '2023-05-10', description: 'Maintenance - Plumbing', amount: 350, type: 'expense' },
      { id: 3, date: '2023-05-05', description: 'Rent - Downtown Loft', amount: 1800, type: 'income' },
      { id: 4, date: '2023-05-03', description: 'Insurance Payment', amount: 450, type: 'expense' }
    ]
  };

  return (
    <div className="financials-container">
      <header className="financials-header">
        <h2 className="financials-title">Financial Dashboard</h2>
        <div className="financials-time-range">
          <button 
            className={`financials-time-btn ${timeRange === 'monthly' ? 'active' : ''}`}
            onClick={() => setTimeRange('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`financials-time-btn ${timeRange === 'quarterly' ? 'active' : ''}`}
            onClick={() => setTimeRange('quarterly')}
          >
            Quarterly
          </button>
          <button 
            className={`financials-time-btn ${timeRange === 'yearly' ? 'active' : ''}`}
            onClick={() => setTimeRange('yearly')}
          >
            Yearly
          </button>
        </div>
      </header>

      <div className="financials-tabs">
        <button 
          className={`financials-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`financials-tab ${activeTab === 'income' ? 'active' : ''}`}
          onClick={() => setActiveTab('income')}
        >
          Income
        </button>
        <button 
          className={`financials-tab ${activeTab === 'expenses' ? 'active' : ''}`}
          onClick={() => setActiveTab('expenses')}
        >
          Expenses
        </button>
        <button 
          className={`financials-tab ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="financials-overview">
          <div className="financials-cards">
            <div className="financials-card financials-income">
              <h3 className="financials-card-title">Total Income</h3>
              <p className="financials-card-amount">${financialData.overview.totalIncome.toLocaleString()}</p>
              <p className="financials-card-change">↑ 12% from last {timeRange}</p>
            </div>
            <div className="financials-card financials-expenses">
              <h3 className="financials-card-title">Total Expenses</h3>
              <p className="financials-card-amount">${financialData.overview.totalExpenses.toLocaleString()}</p>
              <p className="financials-card-change">↑ 8% from last {timeRange}</p>
            </div>
            <div className="financials-card financials-profit">
              <h3 className="financials-card-title">Net Profit</h3>
              <p className="financials-card-amount">${financialData.overview.netProfit.toLocaleString()}</p>
              <p className="financials-card-change">↑ 15% from last {timeRange}</p>
            </div>
            <div className="financials-card financials-occupancy">
              <h3 className="financials-card-title">Occupancy Rate</h3>
              <p className="financials-card-amount">{financialData.overview.occupancyRate}</p>
              <p className="financials-card-change">↑ 3% from last {timeRange}</p>
            </div>
          </div>

          <div className="financials-chart-container">
            <h3 className="financials-chart-title">Financial Performance</h3>
            <div className="financials-chart-placeholder">
              [Chart would display here]
            </div>
          </div>
        </div>
      )}

      {activeTab === 'income' && (
        <div className="financials-transactions">
          <h3 className="financials-section-title">Income Transactions</h3>
          <table className="financials-table">
            <thead>
              <tr className="financials-table-header">
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {financialData.transactions
                .filter(t => t.type === 'income')
                .map(transaction => (
                  <tr key={transaction.id} className="financials-table-row">
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td className="financials-income-amount">+${transaction.amount}</td>
                    <td>
                      <button className="financials-action-btn financials-edit-btn">Edit</button>
                      <button className="financials-action-btn financials-delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'expenses' && (
        <div className="financials-transactions">
          <h3 className="financials-section-title">Expense Transactions</h3>
          <table className="financials-table">
            <thead>
              <tr className="financials-table-header">
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {financialData.transactions
                .filter(t => t.type === 'expense')
                .map(transaction => (
                  <tr key={transaction.id} className="financials-table-row">
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td className="financials-expense-amount">-${transaction.amount}</td>
                    <td>
                      <button className="financials-action-btn financials-edit-btn">Edit</button>
                      <button className="financials-action-btn financials-delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="financials-reports">
          <h3 className="financials-section-title">Financial Reports</h3>
          <div className="financials-reports-grid">
            <div className="financials-report-card">
              <h4>Income Statement</h4>
              <button className="financials-download-btn">Download PDF</button>
              <button className="financials-download-btn">View Online</button>
            </div>
            <div className="financials-report-card">
              <h4>Balance Sheet</h4>
              <button className="financials-download-btn">Download PDF</button>
              <button className="financials-download-btn">View Online</button>
            </div>
            <div className="financials-report-card">
              <h4>Cash Flow</h4>
              <button className="financials-download-btn">Download PDF</button>
              <button className="financials-download-btn">View Online</button>
            </div>
            <div className="financials-report-card">
              <h4>Custom Report</h4>
              <button className="financials-generate-btn">Generate Report</button>
            </div>
          </div>
        </div>
      )}

      <div className="financials-actions">
        <button className="financials-main-action">Add Transaction</button>
        <button className="financials-export-btn">Export Data</button>
      </div>
    </div>
  );
};

export default Financials;