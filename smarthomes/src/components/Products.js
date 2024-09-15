import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, CardContent, Typography, CircularProgress, Divider } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 component

function Products() {
  const { category } = useParams(); // Get the category from URL params
  const [categoryProducts, setCategoryProducts] = useState([]); // Store the products of the category
  const [loading, setLoading] = useState(true); // To show a loading spinner while fetching
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Fetch products from JSON file
    fetch('/data/products.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products.');
        }
        return response.json();
      })
      .then((data) => {
        const products = data[category]; // Get the products for the given category
        if (products) {
          setCategoryProducts(products);
        } else {
          setError('Category not found');
        }
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError(error.message); // Handle any fetch errors
        setLoading(false); // Set loading to false in case of error
      });
  }, [category]); // Re-run the effect when the category changes

  if (loading) {
    return (
      <Container>
        <CircularProgress /> {/* Show spinner while loading */}
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (categoryProducts.length === 0) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          No products found for this category.
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        marginTop: '50px',
        background: 'linear-gradient(135deg, #748d92 80%, #748d91 2%)', // Subtle dark blue to black gradient
        padding: '40px',
        borderRadius: '24px',
      }}
    >
      {/* Category title with a divider */}
      <Typography variant="h4" align="center" sx={{ color: '#fff', marginBottom: '20px' }}>
        {category.replace(/-/g, ' ')} {/* Replace hyphens with spaces */}
      </Typography>
      <Divider variant="middle" sx={{ marginBottom: '40px', backgroundColor: '#fff' }} />

      <Grid2 container spacing={4} justifyContent="center">
        {categoryProducts.map((product) => (
          <Grid2 item xs={12} sm={6} md={4} key={product.id}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  borderRadius: '32px', // More rounded corners like in Home page
                  height: '220px', // Slightly smaller card height
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Consistent shadow
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  background: '#fff', // White background for consistency with Home page
                  transition: 'transform 0.3s ease', // Smooth hover transition
                  '&:hover': {
                    transform: 'scale(1.05)', // Slight scaling on hover
                    boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.3)', // Stronger shadow on hover
                  },
                }}
              >
                <CardContent>
                  {/* Product name and price */}
                  <Typography variant="h6" sx={{ marginBottom: '10px', color: '#333' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="h5" sx={{ marginBottom: '10px', color: '#0d47a1' }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}

export default Products;
