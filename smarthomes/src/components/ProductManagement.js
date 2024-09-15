import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, Card, CardContent, IconButton, Box, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const categories = ['smart-doorbells', 'smart-doorlocks', 'smart-speakers', 'smart-lightings', 'smart-thermostats'];

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: categories[0],
  });
  const [editingProductId, setEditingProductId] = useState(null); // To track editing state
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch products from the backend (with full path)
    fetch('http://localhost:5001/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(Object.values(data).flat())) // Flatten products by category
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.category) {
      setError('All fields are required.');
      return;
    }

    // Ensure price is a number
    const price = parseFloat(newProduct.price);

    if (isNaN(price)) {
      setError('Please enter a valid number for the price.');
      return;
    }

    // Add new product via API (with full path)
    fetch('http://localhost:5001/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...newProduct, price }), // Send product data with correct price format
    })
      .then((response) => response.json())
      .then((addedProduct) => {
        setProducts([...products, addedProduct]); // Update the products state
        setNewProduct({ name: '', price: '', description: '', category: categories[0] });
        setError('');
      })
      .catch(() => setError('Error adding product.'));
  };

  const handleDeleteProduct = (id) => {
    const productToDelete = products.find((product) => product.id === id);
    if (!productToDelete) return;

    // Delete product via API (with full path)
    fetch(`http://localhost:5001/api/products/${productToDelete.category}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProducts(products.filter((product) => product.id !== id)); // Update the products state
      })
      .catch(() => setError('Error deleting product.'));
  };

  const handleEditProduct = (id) => {
    const product = products.find((p) => p.id === id);
    setNewProduct(product);
    setEditingProductId(id);
  };

  const handleUpdateProduct = () => {
    fetch(`http://localhost:5001/api/products/${newProduct.category}/${editingProductId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(() => {
        setProducts(products.map((product) =>
          product.id === editingProductId ? { ...newProduct, id: editingProductId } : product
        ));
        setNewProduct({ name: '', price: '', description: '', category: categories[0] });
        setEditingProductId(null); // Reset editing state
      })
      .catch(() => setError('Error updating product.'));
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
            Product Management
          </Typography>

          {error && <Typography color="error" sx={{ marginBottom: '20px' }}>{error}</Typography>}

          <TextField
            label="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
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
          />
          <TextField
            label="Price"
            type="number"
            value={newProduct.price}
            onChange={(e) => {
              const value = e.target.value;
              setNewProduct({ 
                ...newProduct, 
                price: value === '' ? '' : parseFloat(value) || 0 // Handle empty string or invalid number
              });
            }}
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
          />
          <TextField
            label="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
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
          />
          <Select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            fullWidth
            sx={{
              backgroundColor: '#fff',
              marginTop: '16px',
              '& .MuiSelect-select': {
                color: '#333',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ccc',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#333',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: '#fff', // Background color for dropdown
                  color: '#333', // Text color for dropdown items
                },
              },
            }}
          >
            {categories.map((category) => (
              <MenuItem
              key={category}
              value={category}
              sx={{
                '&.Mui-selected': {
                  color: '#333', // Dark color for selected text
                  backgroundColor: '#e0e0e0', // Light background for selected item
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#d1d1d1', // Slightly darker background on hover when selected
                },
              }}
            >
              {category}
            </MenuItem>
            ))}
          </Select>

          {editingProductId ? (
            <Button
              onClick={handleUpdateProduct}
              variant="contained"
              color="primary"
              sx={{ marginTop: '20px', borderRadius: '4px', padding: '12px 20px', '&:hover': { backgroundColor: '#1565c0' } }}
            >
              Update Product
            </Button>
          ) : (
            <Button
              onClick={handleAddProduct}
              variant="contained"
              color="primary"
              sx={{ marginTop: '20px', borderRadius: '4px', padding: '12px 20px', '&:hover': { backgroundColor: '#1565c0' } }}
            >
              Add Product
            </Button>
          )}

          <Typography variant="h5" sx={{ marginTop: '40px', marginBottom: '20px', color: '#fff', textAlign: 'center' }}>
            Product List
          </Typography>

          <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
            <List>
              {products.map((product) => (
                <ListItem key={product.id} divider sx={{ color: '#fff' }}>
                  <ListItemText
                    primary={product.name}
                    secondary={`$${!isNaN(product.price) ? product.price.toFixed(2) : '0.00'} - ${product.description}`}
                  />
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditProduct(product.id)} sx={{ color: '#fff' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProduct(product.id)} sx={{ color: '#fff' }}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductManagement;
