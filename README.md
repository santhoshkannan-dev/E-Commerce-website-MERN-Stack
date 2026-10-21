# E-Commerce-website-MERN-Stack

A full-stack, production-ready MERN (MongoDB, Express, React, Node.js) E-Commerce web application featuring user authentication, product catalog, categories, cart, order management, admin dashboard, and an interactive simulated payment gateway.

## Features

- **Authentication & Authorization**: JWT stored in secure HTTP-only cookies, role-based access control (User vs. Admin).
- **Product Management**: Full CRUD operations for products, categories, stock tracking, image uploads, and reviews.
- **Shopping Experience**: Filter by category and price range, search by keyword, responsive carousel, and favorites list.
- **Cart & Checkout**: Persistent cart storage, shipping address configuration, and simulated checkout flow.
- **Creative Payment Simulator**: Interactive virtual cards (Visa, Mastercard, Amex), UPI / QR code payment simulator, and express 1-click checkout.
- **Admin Dashboard**: Real-time sales metrics, order status tracking, user management, and delivery management.

## Tech Stack

- **Frontend**: React 18, Vite, Redux Toolkit (RTK Query), React Router 6, Tailwind CSS, Flowbite, React Icons, ApexCharts.
- **Backend**: Node.js, Express, Mongoose, Multer (file upload), Cookie Parser, Bcrypt.js, JSON Web Tokens.
- **Database**: MongoDB Atlas.

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/santhoshkannan-dev/E-Commerce-website-MERN-Stack.git
cd E-Commerce-website-MERN-Stack
```

### 2. Install dependencies
```bash
# Install root/backend dependencies
npm install

# Install frontend dependencies
npm install --prefix frontend
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI='your_mongodb_connection_string'
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the Application
Run both frontend and backend concurrently with a single command:
```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## License
MIT
