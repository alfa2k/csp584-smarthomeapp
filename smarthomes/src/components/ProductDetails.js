import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, accessories } from '../data/products';
import { Container, Typography, Button, Card, CardContent, Divider, IconButton, Box } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CartContext } from '../context/CartContext'; // Use CartContext

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useContext(CartContext); // Access cart and cart actions
  const allProducts = Object.values(products).flat();
  const product = allProducts.find((p) => p.id === parseInt(id));

  // Find if the product is already in the cart
  const cartItem = cart.find((item) => item.id === product?.id);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0); // Track local quantity

  // Sync local quantity with cart when cart changes
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  if (!product) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Product not found
        </Typography>
      </Container>
    );
  }

  const handleIncreaseQuantity = () => {
    addToCart(product); // Increment quantity by adding to cart
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1); // Decrease quantity in cart
      setQuantity(quantity - 1);
    }
  };

  const productAccessories = product.accessories.map((accId) => accessories[accId]);

  return (
    <Container
      sx={{
        marginTop: '50px',
        background: 'linear-gradient(135deg, #748d92 80%, #748d91 2%)',
        padding: '40px',
        borderRadius: '24px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: '#fff', marginRight: '10px' }}>
          <ArrowBackIcon /> {/* Back Icon */}
        </IconButton>
        <Typography variant="h4" sx={{ color: '#fff' }}>
          {product.name}
        </Typography>
      </Box>

      <Divider variant="middle" sx={{ marginBottom: '40px', backgroundColor: '#fff' }} />

      <Typography variant="h5" align="center" sx={{ color: '#fff', marginBottom: '20px' }}>
        ${product.price.toFixed(2)}
      </Typography>
      <Typography variant="body1" paragraph sx={{ color: '#ddd', textAlign: 'center' }}>
        {product.description}
      </Typography>

      {/* Show the quantity controls */}
      {quantity > 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleDecreaseQuantity}>
            -
          </Button>
          <Typography variant="h6" sx={{ color: '#fff' }}>
            Quantity: {quantity}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleIncreaseQuantity}>
            +
          </Button>
        </Box>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleIncreaseQuantity} // Add product to cart
          sx={{
            display: 'block',
            margin: '20px auto',
            borderRadius: '32px',
            background: '#1e88e5',
            padding: '10px 20px',
            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              background: '#1565c0',
            },
          }}
        >
          Add to Cart
        </Button>
      )}

      <Typography variant="h5" sx={{ color: '#fff', marginTop: '40px', marginBottom: '20px', textAlign: 'center' }}>
        Accessories
      </Typography>
      <Grid2 container spacing={4} justifyContent="center">
        {productAccessories.map((acc) => (
          <Grid2 xs={12} sm={6} md={4} key={acc.id}>
            <Card
              sx={{
                borderRadius: '32px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: '#fff',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: '#333', marginBottom: '10px' }}>
                  {acc.name}
                </Typography>
                <Typography variant="h5" sx={{ color: '#0d47a1', marginBottom: '10px' }}>
                  ${acc.price.toFixed(2)}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => addToCart(acc)} // Add accessory to cart
                  sx={{
                    borderRadius: '32px',
                    padding: '10px 20px',
                    borderColor: '#1e88e5',
                    color: '#1e88e5',
                    '&:hover': {
                      background: '#e3f2fd',
                      borderColor: '#1565c0',
                    },
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}

export default ProductDetails;
