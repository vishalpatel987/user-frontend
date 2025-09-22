

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Profile from "./pages/Profile";
// import AdminDashboard from "./pages/AdminDashboard";
// import PrivateRoute from "./utils/PrivateRoute";
// import { Toaster } from "react-hot-toast";
// import Navbar from "./components/Navbar";
// import VerifyEmail from "./components/VerifyEmail"; // ✅ import verification page

// function App() {
//   return (
//     <AuthProvider>
//       <Toaster />
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           <Route
//             path="/"
//             element={
//               <PrivateRoute>
//                 <Profile />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/admin-dashboard"
//             element={
//               <PrivateRoute adminOnly={true}>
//                 <AdminDashboard />
//               </PrivateRoute>
//             }
//           />

//           {/* ✅ Email verification route */}
//           <Route path="/verify/:token" element={<VerifyEmail />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./utils/PrivateRoute";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import VerifyEmail from "./components/VerifyEmail"; 
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute adminOnly={true}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* Email Verification */}
          <Route path="/verify/:token" element={<VerifyEmail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
