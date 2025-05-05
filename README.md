Creator Dashboard:A full-stack web application where creators can browse Reddit posts, save their favorites, and manage their profile and credits. Admins can view all users, manage posts, and oversee platform data through a dedicated dashboard.

Tech Stack

-> Frontend: React.js, Material-UI, Tailwind CSS

-> Backend: Node.js, Express.js

-> Database: MongoDB

-> API Calls: Axios

Features:

-> Browse live Reddit posts from r/all

-> Save favorite posts to your profile

-> 5 credits awarded per saved post

-> User Authentication (Register, Login)

-> Profile management with credit balance

-> Admin dashboard to view all users and their saved posts

-> Clean, responsive UI with Material-UI and Tailwind CSS

Instructions to Run Locally

-> Clone Repository

git clone https://github.com/Happy1075/Project

cd creator-dashboard

-> Install Dependencies

For server:

cd server
npm install

For client:

cd client
npm install

-> Create .env files

In server/.env

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

In client/.env

VITE_API_URL=http://localhost:5000/api

-> Run the App

Start backend

cd server
npm run dev

Start frontend

cd client
npm run dev

