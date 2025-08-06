# 🌍 Travel Log App

A full-stack Travel Log App built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Users can register, log in, and keep a personal log of their travel experiences with titles, descriptions, dates, locations, and optional image links.

---

## ✨ Features

- 🔐 User authentication (JWT-based)
- 📝 Add, view, edit, and delete travel logs
- 🗂️ Each user sees only their own logs
- 📷 Optional image URL for each log
- 📦 Fully responsive React frontend
- ⚙️ RESTful API with Express and MongoDB

---

## 🔧 Tech Stack

| Frontend       | Backend        | Database   | Auth         |
|----------------|----------------|------------|--------------|
| React, Axios   | Express.js     | MongoDB    | JWT + bcrypt |

---


---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/travel-log-app.git
cd travel-log-app
2. Backend Setup

cd backend
cp .env.example .env   # Add your MongoDB URI and JWT secret
npm install
npm run dev            # Starts server on http://localhost:5000
3. Frontend Setup

cd ../frontend
cp .env.example .env   # Set REACT_APP_API_URL=http://localhost:5000
npm install
npm start              # Opens app on http://localhost:3000
🛠 Environment Variables
.env (Backend)
env

MONGO_URI=mongodb://localhost:27017/travel_log_app
JWT_SECRET=your_jwt_secret_here
PORT=5000
.env (Frontend)
env

REACT_APP_API_URL=http://localhost:5000
🖼 Screenshots
Add screenshots here if desired.

📌 To Do / Ideas
🌐 Add map view for locations

📸 Upload actual images (Cloudinary/S3)

🌍 Make logs shareable via public links

📱 Improve mobile UX

🪪 License
MIT License. Use freely and modify as needed!

💬 Feedback
Have suggestions or feature requests? Open an issue or submit a pull request!
