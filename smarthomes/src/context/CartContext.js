import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from local storage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    } else {
      // Fetch cart data from the backend if local storage is empty
      fetch('http://localhost:5001/api/cart')
        .then((response) => response.json())
        .then((data) => setCart(data))
        .catch((error) => console.error('Error fetching cart data:', error));
    }
  }, []);

  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateCartInBackend = (updatedCart) => {
    fetch('http://localhost:5001/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCart),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error('Error updating cart data:', error);
      });
  };

  const addToCart = (item) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    let updatedCart;

    if (itemIndex === -1) {
      // Add new item if it doesn't exist
      updatedCart = [...cart, { ...item, quantity: 1 }];
    } else {
      // If item exists, update quantity
      updatedCart = cart.map((cartItem, index) =>
        index === itemIndex ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
    }

    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart); // Persist the updated cart to local storage
    updateCartInBackend(updatedCart); // Persist the updated cart to the backend
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((i) => i.id !== itemId);
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart); // Persist the updated cart to local storage
    updateCartInBackend(updatedCart); // Persist the updated cart to the backend
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      removeFromCart(itemId); // Remove item if quantity is 0
      return;
    }

    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart); // Persist the updated cart to local storage
    updateCartInBackend(updatedCart); // Persist the updated cart to the backend
  };

  const clearCart = () => {
    setCart([]);
    updateCartInLocalStorage([]); // Clear the cart in local storage
    updateCartInBackend([]); // Clear the cart in the backend as well
  };

  const getTotalCost = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalCost,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
