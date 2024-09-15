import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Alert, Card, CardContent } from '@mui/material';

function OrderStatus() {
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Fetch orders from static JSON file
    fetch('/data/orders.json')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch(() => setError('Failed to load orders.'));
  }, []);

  const handleCheckStatus = () => {
    const order = orders.find((order) =>
      order.confirmationNumber === confirmationNumber ||
      order.orderId?.toString() === confirmationNumber
    );

    if (order) {
      setOrderStatus(order);
      setError(null);
      setSuccess(null);
    } else {
      setOrderStatus(null);
      setError('Order not found. Please check your confirmation number.');
    }
  };

  const handleCancelOrder = () => {
    const order = orders.find((order) =>
      order.confirmationNumber === confirmationNumber ||
      order.orderId?.toString() === confirmationNumber
    );

    if (order && order.status === 'Processing') {
      // Remove the order from the orders list and update the state
      const updatedOrders = orders.filter(
        (o) => o.confirmationNumber !== confirmationNumber && o.orderId?.toString() !== confirmationNumber
      );

      // Update the JSON file on the server
      fetch('http://localhost:5001/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrders),
      })
        .then((response) => response.json())
        .then(() => {
          setSuccess('Order canceled and removed successfully.');
          setError(null);
          setOrders(updatedOrders); // Update the state with the updated orders array
          setOrderStatus(null); // Clear the order status since it was removed
        })
        .catch((error) => {
          setError('Failed to update the orders.');
          setSuccess(null);
        });
    } else if (order) {
      setError(`Cannot cancel order. Current status is ${order.status}.`);
      setSuccess(null);
    } else {
      setError('Order not found. Please check your confirmation number.');
      setSuccess(null);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Card sx={{ borderRadius: '16px', boxShadow: 3, backgroundColor: '#748d92' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ color: '#fff' }}>
            Order Status
          </Typography>

          {error && <Alert severity="error" style={{ marginBottom: '20px' }}>{error}</Alert>}
          {success && <Alert severity="success" style={{ marginBottom: '20px' }}>{success}</Alert>}

          <TextField
            required
            label="Confirmation Number (Order ID)"
            fullWidth
            margin="normal"
            value={confirmationNumber}
            onChange={(e) => setConfirmationNumber(e.target.value)}
            variant="outlined"
            InputLabelProps={{
              style: { color: '#333' }, // Darker placeholder text
            }}
            InputProps={{
              style: { backgroundColor: '#fff', color: '#333' }, // White background and dark text
            }}
            sx={{
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc', // Border color
                },
                '&:hover fieldset': {
                  borderColor: '#333', // Hover border color
                },
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              color: '#fff',
              marginRight: '10px',
              marginTop: '10px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#1565c0', // Darker shade on hover
              },
            }}
            onClick={handleCheckStatus}
          >
            Check Status
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: '#ff5252', // Secondary button color
              borderColor: '#ff5252', // Outline color
              marginTop: '10px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(255, 82, 82, 0.1)', // Light background on hover
                borderColor: '#ff5252',
              },
            }}
            onClick={handleCancelOrder}
          >
            Cancel Order
          </Button>

          {orderStatus && (
            <Card sx={{ marginTop: '30px', borderRadius: '8px', padding: '10px', backgroundColor: '#566a73' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#fff' }}>Order Details:</Typography>

                {orderStatus.product ? (
                  // For simple order format with `product` and `status`
                  <>
                    <Typography variant="body1" sx={{ color: '#ccc' }}>
                      Product: {orderStatus.product}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#ccc' }}>
                      Status: {orderStatus.status}
                    </Typography>
                  </>
                ) : (
                  // For detailed order format with `cart` and other fields
                  <>
                    <Typography variant="body1" sx={{ color: '#ccc' }}>
                      Name: {orderStatus.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#ccc' }}>
                      Total: ${orderStatus.total}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#ccc' }}>
                      Pickup/Delivery Date: {orderStatus.pickupDate}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#ccc' }}>
                      Status: {orderStatus.status}
                    </Typography>

                    <Typography variant="h6" sx={{ marginTop: '20px', color: '#fff' }}>Cart Items:</Typography>
                    {orderStatus.cart.map((item, index) => (
                      <Typography key={index} variant="body2" sx={{ color: '#ddd' }}>
                        {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                      </Typography>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default OrderStatus;
