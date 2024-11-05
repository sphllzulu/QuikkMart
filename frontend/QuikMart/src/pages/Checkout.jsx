// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCart, clearCart } from '../slices/cartSlice';
// import { Box, Button, Typography, Grid, Card, CardContent } from '@mui/material';

// const CheckoutPage = () => {
//   const dispatch = useDispatch();
//   const { items } = useSelector((state) => state.cart);

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const handleCheckout = () => {
    
//     dispatch(clearCart());
//     alert("Thank you for your purchase!");
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>Checkout</Typography>
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
//                   <Typography>Quantity: {item.quantity}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//       {items.length > 0 && (
//         <Button variant="contained" color="primary" onClick={handleCheckout} sx={{ mt: 2 }}>
//           Place Order
//         </Button>
//       )}
//     </Box>
//   );
// };

// export default CheckoutPage;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchCart, clearCart } from '../slices/cartSlice';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { 
//   Box, 
//   Button, 
//   Typography, 
//   Grid, 
//   Card, 
//   CardContent, 
//   CardMedia,
//   TextField, 
//   Paper,
//   Stepper,
//   Step,
//   StepLabel,
//   Divider,
//   CircularProgress,
//   Alert
// } from '@mui/material';
// import LockIcon from '@mui/icons-material/Lock';

// import AppHeader from './AppHeader';

// // Replace with your Stripe publishable key
// const stripePromise = loadStripe('pk_test_51PuTr7LOTigiMrGc4kJLk7Qkg7DeJn4I7yopiOdsLpprbiw7QCTKvztnOZrREYH6YQ75ELZz15tblpYpGUvpP3AG00TB1uLG3e');

// const CARD_ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       color: '#32325d',
//       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//       fontSmoothing: 'antialiased',
//       fontSize: '16px',
//       '::placeholder': {
//         color: '#aab7c4'
//       }
//     },
//     invalid: {
//       color: '#fa755a',
//       iconColor: '#fa755a'
//     }
//   }
// };

// const CheckoutForm = ({ handleNext, orderData, setOrderData }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setProcessing(true);

//     if (!stripe || !elements) {
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//       billing_details: {
//         name: orderData.name,
//         email: orderData.email,
//         address: {
//           line1: orderData.address,
//           city: orderData.city,
//           postal_code: orderData.zipCode,
//           country: orderData.country,
//         }
//       }
//     });

//     if (error) {
//       setError(error.message);
//       setProcessing(false);
//     } else {
//       // Here you would typically send the payment method ID to your backend
//       // to complete the payment
//       try {
//         // Mock API call - replace with your actual payment processing
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         setOrderData(prev => ({ ...prev, paymentMethodId: paymentMethod.id }));
//         handleNext();
//       } catch (err) {
//         setError('Payment failed. Please try again.');
//       }
//       setProcessing(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <TextField
//             required
//             fullWidth
//             label="Name"
//             value={orderData.name}
//             onChange={(e) => setOrderData(prev => ({ ...prev, name: e.target.value }))}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             required
//             fullWidth
//             label="Email"
//             type="email"
//             value={orderData.email}
//             onChange={(e) => setOrderData(prev => ({ ...prev, email: e.target.value }))}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             required
//             fullWidth
//             label="Address"
//             value={orderData.address}
//             onChange={(e) => setOrderData(prev => ({ ...prev, address: e.target.value }))}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             fullWidth
//             label="City"
//             value={orderData.city}
//             onChange={(e) => setOrderData(prev => ({ ...prev, city: e.target.value }))}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             fullWidth
//             label="Zip Code"
//             value={orderData.zipCode}
//             onChange={(e) => setOrderData(prev => ({ ...prev, zipCode: e.target.value }))}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="h6" gutterBottom sx={{ mt: 2, color: '#32325d' }}>
//             Card Details
//           </Typography>
//           <Paper 
//             variant="outlined" 
//             sx={{ p: 2, border: '1px solid #e0e0e0', bgcolor: '#f8f9fa' }}
//           >
//             <CardElement options={CARD_ELEMENT_OPTIONS} />
//           </Paper>
//         </Grid>
//       </Grid>

//       {error && (
//         <Alert severity="error" sx={{ mt: 2 }}>
//           {error}
//         </Alert>
//       )}

//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
//         <Button
//           type="submit"
//           variant="contained"
//           disabled={!stripe || processing}
//           sx={{ 
//             bgcolor: 'orange',
//             '&:hover': {
//               bgcolor: '#ff8c00'
//             }
//           }}
//         >
//           {processing ? (
//             <CircularProgress size={24} sx={{ color: 'white' }} />
//           ) : (
//             'Pay Now'
//           )}
//         </Button>
//       </Box>
//     </form>
//   );
// };

// const CheckoutPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { items } = useSelector((state) => state.cart);
//   const [activeStep, setActiveStep] = useState(0);
//   const [orderData, setOrderData] = useState({
//     name: '',
//     email: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     country: 'ZA',
//     paymentMethodId: null
//   });

//   const steps = ['Review Order', 'Shipping & Payment', 'Confirmation'];

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const calculateTotal = () => {
//     return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
//   };

//   const handleNext = () => {
//     setActiveStep((prevStep) => prevStep + 1);
//     if (activeStep === steps.length - 1) {
//       dispatch(clearCart());
//       navigate('/order-success'); // Create this route/page
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };

//   if (items.length === 0) {
//     return (
//       <div>
//         <AppHeader />
//         <Box 
//           sx={{ 
//             p: 4,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             bgcolor: '#fff0f5',
//             minHeight: '100vh'
//           }}
//         >
//           <Typography variant="h5" sx={{ mb: 2 }}>Your cart is empty</Typography>
//           <Button 
//             variant="contained"
//             onClick={() => navigate('/productList')}
//             sx={{ 
//               bgcolor: 'orange',
//               '&:hover': {
//                 bgcolor: '#ff8c00'
//               }
//             }}
//           >
//             Continue Shopping
//           </Button>
//         </Box>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <AppHeader />
//       <Box sx={{ 
//         p: 4, 
//         bgcolor: '#fff0f5',
//         minHeight: '100vh' 
//       }}>
//         <Paper 
//           elevation={3} 
//           sx={{ 
//             p: 3,
//             maxWidth: 1200,
//             margin: '0 auto',
//             bgcolor: 'white',
//             borderRadius: 2
//           }}
//         >
//           <Typography 
//             variant="h4" 
//             gutterBottom 
//             sx={{ 
//               color: '#ff1493',
//               textAlign: 'center',
//               mb: 4 
//             }}
//           >
//             Checkout
//           </Typography>

//           <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>

//           {activeStep === 0 && (
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={8}>
//                 {items.map((item) => (
//                   <Card 
//                     key={item.product._id}
//                     sx={{ 
//                       mb: 2,
//                       border: '2px solid orange',
//                       borderRadius: 2
//                     }}
//                   >
//                     <Grid container>
//                       <Grid item xs={12} sm={4}>
//                         <CardMedia
//                           component="img"
//                           height="140"
//                           image={item.product.image}
//                           alt={item.product.name}
//                           sx={{ objectFit: 'cover' }}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={8}>
//                         <CardContent>
//                           <Typography variant="h6" sx={{ color: '#ff1493' }}>
//                             {item.product.name}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             Quantity: {item.quantity}
//                           </Typography>
//                           <Typography variant="h6" sx={{ color: 'orange', mt: 1 }}>
//                             R{(item.product.price * item.quantity).toFixed(2)}
//                           </Typography>
//                         </CardContent>
//                       </Grid>
//                     </Grid>
//                   </Card>
//                 ))}
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//                   <Typography variant="h6" gutterBottom>
//                     Order Summary
//                   </Typography>
//                   <Divider sx={{ mb: 2 }} />
                  
//                   <Box sx={{ mb: 2 }}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                       <Typography>Subtotal:</Typography>
//                       <Typography>R{calculateTotal().toFixed(2)}</Typography>
//                     </Box>
//                   </Box>
                  
//                   <Divider sx={{ mb: 2 }} />
                  
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                     <Typography variant="h6">Total:</Typography>
//                     <Typography variant="h6" sx={{ color: 'orange' }}>
//                       R{calculateTotal().toFixed(2)}
//                     </Typography>
//                   </Box>

//                   <Button 
//                     fullWidth 
//                     variant="contained"
//                     onClick={handleNext}
//                     sx={{ 
//                       bgcolor: 'orange',
//                       '&:hover': {
//                         bgcolor: '#ff8c00'
//                       }
//                     }}
//                   >
//                     Proceed to Payment
//                   </Button>
//                 </Paper>
//               </Grid>
//             </Grid>
//           )}

//           {activeStep === 1 && (
//             <Elements stripe={stripePromise}>
//               <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
//                 <CheckoutForm 
//                   handleNext={handleNext}
//                   orderData={orderData}
//                   setOrderData={setOrderData}
//                 />
//               </Box>
//             </Elements>
//           )}

//           {activeStep === 2 && (
//             <Box sx={{ textAlign: 'center' }}>
//               <Typography variant="h5" gutterBottom sx={{ color: 'orange' }}>
//                 Thank you for your order!
//               </Typography>
//               <Typography variant="subtitle1">
//                 Your order number is #{Math.random().toString(36).substr(2, 9).toUpperCase()}
//               </Typography>
//               <Typography variant="body1" sx={{ mt: 2 }}>
//                 We will send you an email confirmation with tracking details.
//               </Typography>
//               <Button
//                 variant="contained"
//                 onClick={() => navigate('/')}
//                 sx={{ 
//                   mt: 4,
//                   bgcolor: 'orange',
//                   '&:hover': {
//                     bgcolor: '#ff8c00'
//                   }
//                 }}
//               >
//                 Continue Shopping
//               </Button>
//             </Box>
//           )}

//           {activeStep > 0 && activeStep < steps.length - 1 && (
//             <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 3 }}>
//               <Button onClick={handleBack} sx={{ color: '#ff1493' }}>
//                 Back
//               </Button>
//             </Box>
//           )}
//         </Paper>
//       </Box>
//     </div>
//   );
// };

// export default CheckoutPage;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart, clearCart } from '../slices/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { 
  Box, 
  Button, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  TextField, 
  Paper,
  Stepper,
  Step,
  StepLabel,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

import AppHeader from './AppHeader';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_51PuTr7LOTigiMrGc4kJLk7Qkg7DeJn4I7yopiOdsLpprbiw7QCTKvztnOZrREYH6YQ75ELZz15tblpYpGUvpP3AG00TB1uLG3e');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

const CheckoutForm = ({ handleNext, orderData, setOrderData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: orderData.name,
        email: orderData.email,
        address: {
          line1: orderData.address,
          city: orderData.city,
          postal_code: orderData.zipCode,
          country: orderData.country,
        }
      }
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrderData(prev => ({ ...prev, paymentMethodId: paymentMethod.id }));
        handleNext();
      } catch (err) {
        setError('Payment failed. Please try again.');
      }
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Name"
            value={orderData.name}
            onChange={(e) => setOrderData(prev => ({ ...prev, name: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            value={orderData.email}
            onChange={(e) => setOrderData(prev => ({ ...prev, email: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Address"
            value={orderData.address}
            onChange={(e) => setOrderData(prev => ({ ...prev, address: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="City"
            value={orderData.city}
            onChange={(e) => setOrderData(prev => ({ ...prev, city: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Zip Code"
            value={orderData.zipCode}
            onChange={(e) => setOrderData(prev => ({ ...prev, zipCode: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2, color: '#32325d' }}>
            Card Details
          </Typography>
          <Paper 
            variant="outlined" 
            sx={{ p: 2, border: '1px solid #e0e0e0', bgcolor: '#f8f9fa' }}
          >
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </Paper>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={!stripe || processing}
          sx={{ 
            bgcolor: 'orange',
            '&:hover': {
              bgcolor: '#ff8c00'
            }
          }}
        >
          {processing ? (
            <CircularProgress size={24} sx={{ color: 'white' }} />
          ) : (
            'Pay Now'
          )}
        </Button>
      </Box>
    </form>
  );
};

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const [activeStep, setActiveStep] = useState(0);
  const [orderData, setOrderData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'ZA',
    paymentMethodId: null
  });

  const steps = ['Review Order', 'Shipping & Payment', 'Confirmation'];

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    if (activeStep === steps.length - 1) {
      dispatch(clearCart());
      navigate('/order-success');
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  if (items.length === 0) {
    return (
      <div>
        <AppHeader />
        <Box 
          sx={{ 
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: '#fff0f5',
            minHeight: '100vh'
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>Your cart is empty</Typography>
          <Button 
            variant="contained"
            onClick={() => navigate('/productList')}
            sx={{ 
              bgcolor: 'orange',
              '&:hover': {
                bgcolor: '#ff8c00'
              }
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </div>
    );
  }

  return (
    <div>
      <AppHeader />
      <Box sx={{ 
        p: 4, 
        bgcolor: '#fff0f5',
        minHeight: '100vh' 
      }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3,
            maxWidth: 1200,
            margin: '0 auto',
            bgcolor: 'white',
            borderRadius: 2
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              color: '#ff1493',
              textAlign: 'center',
              mb: 4 
            }}
          >
            Checkout
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4, flexWrap: 'wrap' }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                {items.map((item) => (
                  <Card 
                    key={item.product._id}
                    sx={{ 
                      mb: 2,
                      border: '2px solid orange',
                      borderRadius: 2
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
                          <Typography variant="h6" sx={{ color: '#ff1493' }}>{item.product.name}</Typography>
                          <Typography variant="body1">Quantity: {item.quantity}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            Price: R{(item.product.price * item.quantity).toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                ))}
              </Grid>
              <Grid item xs={12} md={4}>
                <Box 
                  sx={{ 
                    p: 3, 
                    border: '1px solid #ff1493', 
                    borderRadius: 2 
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>Order Summary</Typography>
                  <Divider />
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Total: R{calculateTotal().toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleNext}
                    sx={{ 
                      mt: 3,
                      bgcolor: 'pink',
                      '&:hover': {
                        bgcolor: '#ff69b4'
                      }
                    }}
                  >
                    Proceed to Payment
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}

          {activeStep === 1 && (
            <Elements stripe={stripePromise}>
              <CheckoutForm handleNext={handleNext} orderData={orderData} setOrderData={setOrderData} />
            </Elements>
          )}

          {activeStep === 2 && (
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="h5" sx={{ color: '#ff1493', mb: 2 }}>Order Confirmed</Typography>
              <Typography variant="body1">Thank you for your purchase!</Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{ 
                  mt: 3,
                  bgcolor: 'orange',
                  '&:hover': {
                    bgcolor: '#ff8c00'
                  }
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          )}

          {activeStep !== 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button 
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1, color: '#ff69b4' }}
              >
                Back
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default CheckoutPage;
