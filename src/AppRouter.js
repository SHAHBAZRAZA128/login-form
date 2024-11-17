import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { isAuthenticated } from "./utils/auth";
import ProtectedRoute from "./routes/ProtectedRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />
          }
        />

        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
