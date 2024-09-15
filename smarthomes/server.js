const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Import cors
const path = require('path');
const app = express();
const PORT = 5001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Paths to data files
const dataDirectory = path.join(__dirname, 'public', 'data');
const cartFilePath = path.join(dataDirectory, 'cart.json');
const ordersFilePath = path.join(dataDirectory, 'orders.json');
const productsFilePath = path.join(dataDirectory, 'products.json');
const usersFilePath = path.join(dataDirectory, 'users.json');
const customersFilePath = path.join(dataDirectory, 'customers.json');

// Helper function to read JSON files
const readFileAsync = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error(`Error reading file: ${filePath}`));
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

// Helper function to write to JSON files
const writeFileAsync = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        reject(new Error(`Error writing to file: ${filePath}`));
      } else {
        resolve();
      }
    });
  });
};

// Fetch cart data
app.get('/api/cart', async (req, res) => {
  try {
    const cart = await readFileAsync(cartFilePath);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update cart data
app.post('/api/cart', async (req, res) => {
  try {
    const updatedCart = req.body;
    await writeFileAsync(cartFilePath, updatedCart);
    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await readFileAsync(productsFilePath);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add product (StoreManager)
app.post('/api/products', async (req, res) => {
  const newProduct = req.body;

  if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.category) {
    return res.status(400).json({ message: 'All product fields are required' });
  }

  try {
    const products = await readFileAsync(productsFilePath);
    
    if (!products[newProduct.category]) {
      products[newProduct.category] = [];
    }

    const allProducts = Object.values(products).flat();
    const newId = allProducts.length ? Math.max(...allProducts.map(p => p.id)) + 1 : 1;
    const productWithId = { ...newProduct, id: newId };

    products[newProduct.category].push(productWithId);
    await writeFileAsync(productsFilePath, products);

    res.json({ message: 'Product added successfully', product: productWithId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete product (StoreManager)
app.delete('/api/products/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  const productId = parseInt(id);

  try {
    const products = await readFileAsync(productsFilePath);
    products[category] = products[category].filter(product => product.id !== productId);

    await writeFileAsync(productsFilePath, products);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update product (StoreManager)
app.put('/api/products/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  const productId = parseInt(id);
  const updatedProduct = req.body;

  try {
    const products = await readFileAsync(productsFilePath);
    products[category] = products[category].map(product =>
      product.id === productId ? { ...product, ...updatedProduct } : product
    );

    await writeFileAsync(productsFilePath, products);
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch all customers
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await readFileAsync(customersFilePath);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new customer (Salesman)
app.post('/api/customers', async (req, res) => {
  const newCustomer = req.body;

  try {
    const customers = await readFileAsync(customersFilePath);
    customers.push(newCustomer);

    await writeFileAsync(customersFilePath, customers);
    res.json({ message: 'Customer added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a customer (Salesman)
app.delete('/api/customers/:id', async (req, res) => {
  const customerId = parseInt(req.params.id);

  try {
    let customers = await readFileAsync(customersFilePath);
    customers = customers.filter((customer) => customer.id !== customerId);

    await writeFileAsync(customersFilePath, customers);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update customer (Salesman)
app.put('/api/customers/:id', async (req, res) => {
  const customerId = parseInt(req.params.id);
  const updatedCustomer = req.body;

  try {
    let customers = await readFileAsync(customersFilePath);
    customers = customers.map((customer) =>
      customer.id === customerId ? { ...customer, ...updatedCustomer } : customer
    );

    await writeFileAsync(customersFilePath, customers);
    res.json({ message: 'Customer updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await readFileAsync(ordersFilePath);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Place an order
app.post('/api/orders', async (req, res) => {
  const newOrder = req.body;

  try {
    const orders = await readFileAsync(ordersFilePath);
    orders.push(newOrder);

    await writeFileAsync(ordersFilePath, orders);
    res.json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch users
app.get('/api/users', async (req, res) => {
  try {
    const users = await readFileAsync(usersFilePath);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/orders/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  const { status } = req.body;

  try {
    // Read the orders file
    const orders = await readFileAsync(ordersFilePath);

    // Find the order by its ID and update its status
    const orderIndex = orders.findIndex(order => order.orderId == orderId);
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order's status
    orders[orderIndex].status = status;

    // Write the updated orders back to the JSON file
    await writeFileAsync(ordersFilePath, orders);

    // Return the updated order in the response
    res.json({ message: 'Order status updated successfully', order: orders[orderIndex] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add user (Register)
app.post('/api/users', async (req, res) => {
  const newUser = req.body;

  try {
    const users = await readFileAsync(usersFilePath);
    users.push(newUser);

    await writeFileAsync(usersFilePath, users);
    res.json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an order (Salesman)
app.put('/api/orders/:orderId', async (req, res) => {
  const orderId = parseInt(req.params.orderId);
  const updatedOrder = req.body;

  try {
    let orders = await readFileAsync(ordersFilePath);
    orders = orders.map((order) =>
      order.orderId === orderId ? { ...order, ...updatedOrder } : order
    );

    await writeFileAsync(ordersFilePath, orders);
    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
