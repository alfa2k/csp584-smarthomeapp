import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Card, CardContent, Divider, TextField, Select, MenuItem } from '@mui/material';

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '' });
  const [error, setError] = useState(null);
  const [orderStatusOptions] = useState(['Processing', 'Shipped', 'Delivered', 'Canceled']);

  useEffect(() => {
    // Fetch customer data from the API
    fetch('http://localhost:5001/api/customers')
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch(() => setError('Failed to load customers'));

    // Fetch order data from the API
    fetch('http://localhost:5001/api/orders')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch(() => setError('Failed to load orders'));
  }, []);

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      setError('Please provide both name and email for the new customer');
      return;
    }

    // Call the backend API to add a new customer
    fetch('http://localhost:5001/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomers([...customers, data]); // Update the local state
        setNewCustomer({ name: '', email: '' });
        setError(null);
      })
      .catch(() => setError('Failed to add customer'));
  };

  const handleDeleteCustomer = (id) => {
    // Call the backend API to delete the customer
    fetch(`http://localhost:5001/api/customers/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCustomers(customers.filter((customer) => customer.id !== id));
        setOrders(orders.filter((order) => order.customerId !== id)); // Remove associated orders
      })
      .catch(() => setError('Failed to delete customer'));
  };

  const handleStatusChange = (orderId, newStatus) => {
    fetch(`http://localhost:5001/api/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }), // Send the new status in the body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update order');
        }
        return response.json(); // Parse the response JSON
      })
      .then((updatedOrderResponse) => {
        // Check if the updated order exists
        if (updatedOrderResponse && updatedOrderResponse.order) {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.orderId === orderId ? { ...order, status: updatedOrderResponse.order.status } : order
            )
          );
        } else {
          throw new Error('Order not found in the response');
        }
      })
      .catch((error) => setError('Failed to update order status: ' + error.message));
  };

  const getProductNames = (order) => {
    if (order.product) {
      return order.product;
    } else if (order.cart && order.cart.length > 0) {
      return order.cart.map((item) => item.name).join(', ');
    } else {
      return 'Unknown product';
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: '50px',
        padding: '40px',
        borderRadius: '24px',
      }}
    >
      <Card sx={{ borderRadius: '16px', boxShadow: 3, backgroundColor: '#748d92' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ color: '#fff', textAlign: 'center' }}>
            Customer Management
          </Typography>

          {error && <Typography color="error" sx={{ marginBottom: '20px' }}>{error}</Typography>}

          <Typography variant="h5" sx={{ color: '#fff', marginTop: '20px', textAlign: 'center' }}>
            Add New Customer
          </Typography>
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            sx={{
              backgroundColor: '#fff',
              marginBottom: '10px',
              '& .MuiInputLabel-root': {
                color: '#555', // Darker placeholder color
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#fff',
                },
                '& input': {
                  color: '#333', // Input text color
                },
              },
            }}
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            sx={{
              backgroundColor: '#fff',
              marginBottom: '10px',
              '& .MuiInputLabel-root': {
                color: '#555', // Darker placeholder color
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#fff',
                },
                '& input': {
                  color: '#333', // Input text color
                },
              },
            }}
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          />
          <Button
            onClick={handleAddCustomer}
            variant="contained"
            sx={{
              
              color: '#fff',
              marginBottom: '20px',
              '&:hover': { backgroundColor: '#1565c0' },
            }}
          >
            Add Customer
          </Button>

          <Typography variant="h5" sx={{ color: '#fff', marginTop: '20px', textAlign: 'center' }}>
            Customers
          </Typography>
          <Divider sx={{ marginBottom: '20px', backgroundColor: '#fff' }} />

          <List>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <ListItem key={customer.id || customer.email} divider sx={{ color: '#fff' }}>
                  <ListItemText primary={customer.name} secondary={customer.email} />
                  <Button
                    onClick={() => handleDeleteCustomer(customer.id)}
                    variant="outlined"
                    color="secondary"
                    sx={{
                      borderColor: '#ff5252',
                      color: '#ff5252',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 82, 82, 0.1)',
                        borderColor: '#ff5252',
                      },
                    }}
                  >
                    Delete
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography sx={{ color: '#fff', textAlign: 'center' }}>No customers available</Typography>
            )}
          </List>

          <Typography variant="h5" sx={{ color: '#fff', marginTop: '40px', textAlign: 'center' }}>
            Customer Orders
          </Typography>
          <Divider sx={{ marginBottom: '20px', backgroundColor: '#fff' }} />

          <List>
            {orders.length > 0 ? (
              orders.map((order) => (
                <ListItem key={order.orderId} divider sx={{ color: '#fff' }}>
                  <ListItemText
                    primary={`Order #${order.orderId} - ${getProductNames(order)}`}  // Use getProductNames
                    secondary={`Status: ${order.status}`}
                  />
                  <Select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                    sx={{
                      color: '#fff',
                      marginLeft: '20px',
                    }}
                  >
                    {orderStatusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </ListItem>
              ))
            ) : (
              <Typography sx={{ color: '#fff', textAlign: 'center' }}>No orders available</Typography>
            )}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CustomerManagement;
