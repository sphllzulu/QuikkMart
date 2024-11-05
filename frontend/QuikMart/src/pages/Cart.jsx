// src/pages/CartPage.js
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCart, removeFromCart, updateCartItem, clearCart } from '../slices/cartSlice';
// import { Box, Button, Typography, Grid, Card, CardContent, IconButton, TextField } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AppHeader from './AppHeader';

// const CartPage = () => {
//   const dispatch = useDispatch();
//   const { items, loading } = useSelector((state) => state.cart);

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const handleUpdateQuantity = (productId, quantity) => {
//     dispatch(updateCartItem({ productId, quantity }));
//   };

//   const handleRemove = (productId) => {
//     dispatch(removeFromCart(productId));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   if (loading) return <Typography>Loading...</Typography>;

//   return (
//     <div>
//       <AppHeader/>
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>Your Cart</Typography>
//       {items.length === 0 ? (
//         <Typography>Your cart is empty</Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {items.map((item) => (
//             <Grid item xs={12} sm={6} md={4} key={item.product._id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6">{item.product.name}</Typography>
//                   <Typography variant="body2" color="textSecondary">${item.product.price}</Typography>
//                   <TextField
//                     type="number"
//                     value={item.quantity}
//                     onChange={(e) => handleUpdateQuantity(item.product._id, parseInt(e.target.value))}
//                     inputProps={{ min: 1 }}
//                   />
//                   <IconButton color="secondary" onClick={() => handleRemove(item.product._id)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//       <Button variant="contained" color="secondary" onClick={handleClearCart}>
//         Clear Cart
//       </Button>
//       <Button variant="contained" color="primary" sx={{ ml: 2 }}>
//         Proceed to Checkout
//       </Button>
//     </Box>
//     </div>
//   );
// };

// export default CartPage;


import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart, updateCartItem, clearCart } from '../slices/cartSlice';
import { Box, Button, Typography, Grid, Card, CardContent, CardMedia, IconButton, 
  TextField, Divider, Paper, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppHeader from './AppHeader';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);
  const navigate = useNavigate

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity >= 1) {
      dispatch(updateCartItem({ productId, quantity }));
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout=()=>{
    navigate('/checkout')
  }

  const cartTotal = useMemo(() => {
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }, [items]);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress sx={{ color: 'orange' }} />
      </Box>
    );
  }

  return (
    <div>
      <AppHeader />
      <Box sx={{ 
        p: 4, 
        bgcolor: '#fff0f5', // Light pink background
        minHeight: '100vh' 
      }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            color: 'orange',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4
          }}
        >
          Your Shopping Cart
        </Typography>

        {items.length === 0 ? (
          <Paper 
            elevation={3}
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: 2,
              bgcolor: 'white'
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 60, color: 'orange', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Your cart is empty
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {items.map((item) => (
                <Card 
                  key={item.product._id}
                  sx={{ 
                    mb: 2,
                    border: '2px solid orange',
                    borderRadius: 2,
                    '&:hover': {
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Grid container>
                    <Grid item xs={12} sm={4}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.product.image}
                        alt={item.product.name}
                        sx={{ objectFit: 'cover' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <div>
                            <Typography variant="h6" sx={{ color: '#ff1493' }}>
                              {item.product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              {item.product.description}
                            </Typography>
                          </div>
                          <IconButton 
                            onClick={() => handleRemove(item.product._id)}
                            sx={{ color: '#ff1493' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                        
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          mt: 2 
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ mr: 2 }}>
                              Quantity:
                            </Typography>
                            <TextField
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleUpdateQuantity(
                                item.product._id, 
                                parseInt(e.target.value)
                              )}
                              inputProps={{ min: 1 }}
                              size="small"
                              sx={{ width: '80px' }}
                            />
                          </Box>
                          <Typography variant="h6" sx={{ color: 'orange' }}>
                            R{(item.product.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper 
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'white',
                  position: 'sticky',
                  top: 20
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Subtotal ({items.length} items):</Typography>
                    <Typography>R{cartTotal.toFixed(2)}</Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" sx={{ color: 'orange' }}>
                    R{cartTotal.toFixed(2)}
                  </Typography>
                </Box>

                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={handleCheckout}
                  sx={{ 
                    mb: 2,
                    bgcolor: 'orange',
                    '&:hover': {
                      bgcolor: '#ff8c00'
                    }
                  }}
                >
                  Proceed to Checkout
                </Button>
                
                <Button 
                  variant="outlined"
                  fullWidth
                  onClick={handleClearCart}
                  sx={{ 
                    color: '#ff1493',
                    borderColor: '#ff1493',
                    '&:hover': {
                      borderColor: '#ff1493',
                      bgcolor: 'rgba(255, 20, 147, 0.1)'
                    }
                  }}
                >
                  Clear Cart
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default CartPage;