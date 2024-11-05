// src/pages/CheckoutPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, clearCart } from '../slices/cartSlice';
import { Box, Button, Typography, Grid, Card, CardContent } from '@mui/material';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleCheckout = () => {
    // Handle checkout logic (e.g., call to backend API)
    // Clear the cart after successful checkout
    dispatch(clearCart());
    alert("Thank you for your purchase!");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      {items.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.product._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">${item.product.price}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {items.length > 0 && (
        <Button variant="contained" color="primary" onClick={handleCheckout} sx={{ mt: 2 }}>
          Place Order
        </Button>
      )}
    </Box>
  );
};

export default CheckoutPage;
