import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <nav className="bg-blue-700 p-4 shadow-lg">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-white text-2xl font-extrabold tracking-wide">
            Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="text-white font-semibold hover:text-gray-300 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600">
        <div className="bg-white p-12 rounded-xl shadow-2xl w-full max-w-lg text-center transform hover:scale-105 transition-all duration-300">
          <h1 className="text-4xl font-semibold text-green-600 mb-6">
            You have successfully logged in!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Welcome back! Feel free to explore the dashboard and check out all
            the awesome features.
          </p>

          <button
            onClick={() => navigate("/profile")}
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
          >
            Go to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
