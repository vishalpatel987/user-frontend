
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  // ✅ Hide Navbar links on Login, Register, ForgotPassword, ResetPassword pages
  const hideLinks =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname.startsWith("/reset-password");

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">User Dashboard</div>
      {!hideLinks && (
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link to="/" className="hover:text-blue-500">Profile</Link>
              {user.role === "admin" && (
                <Link to="/admin-dashboard" className="hover:text-blue-500">Admin</Link>
              )}
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-500">Login</Link>
              <Link to="/register" className="hover:text-blue-500">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
