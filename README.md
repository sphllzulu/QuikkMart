# Beauty Mart MVP

Beauty Mart is a full-stack e-commerce marketplace application specialized in beauty products. This MVP (Minimum Viable Product) version provides essential features for managing and purchasing beauty products online.
## Design
Click link to see my design: https://www.figma.com/design/7BJheBlaABDNq7b4kDv759/Beauty-Mart?node-id=0-1&t=xPylSp4BANMSfG61-1

## 🌟 Features

### User Features
- User authentication (signup/signin)
- Browse beauty products
- Shopping cart management
- Responsive design for all devices

### Seller Features
- Product management (CRUD operations)
- Product visibility control
- Basic inventory management

### Admin Features
- Full product oversight
- User management capabilities
- Product moderation

## 🛠 Tech Stack

### Frontend
- React.js
- Redux for state management
- Material-UI (MUI) components
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Express Session for authentication

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## ⚙️ Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/beauty-mart.git
cd beauty-mart
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

## 🚀 Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`

## 🔒 API Security

- CORS enabled for specified origins
- Session-based authentication
- HTTP-only cookies
- Input validation using validator.js
- Password hashing using bcrypt

## 📝 API Endpoints

### Authentication
- `POST /signup` - Register new user
- `POST /signin` - User login

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `POST /products` - Create product (authenticated)
- `PUT /products/:id` - Update product (owner/admin)
- `DELETE /products/:id` - Delete product (owner/admin)

### Cart
- `GET /cart` - Get user's cart
- `POST /cart/add` - Add item to cart
- `PUT /cart/update` - Update cart item
- `DELETE /cart/remove/:productId` - Remove item from cart
- `DELETE /cart/clear` - Clear entire cart

## 🎨 Frontend Components

- `LandingPage` - Main product display and management
- `AppHeader` - Navigation and user controls
- `ImageCarousel` - Featured products showcase
- Product management modal
- Shopping cart interface
- Authentication forms

## 🔐 Security Considerations

1. Authentication:
   - Session-based authentication
   - Secure password storage
   - Protected routes

2. Data Validation:
   - Input sanitization
   - Email validation
   - Product data verification

3. Authorization:
   - Role-based access control
   - Product ownership verification
   - Protected admin functions

## 🚧 Known Limitations

- Basic search functionality
- Limited payment integration
- Simple inventory management
- Basic user roles (user/admin)

## 🛣 Future Enhancements

1. Features:
   - Advanced search and filtering
   - Payment gateway integration
   - Order management system
   - User reviews and ratings
   - Wishlist functionality

2. Technical:
   - Image upload capability
   - Real-time inventory updates
   - Advanced analytics
   - Email notifications
   - Social media integration

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ✍️ Authors

- Siphelele Zulu

## 🙏 Acknowledgments

- Material-UI for the component library
- MongoDB for the database solution
- Express.js community
- React.js community
