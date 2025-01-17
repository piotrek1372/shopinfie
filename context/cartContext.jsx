import React, { createContext, useContext, useState } from 'react';
import { addToCart, fetchCart } from '../api/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  fetchCart

  const handleAddToCart = async (productId) => {
    try {
      const cart = await addToCart(authToken, productId, 1);
      console.log("Koszyk zaktualizowany:", cart);
    } catch (error) {
      alert(error.message);
    }
  };
  

  const removeFromCart = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/cart/remove?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ product_id: id }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      await fetchCart(); // Synchronizuj lokalny koszyk
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartItemQuantity = async (id, quantity) => {
    try {
      const response = await fetch(
        `${BASE_URL}/cart/update?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_id: id,
            quantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update cart item quantity');
      }

      await fetchCart(); // Synchronizuj lokalny koszyk
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};