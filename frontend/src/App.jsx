import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard.jsx";
import Sendmoney from "./pages/Sendmoney.jsx";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./utility/ProtectedRoute.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/send"
          element={
            <ProtectedRoute>
              <Sendmoney />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
