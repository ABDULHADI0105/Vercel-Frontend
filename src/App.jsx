import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
<<<<<<< HEAD
import CowDetailsPage from "./pages/CowDetailsPage";

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

      </Routes>
    </BrowserRouter>
  );
}

=======
import AdminDashboard from "./Admin/pages/AdminDashboard";

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


        {/* Admin Panel */}
        <Route 
          path="/admin/dashboard" 
          element={<AdminDashboard />} 
        />


      </Routes>


    </BrowserRouter>

  );

}


>>>>>>> 033f3c4238dc02e0f7de9daa944966956a096e02
export default App;