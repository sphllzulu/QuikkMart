// src/pages/CartPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart, updateCartItem, clearCart } from '../slices/cartSlice';
import { Box, Button, Typography, Grid, Card, CardContent, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateCartItem({ productId, quantity }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
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
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.product._id, parseInt(e.target.value))}
                    inputProps={{ min: 1 }}
                  />
                  <IconButton color="secondary" onClick={() => handleRemove(item.product._id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Button variant="contained" color="secondary" onClick={handleClearCart}>
        Clear Cart
      </Button>
      <Button variant="contained" color="primary" sx={{ ml: 2 }}>
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default CartPage;
