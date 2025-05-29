// src/App.jsx
import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import { Pages } from "./constants/sidebarPages";
import { useState } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import Category from "./pages/category/Category";
import Product from "./pages/product/Product";
import Login from "./pages/auth/Login";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { AuthStore } from "./stores/auth.store";
import GetOneCategory from "./pages/category/getOneCategory/GetOneCategory";
import Brand from "./pages/brand/Brand";
import Variants from "./pages/variant/Variants";
import GetOneFilter from "./pages/variant/getOneFilter/GetOneFilter";
import Coupons from "./pages/coupons/Coupons";
import Profile from "./pages/profile/Profile";
import Poster from "./pages/poster/Poster";

function App() {
  const [pageName, setPageName] = useState("Asosiy panel");
  const { fetchAdminInfo, admin } = AuthStore();

  useEffect(() => {
    fetchAdminInfo();
  }, [fetchAdminInfo]);

  return (
    <>
      {admin ? (
        <div className="app">
          <Sidebar setPageName={setPageName} />
          <div className="main-content">
            <Header pageName={pageName} />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/category" element={<Category />} />
              <Route path="/brands" element={<Brand />} />
              <Route path="/variants" element={<Variants />} />
              <Route path="/products" element={<Product />} />
              <Route path="/orders" element={<Dashboard />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/poster" element={<Poster />} />
              <Route path="/notifications" element={<Dashboard />} />

              {/* OTHER PAGES */}
              <Route path="/getOneCategory/:id" element={<GetOneCategory />} />
              <Route path="/getOneFilter/:id" element={<GetOneFilter />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Login />
      )}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
        }}
      />
    </>
  );
}

export default App;
