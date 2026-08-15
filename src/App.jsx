import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CowDetailsPage from "./pages/CowDetailsPage";
import Contact from "./pages/Contact";


// Admin Pages
import AdminLayout from "./Admin/components/AdminLayout";
import AdminDashboard from "./Admin/pages/AdminDashboard";
import AddCow from "./Admin/pages/AddCow";
import AllCows from "./Admin/pages/AllCows";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* User Home Page */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Cow Details Page */}
        <Route 
          path="/cow-details/:id" 
          element={<CowDetailsPage />} 
        />

        {/* ================= Admin Panel ================= */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="add-cow"
            element={<AddCow />}
          />

          <Route
            path="all-cows"
            element={<AllCows />}
          />

        </Route>

        <Route path="/contact" element={<Contact />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;