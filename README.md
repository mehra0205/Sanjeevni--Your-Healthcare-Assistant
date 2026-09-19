# Sanjeevni — Healthcare Assistance Platform

A beginner-to-intermediate MERN stack portfolio project.

## Tech stack
- Frontend: React.js, JavaScript, HTML, CSS
- Backend: Node.js, Express.js
- Database: MongoDB + Mongoose
- Authentication: JWT + bcrypt
- File upload: Multer
- API testing: Postman
- Deployment: Vercel (frontend) + Render/Railway (backend) + MongoDB Atlas

## Features
- Patient registration and login
- Patient self check-in
- Doctor directory and availability
- Appointment booking
- Ambulance requests
- Blood bank requests
- Digital medical records
- Simple role-based admin dashboard
- Responsive, human-made style UI

## Run locally

### 1. Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Set these values in `.env`:
- MONGO_URI=your MongoDB Atlas connection string
- JWT_SECRET=any-long-random-secret
- CLIENT_URL=http://localhost:5173

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## Demo accounts
After running the backend seed:
- Admin: admin@sanjeevni.com / Admin@123
- Doctor: doctor@sanjeevni.com / Doctor@123
- Patient: patient@sanjeevni.com / Patient@123

Run:
```bash
cd backend
npm run seed
```

## Deployment

### Backend
Deploy the `backend` folder to Render/Railway.
Build command: `npm install`
Start command: `npm start`

Environment variables:
- MONGO_URI
- JWT_SECRET
- CLIENT_URL

### Frontend
Deploy the `frontend` folder to Vercel.
Environment variable:
- VITE_API_URL=https://YOUR-BACKEND-URL/api

This project intentionally avoids over-engineered patterns. It uses straightforward controllers, routes, models and React components so a fresher can understand and explain the code in an interview.
