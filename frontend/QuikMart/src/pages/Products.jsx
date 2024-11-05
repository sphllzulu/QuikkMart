
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


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, editProduct, deleteProduct } from '../slices/productSlice';
import { Fab, Modal, Box, TextField, Button, Typography, Grid, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const LandingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleOpen = (product = null) => {
    setEditMode(!!product);
    setSelectedProduct(product);
    setProductData(product || { name: '', description: '', price: '', image: '', category: '' });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode && selectedProduct) {
      dispatch(editProduct({ id: selectedProduct._id, productData }));
    } else {
      dispatch(addProduct(productData));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Marketplace</Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardMedia component="img" height="200" image={product.image} alt={product.name} />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                <Typography variant="h6">${product.price}</Typography>
                <Typography variant="h6">{product.category}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <IconButton onClick={() => handleOpen(product)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product._id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ShoppingCartIcon />}
                    sx={{ bgcolor: '#ff4081' }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab color="primary" aria-label="add" onClick={() => handleOpen()} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <AddIcon />
      </Fab>

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
          <Typography variant="h6" gutterBottom>{editMode ? 'Edit Product' : 'Add New Product'}</Typography>
          <TextField fullWidth margin="normal" label="Name" name="name" value={productData.name} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Description" name="description" multiline rows={3} value={productData.description} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Price" name="price" type="number" value={productData.price} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Image URL" name="image" value={productData.image} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Category" name="category" value={productData.category} onChange={handleInputChange} />
          <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>{editMode ? 'Update' : 'Add'} Product</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default LandingPage;
