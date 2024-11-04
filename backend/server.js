import express from "express"
import "dotenv/config"
import mongoose from "mongoose"
import session from "express-session"
import MongoStore from 'connect-mongo'
import Users from "./users.js" 
import validator from "validator"
import bcrypt from 'bcrypt'
import cors from 'cors'


const PORT = process.env.PORT || 8000
const server = express();
const router= express.Router();

server.use(cors({
    origin: PORT,
    credentials: true
  }));

server.use(express.json());




//creating a session
server.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store:MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collection:'mySessions',
      }),
    cookie:{
        secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 
    }
    }));

    server.use(router)


server.get('/',(req,res)=>{
    req.session.isAuth= true
    res.send("connected")
})

// Registering a user
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            message: 'Please enter a valid email address'
        });
    }

    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            message: 'User already exists'
        });
    }

    // Create and save new user
    const newUser = new Users({ email, password });
    await newUser.save();
    res.status(201).json({
        message: 'User registered successfully'
    });
});


// Signing in a user
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await Users.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Set session data
    req.session.userId = user._id;
    req.session.role = user.role;

    res.json({
        message: 'Login successful',
        userId: user._id,
        role: user.role
    });
});


//authentication and authorization middleware
// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Please login to access this resource' });
    }
    next();
};

// Middleware to check for admin role
const isAdmin = (req, res, next) => {
    if (req.session.role !== 'admin') {
        return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }
    next();
};

//routes only accessed by the admin
// Protected route for admin only
router.get('/admin', isAuthenticated, isAdmin, (req, res) => {
    res.json({ message: 'Welcome, Admin!' });
});

// Route for general user data
router.get('/user-data', isAuthenticated, (req, res) => {
    res.json({ message: `Welcome User ${req.session.userId}` });
});


// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout successful' });
    });
});




mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    server.listen(PORT,()=>{
        console.log(`server running and connected to mongo on ${PORT}`)
    })
})
.catch((error)=>{
    console.error(error)
})


// // server.js
// import express from "express";
// import "dotenv/config";
// import mongoose from "mongoose";
// import session from "express-session";
// import MongoStore from 'connect-mongo';
// import cors from 'cors';
// import Users from "./users.js";

// const PORT = process.env.PORT || 8000;
// const server = express();

// // Middleware
// server.use(express.json());
// server.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));

// // Session setup
// server.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//         mongoUrl: process.env.MONGO_URI,
//         collection: 'sessions',
//     }),
//     cookie: {
//         secure: false,
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24 
//     }
// }));

// // Auth Routes
// server.post('/api/signup', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const existingUser = await Users.findOne({ username });
        
//         if (existingUser) {
//             return res.status(400).json({ message: 'Email already registered' });
//         }

//         const newUser = new Users({ username, password });
//         await newUser.save();
        
//         res.status(201).json({
//             message: 'User registered successfully'
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error registering user',
//             error: error.message
//         });
//     }
// });

// server.post('/api/signin', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await Users.findOne({ username });
        
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         req.session.userId = user._id;
//         req.session.isAuth = true;

//         res.json({
//             message: 'Login successful',
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 role: user.role
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error signing in',
//             error: error.message
//         });
//     }
// });

// // Check auth status
// server.get('/api/auth-status', (req, res) => {
//     if (req.session.isAuth) {
//         res.json({ isAuthenticated: true, userId: req.session.userId });
//     } else {
//         res.json({ isAuthenticated: false });
//     }
// });

// // Logout
// server.post('/api/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error logging out' });
//         }
//         res.clearCookie('connect.sid');
//         res.json({ message: 'Logged out successfully' });
//     });
// });

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         server.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.error('Database connection error:', error);
//     });