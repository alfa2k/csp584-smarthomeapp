import React, { useState, useContext } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Alert,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Import CartContext for accessing cart

const storeLocations = [
  { id: 1, name: 'Downtown', zipCode: '10001' },
  { id: 2, name: 'Uptown', zipCode: '10002' },
  { id: 3, name: 'Midtown', zipCode: '10003' },
  { id: 4, name: 'Greenwich', zipCode: '10004' },
  { id: 5, name: 'Brooklyn', zipCode: '11201' },
  { id: 6, name: 'Queens', zipCode: '11301' },
  { id: 7, name: 'Harlem', zipCode: '10027' },
  { id: 8, name: 'Bronx', zipCode: '10451' },
  { id: 9, name: 'Staten Island', zipCode: '10301' },
  { id: 10, name: 'Jersey City', zipCode: '07302' },
];

function Checkout() {
  const [deliveryOption, setDeliveryOption] = useState('home');
  const [storeLocation, setStoreLocation] = useState('');
  const [name, setName] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [address, setAddress] = useState({ street: '', city: '', state: '', zip: '' });
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Get cart and total cost from context
  const { getTotalCost, cart, clearCart } = useContext(CartContext);

  const totalPrice = getTotalCost(); // Use dynamic total from the cart

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate the form fields
    if (!name || !creditCard || (deliveryOption === 'home' && (!address.street || !address.city || !address.state || !address.zip)) || (deliveryOption === 'store' && !storeLocation)) {
      setError('Please fill all required fields.');
      setSuccess(null);
      return;
    }
  
    // Generate confirmation number and set pickup/delivery date
    const newConfirmationNumber = Math.floor(Math.random() * 1000000).toString();
    const orderDate = new Date();
    const newPickupDate = new Date(orderDate);
    newPickupDate.setDate(orderDate.getDate() + 14); // Set pickup/delivery date to 2 weeks from now
  
    // Prepare order details
    const orderDetails = {
      name,
      creditCard: creditCard.slice(-4), // Mask credit card, only store last 4 digits
      deliveryOption,
      storeLocation: deliveryOption === 'store' ? storeLocations.find(store => store.id === storeLocation) : null,
      address: deliveryOption === 'home' ? address : null,
      total: totalPrice,
      confirmationNumber: newConfirmationNumber,
      orderDate: orderDate.toDateString(),
      pickupDate: newPickupDate.toDateString(),
      cart, // Include cart items in the order
      status: 'Processing', // Set initial order status
      orderId: newConfirmationNumber,
    };
  
    // Submit order to the backend
    fetch('http://localhost:5001/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        // Set success message and keep order details in state to persist them
        setSuccess(`Your order has been placed successfully! Confirmation number: ${newConfirmationNumber}. Pickup/Delivery Date: ${newPickupDate.toDateString()}`);
        setError(null);
        setConfirmationNumber(newConfirmationNumber);
        setPickupDate(newPickupDate.toDateString());
        clearCart(); // Clear the cart after order is placed successfully
      })
      .catch((error) => {
        setError(error.message || 'Error placing order.');
        setSuccess(null);
      });
  };

  return (
    <Container
      maxWidth="md"
      style={{ marginTop: '50px', padding: '40px', borderRadius: '16px' }}
    >
      <Card sx={{ borderRadius: '16px', boxShadow: 3, backgroundColor: '#748d92' }}>
        <CardContent>
          <IconButton component={Link} to="/cart" sx={{ color: '#fff', marginBottom: '20px' }}>
            <ArrowBackIcon /> {/* Back to cart */}
          </IconButton>
          <Typography variant="h4" gutterBottom sx={{ color: '#fff' }}>
            Checkout
          </Typography>

          {error && <Alert severity="error" style={{ marginBottom: '20px' }}>{error}</Alert>}
          {success && (
            <Alert severity="success" style={{ marginBottom: '20px' }}>
              {success}
              <Typography variant="body2">Confirmation Number: {confirmationNumber}</Typography>
              <Typography variant="body2">Pickup/Delivery Date: {pickupDate}</Typography>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              required
              label="Name"
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{
                borderRadius: '8px',
                backgroundColor: '#fff',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc',
                  },
                  '&:hover fieldset': {
                    borderColor: '#fff',
                  },
                },
              }}
              InputLabelProps={{ style: { color: '#333' } }} // Dark placeholder text
              InputProps={{ style: { color: '#333' } }} // Dark input text
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              label="Credit Card Number"
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{
                borderRadius: '8px',
                backgroundColor: '#fff',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc',
                  },
                  '&:hover fieldset': {
                    borderColor: '#fff',
                  },
                },
              }}
              InputLabelProps={{ style: { color: '#333' } }}
              InputProps={{ style: { color: '#333' } }}
              value={creditCard}
              onChange={(e) => setCreditCard(e.target.value)}
            />

            <FormLabel component="legend" style={{ marginTop: '20px', color: '#fff' }}>
              Delivery Option
            </FormLabel>
            <RadioGroup
              value={deliveryOption}
              onChange={(e) => setDeliveryOption(e.target.value)}
              style={{ marginBottom: '20px' }}
            >
              <FormControlLabel value="home" control={<Radio sx={{ color: '#fff' }} />} label="Home Delivery" sx={{ color: '#fff' }} />
              <FormControlLabel value="store" control={<Radio sx={{ color: '#fff' }} />} label="Store Pickup" sx={{ color: '#fff' }} />
            </RadioGroup>

            {deliveryOption === 'home' ? (
              <>
                <TextField
                  required
                  label="Street Address"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc',
                      },
                      '&:hover fieldset': {
                        borderColor: '#fff',
                      },
                    },
                  }}
                  InputLabelProps={{ style: { color: '#333' } }}
                  InputProps={{ style: { color: '#333' } }}
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                />
                <TextField
                  required
                  label="City"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc',
                      },
                      '&:hover fieldset': {
                        borderColor: '#fff',
                      },
                    },
                  }}
                  InputLabelProps={{ style: { color: '#333' } }}
                  InputProps={{ style: { color: '#333' } }}
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                />
                <TextField
                  required
                  label="State"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc',
                      },
                      '&:hover fieldset': {
                        borderColor: '#fff',
                      },
                    },
                  }}
                  InputLabelProps={{ style: { color: '#333' } }}
                  InputProps={{ style: { color: '#333' } }}
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                />
                <TextField
                  required
                  label="Zip Code"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc',
                      },
                      '&:hover fieldset': {
                        borderColor: '#fff',
                      },
                    },
                  }}
                  InputLabelProps={{ style: { color: '#333' } }}
                  InputProps={{ style: { color: '#333' } }}
                  value={address.zip}
                  onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                />
              </>
            ) : (
              <Select
                value={storeLocation}
                onChange={(e) => setStoreLocation(e.target.value)}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                displayEmpty
                sx={{
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#ccc',
                    },
                    '&:hover fieldset': {
                      borderColor: '#fff',
                    },
                  },
                }}
                inputProps={{ style: { color: '#333' } }}
                renderValue={(selected) => {
                  if (!selected) {
                    return <Typography sx={{ color: '#666' }}>Select a store location</Typography>;
                  }
                  return (
                    <Typography sx={{ color: '#333' }}>
                      {storeLocations.find((store) => store.id === selected)?.name || selected}
                    </Typography>
                  );
                }}
              >
                {storeLocations.map((store) => (
                  <MenuItem value={store.id} key={store.id}>
                    {store.name} - {store.zipCode}
                  </MenuItem>
                ))}
              </Select>
            )}

            <Typography variant="h6" sx={{ marginTop: '20px', color: '#fff' }}>
              Total: ${totalPrice}
            </Typography>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: '20px',
                borderRadius: '8px',
                padding: '12px 0',
              }}
            >
              Place Order
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Checkout;
