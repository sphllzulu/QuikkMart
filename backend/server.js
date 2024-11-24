import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from 'connect-mongo';
import Users from "./users.js";
import validator from "validator";
import bcrypt from 'bcrypt';
import cors from 'cors';
import Product from './products.js';
import Cart from './cart.js';
// import serverless from "serverless-http"

const PORT = process.env.PORT || 8000;
const server = express();
const router = express.Router();

server.use(cors());

// server.use(cors({
//     origin: 'http://localhost:5173', // Your Vite frontend URL
//     credentials: true // Enable credentials (cookies, authorization headers, etc)
// }));

server.use(express.json());

server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collection: 'mySessions',
    }),
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

server.use(router);

// Authentication Routes (Signup and Signin)
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new Users({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.session.userId = user._id;
    req.session.role = user.role;
    res.json({ message: 'Login successful', userId: user._id, role: user.role });
});

const isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Please login to access this resource' });
    }
    next();
};

// Product Routes

// Get all products (accessible to everyone)
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({ hidden: false, available: true }).populate('seller', 'email');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

// Get single product (accessible to everyone)
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('seller', 'email');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
});

// Create product (logged-in users only)
router.post('/products', isAuthenticated, async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;
        const newProduct = new Product({
            name,
            description,
            price,
            image,
            category,
            seller: req.session.userId
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
});

// Update product (only owner or admin)
router.put('/products/:id', isAuthenticated, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.seller.toString() !== req.session.userId && req.session.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this product' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});

// Delete product (only owner or admin)
router.delete('/products/:id', isAuthenticated, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.seller.toString() !== req.session.userId && req.session.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this product' });
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});

// Cart Routes
// Get user's cart
router.get('/cart', isAuthenticated, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.session.userId })
            .populate('items.product')

        if (!cart) {
            cart = await Cart.create({
                user: req.session.userId,
                items: []
            })
        }

        res.json(cart)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error: error.message })
    }
});

// Add to cart
router.post('/cart/add', isAuthenticated, async (req, res) => {
    try {
        const { productId, quantity } = req.body

        let cart = await Cart.findOne({ user: req.session.userId })

        if (!cart) {
            cart = await Cart.create({
                user: req.session.userId,
                items: []
            })
        }

        const existingItem = cart.items.find(item => 
            item.product.toString() === productId
        )

        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            cart.items.push({ product: productId, quantity })
        }

        await cart.save()
        await cart.populate('items.product')
        
        res.json(cart)
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error: error.message })
    }
});

// Update cart item
router.put('/cart/update', isAuthenticated, async (req, res) => {
    try {
        const { productId, quantity } = req.body

        const cart = await Cart.findOne({ user: req.session.userId })
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        const item = cart.items.find(item => 
            item.product.toString() === productId
        )

        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' })
        }

        if (quantity <= 0) {
            cart.items = cart.items.filter(item => 
                item.product.toString() !== productId
            )
        } else {
            item.quantity = quantity
        }

        await cart.save()
        await cart.populate('items.product')
        
        res.json(cart)
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error: error.message })
    }
});

// Remove from cart
router.delete('/cart/remove/:productId', isAuthenticated, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.session.userId })
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        cart.items = cart.items.filter(item => 
            item.product.toString() !== req.params.productId
        )

        await cart.save()
        await cart.populate('items.product')
        
        res.json(cart)
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart', error: error.message })
    }
});

// Clear cart
router.delete('/cart/clear', isAuthenticated, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.session.userId })
        if (cart) {
            cart.items = []
            await cart.save()
        }
        res.json({ message: 'Cart cleared successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart', error: error.message })
    }
});


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });

// mongoose.connect(process.env.MONGO_URI).catch((error) => console.error(error));
// export default serverless(server);
