import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";


import Login from "./components/login/login";
import Dashboard from "./components/dashboard/Dashboard";
AuthProvider;

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Wrap your Routes with Router */}
        <Routes>
          {/* Define the routes for your app */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
