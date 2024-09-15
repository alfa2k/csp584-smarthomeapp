import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Account from './components/Account';
import OrderStatus from './components/OrderStatus';
import { AppBar, Toolbar, Typography, Button, Box, Fab, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import StoreIcon from '@mui/icons-material/Store';
import CustomerManagement from './components/CustomerManagement';
import ProductManagement from './components/ProductManagement';

function App() {
  // State to manage logged-in user
  const [user, setUser] = useState(null);

  // Function to handle login and store user info
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  // Function to handle logout
  const handleLogout = () => {
    setUser(null); // Clear user state
  };

  return (
    <Router>
      {/* Set the background color to #141619 for the entire app */}
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#d3d9d4' }}>
        {/* Navigation Bar */}
        <AppBar
          position="static"
          sx={{
            background: 'linear-gradient(135deg, #748d92, #748d92)',
            borderRadius: '24px 24px 24px 24px', // Rounded bottom corners
            padding: '5px 5px', // Add padding for a more aesthetic feel
            marginTop: '10px', // Add top margin for spacing
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Slight shadow for modern look
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
                <HomeIcon sx={{ fontSize: 40 }} /> {/* Large home icon */}
              </Link>
            </Typography>
            <Box>
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{ borderRadius: '20px', margin: '0 8px' }}
              >
                Products
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/cart"
                sx={{ borderRadius: '20px', margin: '0 8px' }}
              >
                Cart
              </Button>

              {/* Conditionally show Account/Login or Logout based on user state */}
              {user ? (
                <>
                  <Button
                    color="inherit"
                    onClick={handleLogout} // Log out the user
                    sx={{ borderRadius: '20px', margin: '0 8px' }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  color="inherit"
                  component={Link}
                  to="/account"
                  sx={{ borderRadius: '20px', margin: '0 8px' }}
                >
                  Account
                </Button>
              )}
              <Button
                color="inherit"
                component={Link}
                to="/order-status"
                sx={{ borderRadius: '20px', margin: '0 8px' }}
              >
                Order Status
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Floating Action Buttons for Product and Customer Management with Tooltips */}
        <Tooltip title="Product Management" arrow>
          <Fab 
            color="primary" 
            aria-label="product-management" 
            component={Link} 
            to="/product-management" 
            sx={{ position: 'fixed', bottom: 16, right: 80 }}
          >
            <StoreIcon />
          </Fab>
        </Tooltip>

        <Tooltip title="Customer Management" arrow>
          <Fab 
            color="secondary" 
            aria-label="customer-management" 
            component={Link} 
            to="/customer-management" 
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
          >
            <ManageAccountsIcon />
          </Fab>
        </Tooltip>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, padding: '20px', color: '#fff' }}>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account onLogin={handleLogin} />} />
            <Route path="/order-status" element={<OrderStatus />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customer-management" element={<CustomerManagement />} />
            <Route path="/product-management" element={<ProductManagement />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
