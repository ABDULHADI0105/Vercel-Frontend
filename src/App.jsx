import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
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


export default App;