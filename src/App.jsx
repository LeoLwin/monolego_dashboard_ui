import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <Router>
      {/* Wrap your Routes with Router */}
      <Routes>
        {/* Define the routes for your app */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
