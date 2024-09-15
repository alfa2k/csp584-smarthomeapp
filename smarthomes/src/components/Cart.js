import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Container, Typography, Button, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotalCost } = useContext(CartContext);
  const [isUpdating, setIsUpdating] = useState(false); // To handle update states

  const handleUpdateQuantity = (id, newQuantity) => {
    setIsUpdating(true);
    updateQuantity(id, newQuantity);
    setTimeout(() => setIsUpdating(false), 500); // Simulate a small delay for smoother experience
  };

  const handleRemoveItem = (id) => {
    setIsUpdating(true);
    removeFromCart(id);
    setTimeout(() => setIsUpdating(false), 500); // Simulate a small delay for smoother experience
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Card sx={{ borderRadius: '16px', boxShadow: 3, backgroundColor: '#748d92' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ color: '#fff' }}>
            Shopping Cart
          </Typography>

          {/* Scrollable List for Cart Items */}
          <List
            sx={{
              maxHeight: '400px',  // Limit the height (adjust to preference)
              overflowY: cart.length > 7 ? 'auto' : 'visible',  // Enable scroll when there are more than 7 items
              paddingRight: '10px',  // Add padding to the right to accommodate scrollbar
            }}
          >
            {cart.map((item) => (
              <ListItem key={item.id} divider sx={{ color: '#fff', transition: 'all 0.3s ease' }}>
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price.toFixed(2)}`}
                  sx={{ color: '#fff' }}
                />
                <div>
                  <Button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    variant="outlined"
                    color="primary"
                    sx={{ marginRight: '10px', borderRadius: '8px' }}
                    disabled={isUpdating || item.quantity === 1} // Disable button when updating
                  >
                    -
                  </Button>
                  <Typography component="span" sx={{ marginRight: '10px', color: '#fff' }}>
                    {item.quantity}
                  </Typography>
                  <Button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    variant="outlined"
                    color="primary"
                    sx={{ marginRight: '10px', borderRadius: '8px' }}
                    disabled={isUpdating} // Disable button when updating
                  >
                    +
                  </Button>
                </div>
                <Button
                  onClick={() => handleRemoveItem(item.id)}
                  variant="outlined"
                  color="primary"
                  sx={{ borderRadius: '8px' }}
                  disabled={isUpdating} // Disable button when updating
                >
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>

          <Typography variant="h5" sx={{ marginTop: '20px', color: '#fff' }}>
            Total: ${getTotalCost()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={Link}
            to="/checkout"
            sx={{
              marginTop: '20px',
              borderRadius: '8px',
              padding: '12px 0',
            }}
          >
            Proceed to Checkout
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Cart;
