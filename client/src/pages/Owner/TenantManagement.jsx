import React, { useState, useEffect } from 'react';
import { 
  
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  Grid,
  Divider,
  CircularProgress,
  Chip,
  Card,
  CardContent,
  Box,
  Tabs,
  Dialog, 
  DialogTitle,
  DialogContent, // ✅ Add this
  DialogActions,
  Tab
} from '@mui/material';
import axios from 'axios';
import { message } from 'antd';
import { 
  Search as SearchIcon, 
  Add as AddIcon,
  Receipt as ReceiptIcon,
  Payment as PaymentIcon,
  List as ListIcon,
  AccountCircle as AccountIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';
// import { loadRazorpay } from '../../utils/razorpay';

const TenantManagement = () => {
  // State for tabs
  const [tabValue, setTabValue] = useState(0);
  
  // Tenant management states
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openSelectDialog, setOpenSelectDialog] = useState(false);
  const [depositedTenants, setDepositedTenants] = useState([]);
  const [allTenants, setAllTenants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tenantLoading, setTenantLoading] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tenantSearchTerm, setTenantSearchTerm] = useState('');

  // Monthly record states
  const [monthlyRecords, setMonthlyRecords] = useState([]);
  const [currentMonthRecord, setCurrentMonthRecord] = useState(null);
  const [recordLoading, setRecordLoading] = useState(false);
  const [openGenerateDialog, setOpenGenerateDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [units, setUnits] = useState('');
  const [extraCharges, setExtraCharges] = useState(0);

  const token = localStorage.getItem('token');

  // Form state
  const [formData, setFormData] = useState({
    room: '',
    members: 1,
    rent: '',
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().add(1, 'year').format('YYYY-MM-DD'),
    meterNumber: '',
    pricePerUnit: ''
  });

  // Fetch deposited tenants
  const fetchDepositedTenants = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/owner/deposits', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDepositedTenants(response.data);
    } catch (error) {
      message.error('Failed to fetch deposited tenants');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all tenants
  const fetchAllTenants = async () => {
    try {
      setTenantLoading(true);
      const response = await axios.get('/api/tenants', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllTenants(response.data);
    } catch (error) {
      message.error('Failed to fetch tenants');
      console.error(error);
    } finally {
      setTenantLoading(false);
    }
  };

  // Fetch monthly records for selected tenant
  const fetchMonthlyRecords = async (tenantId) => {
    try {
      setRecordLoading(true);
      const response = await axios.get(`/api/tenant/${tenantId}/records`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMonthlyRecords(response.data);
      
      // Check if current month record exists
      const currentMonth = dayjs().format('YYYY-MM');
      const currentRecord = response.data.find(r => r.month === currentMonth);
      setCurrentMonthRecord(currentRecord || null);
    } catch (error) {
      message.error('Failed to fetch monthly records');
      console.error(error);
    } finally {
      setRecordLoading(false);
    }
  };

  useEffect(() => {
    fetchDepositedTenants();
    fetchAllTenants();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectTenant = (tenant) => {
    setSelectedTenant(tenant);
    setOpenSelectDialog(false);
    setFormData(prev => ({
      ...prev,
      rent: tenant.depositAmount,
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().add(1, 'year').format('YYYY-MM-DD')
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        '/api/owner/add-tenant',
        {
          tenantId: selectedTenant.id,
          propertyId: selectedTenant.property.id,
          roomNo: formData.room,
          members: formData.members,
          rent: formData.rent,
          startDate: formData.startDate,
          endDate: formData.endDate,
          meterNumber: formData.meterNumber,
          pricePerUnit: formData.pricePerUnit
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      message.success('Tenant added successfully');
      setOpenAddDialog(false);
      resetForm();
      fetchAllTenants();
    } catch (error) {
      console.error('Error adding tenant:', error);
      message.error(error.response?.data?.error || 'Failed to add tenant');
    } finally {
      setLoading(false);
    }
  };

  // Generate monthly invoice
  const handleGenerateInvoice = async () => {
    try {
      setLoading(true);
      const currentDate = new Date();
      const month = dayjs(currentDate).format('YYYY-MM');
      
      const response = await axios.post('/api/tenant/generate-invoice', {
        tenantId: selectedTenant.id,
        month,
        unitsConsumed: units,
        extraCharges: extraCharges || 0
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCurrentMonthRecord(response.data);
      setOpenGenerateDialog(false);
      fetchMonthlyRecords(selectedTenant.id);
      message.success('Invoice generated successfully');
    } catch (error) {
      console.error('Failed to generate invoice:', error);
      message.error(error.response?.data?.error || 'Failed to generate invoice');
    } finally {
      setLoading(false);
    }
  };

  // Handle payment via Razorpay
  const handlePayment = async () => {
    try {
      setLoading(true);
      
      const response = await axios.post('/api/tenant/create-payment', {
        invoiceId: currentMonthRecord.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const { orderId, amount, currency } = response.data;
      
      await loadRazorpay();
      
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency: currency,
        name: 'Rental Management',
        description: `Payment for ${dayjs().format('MMMM YYYY')}`,
        order_id: orderId,
        handler: async function(response) {
          try {
            await axios.post('/api/tenant/verify-payment', {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            }, {
              headers: { Authorization: `Bearer ${token}` }
            });
            
            message.success('Payment successful');
            fetchMonthlyRecords(selectedTenant.id);
            setOpenPaymentDialog(false);
          } catch (error) {
            console.error('Payment verification failed:', error);
            message.error('Payment verification failed');
          }
        },
        prefill: {
          name: selectedTenant.name,
          email: selectedTenant.email,
          contact: selectedTenant.phone
        },
        theme: {
          color: '#3399cc'
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment failed:', error);
      message.error(error.response?.data?.error || 'Payment initialization failed');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedTenant(null);
    setFormData({
      room: '',
      members: 1,
      rent: '',
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().add(1, 'year').format('YYYY-MM-DD'),
      meterNumber: '',
      pricePerUnit: ''
    });
  };

  const filteredTenants = depositedTenants.filter(tenant =>
    (tenant?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tenant?.property?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAllTenants = allTenants.filter(tenant =>
    (tenant?.name || '').toLowerCase().includes(tenantSearchTerm.toLowerCase()) ||
    (tenant?.property?.name || '').toLowerCase().includes(tenantSearchTerm.toLowerCase())
  );

  // Columns for all tenants table
  const tenantColumns = [
    { 
      field: 'name', 
      headerName: 'Tenant Name', 
      width: 200,
      renderCell: (params) => (
        <div>
          <Typography fontWeight="medium">{params.row.name}</Typography>
          <Typography variant="body2">{params.row.email}</Typography>
        </div>
      )
    },
    { 
      field: 'property', 
      headerName: 'Property', 
      width: 200,
      renderCell: (params) => (
        <div>
          <Typography>{params.row.property?.name || 'N/A'}</Typography>
          <Typography variant="body2">{params.row.property?.address || ''}</Typography>
        </div>
      )
    },
    { 
      field: 'roomNo', 
      headerName: 'Room No.', 
      width: 100 
    },
    { 
      field: 'rent', 
      headerName: 'Rent', 
      width: 120,
      renderCell: (params) => `₹${params.row.rent?.toLocaleString() || '0'}`
    },
    { 
      field: 'leasePeriod', 
      headerName: 'Lease Period', 
      width: 200,
      renderCell: (params) => (
        <div>
          <Typography>{dayjs(params.row.startDate).format('MMM D, YYYY')}</Typography>
          <Typography variant="body2">to {dayjs(params.row.endDate).format('MMM D, YYYY')}</Typography>
        </div>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.row.status} 
          color={params.row.status === 'active' ? 'success' : 'error'} 
          size="small"
        />
      )
    },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      width: 150,
      renderCell: (params) => (
        <div>
          <Button 
            size="small" 
            color="primary"
            onClick={() => {
              setSelectedTenant(params.row);
              fetchMonthlyRecords(params.row.id);
              setTabValue(1); // Switch to records tab
            }}
          >
            Records
          </Button>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Typography variant="h4" gutterBottom>
        Tenant Management System
      </Typography>
      
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
        <Tab label="Tenant List" icon={<ListIcon />} />
        <Tab 
          label="Monthly Records" 
          icon={<ReceiptIcon />} 
          disabled={!selectedTenant} 
        />
      </Tabs>
      
      {tabValue === 0 ? (
        <>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddDialog(true)}
            sx={{ mb: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Add New Tenant'}
          </Button>

          {/* Add Tenant Dialog */}
          <Dialog 
            open={openAddDialog} 
            onClose={() => !loading && setOpenAddDialog(false)}
            maxWidth="md"
            fullWidth
          >
            <div style={{ padding: '24px' }}>
              <Typography variant="h5" gutterBottom>
                Add New Tenant
              </Typography>
              
              {!selectedTenant ? (
                <Button
                  variant="outlined"
                  onClick={() => setOpenSelectDialog(true)}
                  sx={{ mb: 3 }}
                  disabled={loading}
                >
                  Select from Deposited Tenants
                </Button>
              ) : (
                <>
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1">Tenant Information</Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Typography><strong>Name:</strong> {selectedTenant.name}</Typography>
                      <Typography><strong>Email:</strong> {selectedTenant.email}</Typography>
                      <Typography><strong>Phone:</strong> {selectedTenant.phone}</Typography>
                      <Typography><strong>Deposit Paid:</strong> ₹{selectedTenant.depositAmount}</Typography>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1">Property Information</Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Typography><strong>Property:</strong> {selectedTenant.property.name}</Typography>
                      <Typography><strong>Address:</strong> {selectedTenant.property.address}</Typography>
                    </Grid>
                  </Grid>

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                          <InputLabel>Room Number</InputLabel>
                          <Select
                            name="room"
                            value={formData.room}
                            onChange={handleInputChange}
                            label="Room Number"
                            required
                            disabled={loading}
                          >
                            {selectedTenant.property.rooms.map(room => (
                              <MenuItem key={room} value={room}>{room}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <TextField
                          fullWidth
                          label="Number of Members"
                          name="members"
                          type="number"
                          value={formData.members}
                          onChange={handleInputChange}
                          sx={{ mb: 3 }}
                          required
                          disabled={loading}
                        />

                        <TextField
                          fullWidth
                          label="Monthly Rent (₹)"
                          name="rent"
                          type="number"
                          value={formData.rent}
                          onChange={handleInputChange}
                          sx={{ mb: 3 }}
                          required
                          disabled={loading}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Lease Start Date"
                          name="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          InputLabelProps={{ shrink: true }}
                          sx={{ mb: 3 }}
                          required
                          disabled={loading}
                        />

                        <TextField
                          fullWidth
                          label="Lease End Date"
                          name="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          InputLabelProps={{ shrink: true }}
                          sx={{ mb: 3 }}
                          required
                          disabled={loading}
                        />
                      </Grid>
                    </Grid>

                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Utility Information
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Meter Number"
                          name="meterNumber"
                          value={formData.meterNumber}
                          onChange={handleInputChange}
                          sx={{ mb: 3 }}
                          required
                          disabled={loading}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Price Per Unit (₹)"
                          name="pricePerUnit"
                          type="number"
                          value={formData.pricePerUnit}
                          onChange={handleInputChange}
                          sx={{ mb: 3 }}
                          required
                          disabled={loading}
                        />
                      </Grid>
                    </Grid>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                      <Button 
                        variant="outlined" 
                        onClick={() => {
                          setOpenAddDialog(false);
                          resetForm();
                        }}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="contained" 
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? <CircularProgress size={24} /> : 'Save Tenant'}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </Dialog>

          {/* Select Tenant Dialog */}
          <Dialog 
            open={openSelectDialog} 
            onClose={() => !loading && setOpenSelectDialog(false)}
            maxWidth="md"
            fullWidth
          >
            <div style={{ padding: '24px' }}>
              <Typography variant="h5" gutterBottom>
                Select Deposited Tenant
              </Typography>
              
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search tenants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1 }} />
                }}
                sx={{ mb: 3 }}
                disabled={loading}
              />

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tenant Name</TableCell>
                      <TableCell>Property</TableCell>
                      <TableCell>Deposit Amount</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : filteredTenants.length > 0 ? (
                      filteredTenants.map(tenant => (
                        <TableRow key={tenant.id}>
                          <TableCell>
                            <Typography fontWeight="medium">{tenant.name}</Typography>
                            <Typography variant="body2">{tenant.email}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>{tenant.property?.name}</Typography>
                            <Typography variant="body2">{tenant.property?.address}</Typography>
                          </TableCell>
                          <TableCell>₹{tenant.depositAmount}</TableCell>
                          <TableCell>{dayjs(tenant.depositDate).format('MMM D, YYYY')}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outlined"
                              onClick={() => handleSelectTenant(tenant)}
                              disabled={loading}
                            >
                              Select
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No deposited tenants found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Dialog>

          {/* All Tenants Table Section */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            All Tenants
          </Typography>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <TextField
              variant="outlined"
              placeholder="Search tenants..."
              value={tenantSearchTerm}
              onChange={(e) => setTenantSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />
              }}
              sx={{ width: 300 }}
              disabled={tenantLoading}
            />
          </div>

          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {tenantColumns.map((column) => (
                    <TableCell key={column.field} style={{ width: column.width }}>
                      {column.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tenantLoading ? (
                  <TableRow>
                    <TableCell colSpan={tenantColumns.length} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : filteredAllTenants.length > 0 ? (
                  filteredAllTenants.map((tenant) => (
                    <TableRow key={tenant.id}>
                      {tenantColumns.map((column) => (
                        <TableCell key={`${tenant.id}-${column.field}`}>
                          {column.renderCell ? 
                            column.renderCell({ row: tenant }) : 
                            tenant[column.field]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={tenantColumns.length} align="center">
                      No tenants found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>
          {selectedTenant && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <AccountIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    {selectedTenant.name} - {selectedTenant.property?.name}
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">Email: {selectedTenant.email}</Typography>
                    <Typography variant="body2">Phone: {selectedTenant.phone}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">Room No: {selectedTenant.roomNo}</Typography>
                    <Typography variant="body2">Rent: ₹{selectedTenant.rent}/month</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
          
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Monthly Records
            </Typography>
            
            {selectedTenant && (
              <Button
                variant="contained"
                startIcon={<ReceiptIcon />}
                onClick={() => setOpenGenerateDialog(true)}
                disabled={loading || currentMonthRecord}
              >
                Generate Current Month Invoice
              </Button>
            )}
          </Box>
          
          {selectedTenant ? (
            recordLoading ? (
              <CircularProgress />
            ) : (
              <>
                {/* Current Month Record */}
                {currentMonthRecord && (
                  <Card variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Current Month ({dayjs().format('MMMM YYYY')})
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Typography variant="body2">Rent:</Typography>
                          <Typography>₹{currentMonthRecord.rentAmount}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body2">Electricity:</Typography>
                          <Typography>
                            {currentMonthRecord.unitsConsumed} units (₹{currentMonthRecord.electricityCharge})
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body2">Extra Charges:</Typography>
                          <Typography>₹{currentMonthRecord.extraCharges || 0}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                          <Divider />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">Total Payable:</Typography>
                          <Typography variant="h6">
                            ₹{currentMonthRecord.totalAmount}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                          <Chip 
                            label={currentMonthRecord.status.toUpperCase()}
                            color={
                              currentMonthRecord.status === 'paid' ? 'success' : 
                              currentMonthRecord.status === 'pending' ? 'warning' : 'error'
                            }
                          />
                        </Grid>
                      </Grid>
                      
                      {currentMonthRecord.status === 'pending' && (
                        <Box mt={2} textAlign="right">
                          <Button
                            variant="contained"
                            startIcon={<PaymentIcon />}
                            onClick={() => setOpenPaymentDialog(true)}
                          >
                            Pay Now
                          </Button>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                )}
                
                {/* Previous Records */}
                <Typography variant="subtitle2" gutterBottom>
                  Previous Records
                </Typography>
                
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell align="right">Rent</TableCell>
                        <TableCell align="right">Units</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {monthlyRecords
                        .filter(r => r.month !== dayjs().format('YYYY-MM'))
                        .map((record) => (
                          <TableRow key={record.id}>
                            <TableCell>{dayjs(record.month).format('MMM YYYY')}</TableCell>
                            <TableCell align="right">₹{record.rentAmount}</TableCell>
                            <TableCell align="right">{record.unitsConsumed}</TableCell>
                            <TableCell align="right">₹{record.totalAmount}</TableCell>
                            <TableCell align="right">
                              <Chip 
                                label={record.status.toUpperCase()}
                                size="small"
                                color={
                                  record.status === 'paid' ? 'success' : 
                                  record.status === 'pending' ? 'warning' : 'error'
                                }
                              />
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )
          ) : (
            <Typography variant="body2" color="textSecondary">
              Please select a tenant to view records
            </Typography>
          )}
        </>
      )}

      {/* Generate Invoice Dialog */}
      <Dialog 
        open={openGenerateDialog} 
        onClose={() => !loading && setOpenGenerateDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Generate Monthly Invoice</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Electricity Units Consumed"
                type="number"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Extra Charges (if any)"
                type="number"
                value={extraCharges}
                onChange={(e) => setExtraCharges(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGenerateDialog(false)} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleGenerateInvoice} 
            variant="contained"
            disabled={loading || !units}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Payment Confirmation Dialog */}
      <Dialog 
        open={openPaymentDialog} 
        onClose={() => !loading && setOpenPaymentDialog(false)}
        maxWidth="sm"
      >
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            You are about to pay ₹{currentMonthRecord?.totalAmount} for {dayjs().format('MMMM YYYY')}.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            You will be redirected to Razorpay payment gateway.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentDialog(false)} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handlePayment} 
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Proceed to Pay'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TenantManagement;