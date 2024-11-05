
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, addProduct } from '../slices/productSlice';
// import { Fab, Modal, Box, TextField, Button, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';

// const LandingPage = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.items);
//   const [open, setOpen] = useState(false);
//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     description: '',
//     price: '',
//     image: '',
//     category:'',
//   });

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduct({ ...newProduct, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(addProduct(newProduct));
//     setNewProduct({ name: '', description: '', price: '', image: '',category:'' });
//     handleClose();
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>Marketplace</Typography>
//       <Grid container spacing={3}>
//         {products.map((product) => (
//           <Grid item xs={12} sm={6} md={4} key={product._id}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={product.image}
//                 alt={product.name}
//               />
//               <CardContent>
//                 <Typography variant="h6">{product.name}</Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {product.description}
//                 </Typography>
//                 <Typography variant="h6">${product.price}</Typography>
//                 <Typography variant="h6">{product.category}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Fab
//         color="primary"
//         aria-label="add"
//         onClick={handleOpen}
//         sx={{ position: 'fixed', bottom: 16, right: 16 }}
//       >
//         <AddIcon />
//       </Fab>

//       <Modal open={open} onClose={handleClose}>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             p: 4,
//             borderRadius: 2,
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6" gutterBottom>Add New Product</Typography>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Name"
//             name="name"
//             value={newProduct.name}
//             onChange={handleInputChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Description"
//             name="description"
//             multiline
//             rows={3}
//             value={newProduct.description}
//             onChange={handleInputChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Price"
//             name="price"
//             type="number"
//             value={newProduct.price}
//             onChange={handleInputChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Image URL"
//             name="image"
//             value={newProduct.image}
//             onChange={handleInputChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Category"
//             name="category"
//             value={newProduct.category}
//             onChange={handleInputChange}
//           />
//           <Button
//             fullWidth
//             type="submit"
//             variant="contained"
//             color="primary"
//             sx={{ mt: 2 }}
//           >
//             Add Product
//           </Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default LandingPage;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, addProduct, editProduct, deleteProduct } from '../slices/productSlice';
// import { Fab, Modal, Box, TextField, Button, Typography, Grid, Card, CardMedia, CardContent, IconButton } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// const LandingPage = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.items);
//   const [open, setOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const user = useSelector((state) => state.auth.user);
//   const cart = useSelector((state) => state.cart.items);

//   const [productData, setProductData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     image: '',
//     category: '',
//   });

//   //cart functionality
//   useEffect(() => {
//     dispatch(fetchProducts());
//     if (user) dispatch(fetchCart(user._id));
//   }, [dispatch, user]);

//   const handleAddToCart = (productId) => {
//     if (user) {
//       dispatch(addToCart({ productId, userId: user._id }));
//     } else {
//       alert("You must be logged in to add items to the cart.");
//     }
//   };

//   //product functionality
//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const handleOpen = (product = null) => {
//     setEditMode(!!product);
//     setSelectedProduct(product);
//     setProductData(product || { name: '', description: '', price: '', image: '', category: '' });
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductData({ ...productData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editMode && selectedProduct) {
//       dispatch(editProduct({ id: selectedProduct._id, productData }));
//     } else {
//       dispatch(addProduct(productData));
//     }
//     handleClose();
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteProduct(id));
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>Marketplace</Typography>
//       <Grid container spacing={3}>
//         {products.map((product) => (
//           <Grid item xs={12} sm={6} md={4} key={product._id}>
//             <Card>
//               <CardMedia component="img" height="200" image={product.image} alt={product.name} />
//               <CardContent>
//                 <Typography variant="h6">{product.name}</Typography>
//                 <Typography variant="body2" color="textSecondary">{product.description}</Typography>
//                 <Typography variant="h6">${product.price}</Typography>
//                 <Typography variant="h6">{product.category}</Typography>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//                   <IconButton onClick={() => handleOpen(product)} color="primary">
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(product._id)} color="secondary">
//                     <DeleteIcon />
//                   </IconButton>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     startIcon={<ShoppingCartIcon />}
//                     sx={{ bgcolor: '#ff4081' }}
//                   >
//                     Add to Cart
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Fab color="primary" aria-label="add" onClick={() => handleOpen()} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
//         <AddIcon />
//       </Fab>

//       <Modal open={open} onClose={handleClose}>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             p: 4,
//             borderRadius: 2,
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6" gutterBottom>{editMode ? 'Edit Product' : 'Add New Product'}</Typography>
//           <TextField fullWidth margin="normal" label="Name" name="name" value={productData.name} onChange={handleInputChange} />
//           <TextField fullWidth margin="normal" label="Description" name="description" multiline rows={3} value={productData.description} onChange={handleInputChange} />
//           <TextField fullWidth margin="normal" label="Price" name="price" type="number" value={productData.price} onChange={handleInputChange} />
//           <TextField fullWidth margin="normal" label="Image URL" name="image" value={productData.image} onChange={handleInputChange} />
//           <TextField fullWidth margin="normal" label="Category" name="category" value={productData.category} onChange={handleInputChange} />
//           <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>{editMode ? 'Update' : 'Add'} Product</Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default LandingPage;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, addProduct, editProduct, deleteProduct } from '../slices/productSlice';
// import { fetchCart, addToCart } from '../slices/cartSlice';  // Make sure to import fetchCart
// import { Fab, Modal, Box, TextField, Button, Typography, Grid, Card, CardMedia, CardContent, IconButton } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// const LandingPage = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.items);
//   const [open, setOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
  

//   const [productData, setProductData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     image: '',
//     category: '',
//   });

//   // Fetch products and cart items for the user
//   useEffect(() => {
//     dispatch(fetchProducts());
//     if (user) {
//       dispatch(fetchCart(user._id));
//     }
//   }, [dispatch, user]);

//   const handleAddToCart = (productId) => {
//     if (user) {
//       dispatch(addToCart({ productId, userId: user._id }));
//     } else {
//       alert("You must be logged in to add items to the cart.");
//     }
//   };

//   const handleOpen = (product = null) => {
//     setEditMode(!!product);
//     setSelectedProduct(product);
//     setProductData(product || { name: '', description: '', price: '', image: '', category: '' });
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductData({ ...productData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editMode && selectedProduct) {
//       await dispatch(editProduct({ id: selectedProduct._id, productData }));
//     } else {
//       await dispatch(addProduct(productData));
//     }
//     handleClose();
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteProduct(id));
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>Marketplace</Typography>
//       <Grid container spacing={3}>
//         {products.map((product) => (
//           <Grid item xs={12} sm={6} md={4} key={product._id}>
//             <Card>
//               <CardMedia component="img" height="200" image={product.image} alt={product.name} />
//               <CardContent>
//                 <Typography variant="h6">{product.name}</Typography>
//                 <Typography variant="body2" color="textSecondary">{product.description}</Typography>
//                 <Typography variant="h6">${product.price}</Typography>
//                 <Typography variant="h6">{product.category}</Typography>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//                   <IconButton onClick={() => handleOpen(product)} color="primary">
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(product._id)} color="secondary">
//                     <DeleteIcon />
//                   </IconButton>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     startIcon={<ShoppingCartIcon />}
//                     onClick={() => handleAddToCart(product._id)}
//                     sx={{ bgcolor: '#ff4081', mt: 1 }}
//                   >
//                     Add to Cart
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Fab color="primary" aria-label="add" onClick={() => handleOpen()} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
//         <AddIcon />
//       </Fab>

//       <Modal open={open} onClose={handleClose}>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             p: 4,
//             borderRadius: 2,
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6" gutterBottom>{editMode ? 'Edit Product' : 'Add New Product'}</Typography>
//           <TextField fullWidth margin="normal" label="Name" name="name" value={productData.name} onChange={handleInputChange} />
//           <TextField fullWidth margin="normal" label="Description" name="description" multiline rows={3} value={productData.description} onChange={handleInputChange} />
//           <TextField fullWidth margin="normal" label="Price" name="price" type="number" value={productData.price} onChange={handleInputChange} />
//           <TextField fullWidth margin="normal" label="Image URL" name="image" value={productData.image} onChange={handleInputChange} />
//           <TextField fullWidth margin="normal" label="Category" name="category" value={productData.category} onChange={handleInputChange} />
//           <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>{editMode ? 'Update' : 'Add'} Product</Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default LandingPage;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, addProduct, editProduct, deleteProduct } from '../slices/productSlice';
// import { fetchCart, addToCart } from '../slices/cartSlice';  // Make sure to import fetchCart
// import { Fab, Modal, Box, TextField, Button, Typography, Grid, Card, CardMedia, CardContent, IconButton } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// const LandingPage = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.items);
//   const user = useSelector((state) => state.auth.user); // Assuming user data is stored in auth slice
//   const [open, setOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
  
//   const [productData, setProductData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     image: '',
//     category: '',
//   });

//   const [quantity, setQuantity] = useState(1); // State for quantity

//   // Fetch products and cart items for the user
//   useEffect(() => {
//     dispatch(fetchProducts());
//     if (user) {
//       dispatch(fetchCart());
//     }
//   }, [dispatch, user]);

//   const handleAddToCart = (productId) => {
//     if (user) {
//       dispatch(addToCart({ productId, quantity })); // Pass quantity to the action
//     } else {
//       alert("You must be logged in to add items to the cart.");
//     }
//   };

//   const handleOpen = (product = null) => {
//     setEditMode(!!product);
//     setSelectedProduct(product);
//     setProductData(product || { name: '', description: '', price: '', image: '', category: '' });
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setQuantity(1); // Reset quantity when closing modal
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductData({ ...productData, [name]: value });
//   };

//   const handleQuantityChange = (e) => {
//     setQuantity(Number(e.target.value)); // Update quantity from input
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editMode && selectedProduct) {
//       await dispatch(editProduct({ id: selectedProduct._id, productData }));
//     } else {
//       await dispatch(addProduct(productData));
//     }
//     handleClose();
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteProduct(id));
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>Marketplace</Typography>
//       <Grid container spacing={3}>
//         {products.map((product) => (
//           <Grid item xs={12} sm={6} md={4} key={product._id}>
//             <Card>
//               <CardMedia component="img" height="200" image={product.image} alt={product.name} />
//               <CardContent>
//                 <Typography variant="h6">{product.name}</Typography>
//                 <Typography variant="body2" color="textSecondary">{product.description}</Typography>
//                 <Typography variant="h6">${product.price}</Typography>
//                 <Typography variant="h6">{product.category}</Typography>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//                   <IconButton onClick={() => handleOpen(product)} color="primary">
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(product._id)} color="secondary">
//                     <DeleteIcon />
//                   </IconButton>
//                   <Box>
//                     <TextField
//                       type="number"
//                       value={quantity}
//                       onChange={handleQuantityChange}
//                       inputProps={{ min: 1 }}
//                       sx={{ width: '60px', marginRight: '8px' }} // Adjust width as needed
//                     />
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       startIcon={<ShoppingCartIcon />}
//                       onClick={() => handleAddToCart(product._id)}
//                       sx={{ bgcolor: '#ff4081', mt: 1 }}
//                     >
//                       Add to Cart
//                     </Button>
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Fab color="primary" aria-label="add" onClick={() => handleOpen()} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
//         <AddIcon />
//       </Fab>

//       <Modal open={open} onClose={handleClose}>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             p: 4,
//             borderRadius: 2,
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6" gutterBottom>{editMode ? 'Edit Product' : 'Add New Product'}</Typography>
//           <TextField fullWidth margin="normal" label="Name" name="name" value={productData.name} onChange={handleInputChange} />
//           <TextField fullWidth margin="normal" label="Description" name="description" multiline rows={3} value={productData.description} onChange={handleInputChange} />
//           <TextField fullWidth margin="normal" label="Price" name="price" type="number" value={productData.price} onChange={handleInputChange} />
//           <TextField fullWidth margin="normal" label="Image URL" name="image" value={productData.image} onChange={handleInputChange} />
//           <TextField fullWidth margin="normal" label="Category" name="category" value={productData.category} onChange={handleInputChange} />
//           <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>{editMode ? 'Update' : 'Add'} Product</Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default LandingPage;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, addProduct, editProduct, deleteProduct } from '../slices/productSlice';
// import { fetchCart, addToCart } from '../slices/cartSlice';
// import { Fab, Modal, Box, TextField, Button, Typography, Grid, Card, CardMedia, CardContent, IconButton, Alert, Snackbar } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import AppHeader from './AppHeader';

// const LandingPage = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.items);
//   const user = useSelector((state) => state.auth.user);
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const cartItems = useSelector((state) => state.cart.items);
  
//   const [open, setOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  
//   const [productData, setProductData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     image: '',
//     category: '',
//   });

//   useEffect(() => {
//     dispatch(fetchProducts());
//     if (isAuthenticated && user?._id) {
//       dispatch(fetchCart());
//     }
//   }, [dispatch, isAuthenticated, user]);

//   const handleAddToCart = async (productId) => {
//     if (!isAuthenticated) {
//       setSnackbar({
//         open: true,
//         message: 'Please sign in to add items to your cart',
//         severity: 'warning'
//       });
//       return;
//     }
    
//     try {
//       await dispatch(addToCart({
//         userId: user._id,
//         productId,
//         quantity
//       })).unwrap();
      
//       setSnackbar({
//         open: true,
//         message: 'Item added to cart successfully',
//         severity: 'success'
//       });
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: error.message || 'Failed to add item to cart',
//         severity: 'error'
//       });
//     }
//   };

//   const handleOpen = (product = null) => {
//     if (!isAuthenticated) {
//       setSnackbar({
//         open: true,
//         message: 'Please sign in to manage products',
//         severity: 'warning'
//       });
//       return;
//     }
    
//     setEditMode(!!product);
//     setSelectedProduct(product);
//     setProductData(product || {
//       name: '',
//       description: '',
//       price: '',
//       image: '',
//       category: ''
//     });
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setQuantity(1);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductData({ ...productData, [name]: value });
//   };

//   const handleQuantityChange = (e) => {
//     const value = Math.max(1, parseInt(e.target.value) || 1);
//     setQuantity(value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editMode && selectedProduct) {
//         await dispatch(editProduct({ id: selectedProduct._id, productData })).unwrap();
//         setSnackbar({
//           open: true,
//           message: 'Product updated successfully',
//           severity: 'success'
//         });
//       } else {
//         await dispatch(addProduct(productData)).unwrap();
//         setSnackbar({
//           open: true,
//           message: 'Product added successfully',
//           severity: 'success'
//         });
//       }
//       handleClose();
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: error.message || 'Failed to save product',
//         severity: 'error'
//       });
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!isAuthenticated) {
//       setSnackbar({
//         open: true,
//         message: 'Please sign in to manage products',
//         severity: 'warning'
//       });
//       return;
//     }

//     try {
//       await dispatch(deleteProduct(id)).unwrap();
//       setSnackbar({
//         open: true,
//         message: 'Product deleted successfully',
//         severity: 'success'
//       });
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: error.message || 'Failed to delete product',
//         severity: 'error'
//       });
//     }
//   };

//   return (
//     <div>
//       <AppHeader/>
//     <Box sx={{ p: 4 }}>
//       {/* <Typography variant="h4" gutterBottom>Marketplace</Typography> */}
//       <Grid container spacing={3}>
//         {products.map((product) => (
//           <Grid item xs={12} sm={6} md={4} key={product._id}>
//             <Card>
//               <CardMedia component="img" height="200" image={product.image} alt={product.name} />
//               <CardContent>
//                 <Typography variant="h6">{product.name}</Typography>
//                 <Typography variant="body2" color="textSecondary">{product.description}</Typography>
//                 <Typography variant="h6">R{product.price}</Typography>
//                 <Typography variant="body2">{product.category}</Typography>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//                   <Box>
//                     {isAuthenticated && (
//                       <>
//                         <IconButton onClick={() => handleOpen(product)} color="primary">
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton onClick={() => handleDelete(product._id)} color="secondary">
//                           <DeleteIcon />
//                         </IconButton>
//                       </>
//                     )}
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <TextField
//                       type="number"
//                       value={quantity}
//                       onChange={handleQuantityChange}
//                       inputProps={{ min: 1 }}
//                       sx={{ width: '70px', mr: 1 }}
//                       size="small"
//                     />
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       startIcon={<ShoppingCartIcon />}
//                       onClick={() => handleAddToCart(product._id)}
//                       sx={{ bgcolor: '#ff4081' }}
//                     >
//                       Add to Cart
//                     </Button>
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {isAuthenticated && (
//         <Fab 
//           color="primary" 
//           aria-label="add" 
//           onClick={() => handleOpen()} 
//           sx={{ position: 'fixed', bottom: 16, right: 16, background:'orange' }}
//         >
//           <AddIcon />
//         </Fab>
//       )}

//       <Modal open={open} onClose={handleClose}>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             p: 4,
//             borderRadius: 2,
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             {editMode ? 'Edit Product' : 'Add New Product'}
//           </Typography>
//           <TextField 
//             fullWidth 
//             margin="normal" 
//             label="Name" 
//             name="name" 
//             value={productData.name} 
//             onChange={handleInputChange} 
//           />
//           <TextField 
//             fullWidth 
//             margin="normal" 
//             label="Description" 
//             name="description" 
//             multiline 
//             rows={3} 
//             value={productData.description} 
//             onChange={handleInputChange} 
//           />
//           <TextField 
//             fullWidth 
//             margin="normal" 
//             label="Price" 
//             name="price" 
//             type="number" 
//             value={productData.price} 
//             onChange={handleInputChange} 
//           />
//           <TextField 
//             fullWidth 
//             margin="normal" 
//             label="Image URL" 
//             name="image" 
//             value={productData.image} 
//             onChange={handleInputChange} 
//           />
//           <TextField 
//             fullWidth 
//             margin="normal" 
//             label="Category" 
//             name="category" 
//             value={productData.category} 
//             onChange={handleInputChange} 
//           />
//           <Button 
//             fullWidth 
//             type="submit" 
//             variant="contained" 
//             color="primary" 
//             sx={{ mt: 2 }}
//           >
//             {editMode ? 'Update' : 'Add'} Product
//           </Button>
//         </Box>
//       </Modal>

//       <Snackbar 
//         open={snackbar.open} 
//         autoHideDuration={6000} 
//         onClose={handleSnackbarClose}
//       >
//         <Alert 
//           onClose={handleSnackbarClose} 
//           severity={snackbar.severity} 
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//     </div>
//   );
// };

// export default LandingPage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, editProduct, deleteProduct } from '../slices/productSlice';
import { fetchCart, addToCart } from '../slices/cartSlice';
import { Fab, Modal, Box, TextField, Button, Typography, Grid, Card, CardMedia, 
  CardContent, IconButton, Alert, Snackbar, Collapse } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppHeader from './AppHeader';

const LandingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    createdBy: ''
  });

  useEffect(() => {
    dispatch(fetchProducts());
    if (isAuthenticated && user?._id) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated, user]);

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: 'Please sign in to add items to your cart',
        severity: 'warning'
      });
      return;
    }
    
    // Check if item already exists in cart
    const existingCartItem = cartItems.find(item => item.productId === productId);
    
    try {
      await dispatch(addToCart({
        userId: user._id,
        productId,
        quantity: existingCartItem ? existingCartItem.quantity + 1 : 1
      })).unwrap();
      
      setSnackbar({
        open: true,
        message: 'Item added to cart successfully',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Failed to add item to cart',
        severity: 'error'
      });
    }
  };

  const handleOpen = (product = null) => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: 'Please sign in to manage products',
        severity: 'warning'
      });
      return;
    }
    
    setEditMode(!!product);
    setSelectedProduct(product);
    setProductData(product || {
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      createdBy: user?._id
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode && selectedProduct) {
        await dispatch(editProduct({ id: selectedProduct._id, productData })).unwrap();
        setSnackbar({
          open: true,
          message: 'Product updated successfully',
          severity: 'success'
        });
      } else {
        const newProductData = {
          ...productData,
          createdBy: user._id
        };
        await dispatch(addProduct(newProductData)).unwrap();
        setSnackbar({
          open: true,
          message: 'Product added successfully',
          severity: 'success'
        });
      }
      handleClose();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Failed to save product',
        severity: 'error'
      });
    }
  };

  const handleDelete = async (id) => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: 'Please sign in to manage products',
        severity: 'warning'
      });
      return;
    }

    try {
      await dispatch(deleteProduct(id)).unwrap();
      setSnackbar({
        open: true,
        message: 'Product deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Failed to delete product',
        severity: 'error'
      });
    }
  };

  return (
    <div>
      <AppHeader />
      <Box sx={{ p: 4 }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card 
                onMouseEnter={() => setHoveredCard(product._id)}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{
                  border: '2px solid orange',
                  borderRadius: '8px',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardMedia 
                  component="img" 
                  height="200" 
                  image={product.image} 
                  alt={product.name} 
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Collapse in={hoveredCard === product._id}>
                    <Typography 
                      variant="body2" 
                      color="textSecondary" 
                      sx={{ mt: 1 }}
                    >
                      {product.description}
                    </Typography>
                  </Collapse>
                  <Typography variant="h6" sx={{ mt: 1 }}>R{product.price}</Typography>
                  <Typography variant="body2">{product.category}</Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Box>
                      {isAuthenticated && product.createdBy === user._id && (
                        <>
                          <IconButton 
                            onClick={() => handleOpen(product)} 
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            onClick={() => handleDelete(product._id)} 
                            color="secondary"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleAddToCart(product._id)}
                      sx={{ 
                        bgcolor: '#ff4081',
                        '&:hover': {
                          bgcolor: '#ff8c00'
                        }
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {isAuthenticated && (
          <Fab 
            color="primary" 
            aria-label="add" 
            onClick={() => handleOpen()} 
            sx={{ 
              position: 'fixed', 
              bottom: 16, 
              right: 16, 
              bgcolor: 'orange',
              '&:hover': {
                bgcolor: '#ff8c00'
              }
            }}
          >
            <AddIcon />
          </Fab>
        )}

        <Modal open={open} onClose={handleClose}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {editMode ? 'Edit Product' : 'Add New Product'}
            </Typography>
            <TextField 
              fullWidth 
              margin="normal" 
              label="Name" 
              name="name" 
              value={productData.name} 
              onChange={handleInputChange} 
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Description" 
              name="description" 
              multiline 
              rows={3} 
              value={productData.description} 
              onChange={handleInputChange} 
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Price" 
              name="price" 
              type="number" 
              value={productData.price} 
              onChange={handleInputChange} 
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Image URL" 
              name="image" 
              value={productData.image} 
              onChange={handleInputChange} 
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Category" 
              name="category" 
              value={productData.category} 
              onChange={handleInputChange} 
            />
            <Button 
              fullWidth 
              type="submit" 
              variant="contained" 
              sx={{ 
                mt: 2,
                bgcolor: 'orange',
                '&:hover': {
                  bgcolor: '#ff8c00'
                }
              }}
            >
              {editMode ? 'Update' : 'Add'} Product
            </Button>
          </Box>
        </Modal>

        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleSnackbarClose}
        >
          <Alert 
            onClose={handleSnackbarClose} 
            severity={snackbar.severity} 
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default LandingPage;