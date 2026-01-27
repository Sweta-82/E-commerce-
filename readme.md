# 🛒 BuyNest — MERN Stack E-Commerce Platform

BuyNest is a **production-ready, full-stack E-commerce web application** built using the MERN stack.  
It implements **role-based access (User, Admin, Super Admin)**, secure payment processing, scalable product management, and a modern, optimized UI.

🔗 **Live Project:** https://buynest-8pji.onrender.com

---

## 📌 Key Highlights
- Complete **authentication & authorization** system
- **Role-based dashboards** (User / Admin / Super Admin)
- Secure payments using **Razorpay**
- Cloud-based image storage with **Cloudinary**
- Optimized frontend using **Vite + Redux Toolkit**
- Deployed and tested in **production on Render**

---

## ✨ Features

### 👤 User Features
- User Registration, Login & Logout
- Forgot / Reset Password via Email
- Update Profile & Avatar
- Product Search, Filtering & Pagination
- Add to Cart & Place Orders
- Secure Checkout with Razorpay

### 🛠️ Admin Features
- Create, Update & Delete Products
- Manage Users and Orders
- Update Order Status
- Upload Product Images (Cloudinary)

### 🛡️ Super Admin Features
- Full platform access
- Admin role management
- System-level control

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Services & Tools
- Razorpay (Payments)
- Cloudinary (Image Storage)
- Nodemailer (Email Service)
- JWT Authentication
- Render (Deployment)

---

## ⚙️ Environment Variables

Create a `config.env` file inside `backend/config/`:

```env
PORT=8000
DB_URL=your_mongodb_connection_string
FRONTEND_URL=https://buynest-8pji.onrender.com

JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRE=5d
EXPIRE_COOKIE=5

SMTP_SERVICE=gmail
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

CLOUDINARY_NAME=your_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

RAZORPAY_API_KEY=your_razorpay_key
RAZORPAY_API_SECRET=your_razorpay_secret
```


## 📦 Installation & Local Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Sweta-82/E-commerce-.git
cd E-commerce-
```

### 2️⃣ Install Dependencies
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```
### 3️⃣ Run the Application
```bash
npm run dev
Frontend: http://localhost:5173
Backend: http://localhost:8000
```

### 🚀 Deployment (Render)

Platform: Render
Build Command: npm run build
Start Command: npm start
Root Directory: Leave empty

### 📈 Future Enhancements
Wishlist functionality
Product reviews & ratings
Order invoice generation (PDF)
Admin analytics dashboard
Redis-based caching

### 👩‍💻 Author
Sweta Kumari
Full-Stack MERN Developer
GitHub: https://github.com/Sweta-82

### 📜 License

This project is licensed for educational and portfolio use.