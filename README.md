# User Dashboard Frontend

## 1. Project Overview
This project is the **User Dashboard Frontend**, which provides the user interface for:
- User authentication
- Profile management
- Dashboard features

**Tech Stack:** React.js (Vite), React Router, Axios, Tailwind CSS (if used)

---

## 2. Installation Steps
1. Clone the repository  
   git clone https://github.com/vishalpatel987/user-frontend.git  
   cd user-frontend  

2. Install dependencies  
   npm install  

---

## 3. Environment Configuration
Create a `.env` file in the **frontend root folder** and add the following variable:

VITE_API_URL=http://localhost:5000/api

- Replace `http://localhost:5000/api` with your backend API URL (local or deployed).  
- Make sure `.env` is added to `.gitignore` so it doesn’t get pushed to GitHub.  

---

## 4. Running the Application
- Development Mode:  
  npm run dev  
  Runs the app on: http://localhost:5173 (with hot reload)  

- Production Build:  
  npm run build  
  npm run preview  
  Builds optimized production files and serves them locally.  


