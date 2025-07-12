// import React, { useState } from 'react';
// import { 
//   DashboardOutlined, 
//   HomeOutlined, 
//   EditOutlined, 
//   DollarOutlined, 
//   HistoryOutlined, 
//   UserOutlined,
//   BellOutlined,
//   LogoutOutlined
// } from '@ant-design/icons';
// import { 
//   Layout, 
//   Menu, 
//   Card, 
//   Table, 
//   Tag, 
//   Progress, 
//   Avatar, 
//   Badge, 
//   Button, 
//   Form, 
//   Input, 
//   Select, 
//   DatePicker, 
//   Divider 
// } from 'antd';
// import './TenantDashboard.css'; // Make sure to create this CSS file

// const { Header, Sider, Content } = Layout;
// const { Option } = Select;
// const { TextArea } = Input;

// const TenantDashboard = () => {
//   // Hardcoded data
//   const tenantProfile = {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone: "+1 (555) 123-4567",
//     address: "123 Main St, Apt 4B, New York, NY 10001",
//     idProof: "A12345678",
//     emergencyContact: "Jane Doe (Spouse) - +1 (555) 987-6543",
//     profilePic: "https://randomuser.me/api/portraits/men/1.jpg"
//   };

//   const propertyDetails = {
//     propertyName: "Sunshine Apartments",
//     roomNumber: "304",
//     address: "456 Sunshine Ave, New York, NY 10002",
//     rentAmount: 1200,
//     deposit: 2400,
//     leaseStart: "2023-01-15",
//     leaseEnd: "2024-01-14",
//     amenities: ["WiFi", "Laundry", "Parking", "Gym"],
//     status: "approved"
//   };

//   const paymentHistory = [
//     { id: 1, date: "2023-06-01", amount: 1200, method: "Credit Card", status: "completed", invoice: "INV-2023-06-001" },
//     { id: 2, date: "2023-05-01", amount: 1200, method: "Bank Transfer", status: "completed", invoice: "INV-2023-05-001" },
//     { id: 3, date: "2023-04-01", amount: 1200, method: "Credit Card", status: "completed", invoice: "INV-2023-04-001" },
//   ];

//   const pendingRequests = [
//     { id: 1, type: "Maintenance", date: "2023-06-15", status: "pending", description: "Kitchen sink is leaking" },
//     { id: 2, type: "Lease Extension", date: "2023-06-10", status: "processing", description: "Request to extend lease by 6 months" }
//   ];

//   const notifications = [
//     { id: 1, title: "Rent Due Reminder", message: "Your rent payment of $1200 is due in 3 days", date: "2023-06-28", read: false },
//     { id: 2, title: "Maintenance Update", message: "Your maintenance request has been approved. Technician will visit on June 20", date: "2023-06-18", read: true }
//   ];

//   // State management
//   const [collapsed, setCollapsed] = useState(false);
//   const [activeMenu, setActiveMenu] = useState('dashboard');
//   const [editMode, setEditMode] = useState(false);
//   const [profileForm] = Form.useForm();
//   const [propertyForm] = Form.useForm();

//   // Initialize forms
//   React.useEffect(() => {
//     profileForm.setFieldsValue(tenantProfile);
//     propertyForm.setFieldsValue(propertyDetails);
//   }, []);

//   // Handlers
//   const handleMenuClick = (e) => setActiveMenu(e.key);
//   const handleEditProfile = () => setEditMode(true);
//   const handleSaveProfile = () => setEditMode(false);
//   const handleSaveProperty = () => console.log('Property details saved:', propertyForm.getFieldsValue());
//   const handlePayment = () => console.log('Initiate payment process');

//   // Table columns
//   const paymentColumns = [
//     { title: 'Date', dataIndex: 'date', key: 'date' },
//     { title: 'Amount', dataIndex: 'amount', key: 'amount', render: amount => `$${amount}` },
//     { title: 'Payment Method', dataIndex: 'method', key: 'method' },
//     { 
//       title: 'Status', 
//       dataIndex: 'status', 
//       key: 'status',
//       render: status => <Tag color={status === 'completed' ? 'green' : 'orange'}>{status.toUpperCase()}</Tag>
//     },
//     { title: 'Invoice', dataIndex: 'invoice', key: 'invoice', render: text => <a href="#">{text}</a> },
//   ];

//   const requestColumns = [
//     { title: 'Type', dataIndex: 'type', key: 'type' },
//     { title: 'Date', dataIndex: 'date', key: 'date' },
//     { 
//       title: 'Status', 
//       dataIndex: 'status', 
//       key: 'status',
//       render: status => (
//         <Tag color={
//           status === 'pending' ? 'orange' : 
//           status === 'processing' ? 'blue' : 
//           status === 'completed' ? 'green' : 'red'
//         }>
//           {status.toUpperCase()}
//         </Tag>
//       )
//     },
//     { title: 'Description', dataIndex: 'description', key: 'description' },
//   ];

//   // Content renderers
//   const renderDashboard = () => (
//     <div className="dashboard-content">
//       <h2>Tenant Dashboard</h2>
//       <div className="dashboard-cards">
//         <Card title="Rent Status" className="dashboard-card">
//           <div className="rent-status">
//             <Progress type="circle" percent={100} width={80} status="success" format={() => 'Paid'} />
//             <div className="rent-info">
//               <p>Next Payment Due: <strong>July 1, 2023</strong></p>
//               <p>Amount: <strong>${propertyDetails.rentAmount}</strong></p>
//               <Button type="primary" onClick={handlePayment}>Pay Now</Button>
//             </div>
//           </div>
//         </Card>
        
//         <Card title="Property Details" className="dashboard-card">
//           <p><strong>Property:</strong> {propertyDetails.propertyName}</p>
//           <p><strong>Room:</strong> {propertyDetails.roomNumber}</p>
//           <p><strong>Address:</strong> {propertyDetails.address}</p>
//           <p><strong>Lease:</strong> {propertyDetails.leaseStart} to {propertyDetails.leaseEnd}</p>
//           <Button type="link" onClick={() => setActiveMenu('property')}>View Details</Button>
//         </Card>
        
//         <Card title="Pending Requests" className="dashboard-card">
//           <Table dataSource={pendingRequests} columns={requestColumns} pagination={false} size="small" />
//           <Button type="link" onClick={() => setActiveMenu('requests')}>View All</Button>
//         </Card>
        
//         <Card title="Notifications" className="dashboard-card">
//           <div className="notifications-list">
//             {notifications.map(notification => (
//               <div key={notification.id} className={`notification-item ${!notification.read ? 'unread' : ''}`}>
//                 <h4>{notification.title}</h4>
//                 <p>{notification.message}</p>
//                 <small>{notification.date}</small>
//               </div>
//             ))}
//           </div>
//           <Button type="link">View All</Button>
//         </Card>
//       </div>
//     </div>
//   );

//   const renderProfile = () => (
//     <div className="profile-content">
//       <div className="profile-header">
//         <h2>My Profile</h2>
//         {editMode ? (
//           <Button type="primary" onClick={handleSaveProfile}>Save Profile</Button>
//         ) : (
//           <Button onClick={handleEditProfile} icon={<EditOutlined />}>Edit Profile</Button>
//         )}
//       </div>
      
//       <div className="profile-details">
//         <div className="profile-picture">
//           <Avatar size={128} src={tenantProfile.profilePic} />
//           {editMode && <Button type="link">Change Photo</Button>}
//         </div>
        
//         <Form form={profileForm} layout="vertical" className="profile-form" disabled={!editMode}>
//           <Form.Item label="Full Name" name="name"><Input /></Form.Item>
//           <Form.Item label="Email" name="email"><Input /></Form.Item>
//           <Form.Item label="Phone Number" name="phone"><Input /></Form.Item>
//           <Form.Item label="Current Address" name="address"><Input /></Form.Item>
//           <Form.Item label="ID Proof Number" name="idProof"><Input /></Form.Item>
//           <Form.Item label="Emergency Contact" name="emergencyContact"><Input /></Form.Item>
//         </Form>
//       </div>
//     </div>
//   );

//   const renderProperty = () => (
//     <div className="property-content">
//       <div className="property-header">
//         <h2>Property Details</h2>
//         <Button type="primary" onClick={handleSaveProperty}>Save Changes</Button>
//       </div>
      
//       <div className="property-status">
//         <Tag color={propertyDetails.status === 'approved' ? 'green' : propertyDetails.status === 'pending' ? 'orange' : 'red'}>
//           {propertyDetails.status.toUpperCase()}
//         </Tag>
//         {propertyDetails.status === 'pending' && (
//           <p>Your application is under review. Please check back later.</p>
//         )}
//       </div>
      
//       <Form form={propertyForm} layout="vertical" className="property-form">
//         <Form.Item label="Property Name" name="propertyName"><Input /></Form.Item>
//         <Form.Item label="Room Number" name="roomNumber"><Input /></Form.Item>
//         <Form.Item label="Address" name="address"><TextArea rows={2} /></Form.Item>
        
//         <Divider orientation="left">Lease Information</Divider>
        
//         <div className="form-row">
//           <Form.Item label="Monthly Rent" name="rentAmount" className="form-col">
//             <Input prefix="$" />
//           </Form.Item>
//           <Form.Item label="Security Deposit" name="deposit" className="form-col">
//             <Input prefix="$" />
//           </Form.Item>
//         </div>
        
//         <div className="form-row">
//           <Form.Item label="Lease Start Date" name="leaseStart" className="form-col">
//             <DatePicker style={{ width: '100%' }} />
//           </Form.Item>
//           <Form.Item label="Lease End Date" name="leaseEnd" className="form-col">
//             <DatePicker style={{ width: '100%' }} />
//           </Form.Item>
//         </div>
        
//         <Form.Item label="Amenities" name="amenities">
//           <Select mode="multiple" placeholder="Select amenities">
//             <Option value="WiFi">WiFi</Option>
//             <Option value="Laundry">Laundry</Option>
//             <Option value="Parking">Parking</Option>
//             <Option value="Gym">Gym</Option>
//             <Option value="Pool">Pool</Option>
//             <Option value="AC">Air Conditioning</Option>
//           </Select>
//         </Form.Item>
//       </Form>
//     </div>
//   );

//   const renderPayments = () => (
//     <div className="payments-content">
//       <div className="payments-header">
//         <h2>Payment History</h2>
//         <Button type="primary" onClick={handlePayment}>Make a Payment</Button>
//       </div>
//       <Table dataSource={paymentHistory} columns={paymentColumns} rowKey="id" />
//     </div>
//   );

//   const renderRequests = () => (
//     <div className="requests-content">
//       <div className="requests-header">
//         <h2>My Requests</h2>
//         <Button type="primary">New Request</Button>
//       </div>
//       <Table dataSource={pendingRequests} columns={requestColumns} rowKey="id" />
//     </div>
//   );

//   // Main content switcher
//   const renderContent = () => {
//     switch (activeMenu) {
//       case 'dashboard': return renderDashboard();
//       case 'profile': return renderProfile();
//       case 'property': return renderProperty();
//       case 'payments': return renderPayments();
//       case 'requests': return renderRequests();
//       default: return <div>Page not found</div>;
//     }
//   };

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
//         <div className="logo">{collapsed ? 'RD' : 'Rental Dashboard'}</div>
//         <Menu theme="dark" selectedKeys={[activeMenu]} mode="inline" onClick={handleMenuClick}>
//           <Menu.Item key="dashboard" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
//           <Menu.Item key="profile" icon={<UserOutlined />}>My Profile</Menu.Item>
//           <Menu.Item key="property" icon={<HomeOutlined />}>Property Details</Menu.Item>
//           <Menu.Item key="payments" icon={<DollarOutlined />}>Payments</Menu.Item>
//           <Menu.Item key="requests" icon={<EditOutlined />}>My Requests</Menu.Item>
//           <Menu.Item key="history" icon={<HistoryOutlined />}>Rental History</Menu.Item>
//         </Menu>
//       </Sider>
      
//       <Layout className="site-layout">
//         <Header className="site-header">
//           <div className="header-left"><h1>Tenant Portal</h1></div>
//           <div className="header-right">
//             <Badge count={notifications.filter(n => !n.read).length}>
//               <Button type="text" icon={<BellOutlined />} size="large" />
//             </Badge>
//             <Avatar src={tenantProfile.profilePic} />
//             <span className="user-name">{tenantProfile.name}</span>
//             <Button type="text" icon={<LogoutOutlined />} />
//           </div>
//         </Header>
        
//         <Content className="site-content">
//           {renderContent()}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default TenantDashboard;