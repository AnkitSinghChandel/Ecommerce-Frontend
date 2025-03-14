import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import PrivateComponent from "./PrivateComponent";
import PageNotFound from "../errors/PageNotFound";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import DashBoard from "../components/dashboard/DashBoard";
import LayoutWithSidebar from "../layouts/LayoutWithSidebar";
import Profile from "../auth/Profile";
import ProductsList from "../components/products/ProductsList";

const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route element={<LayoutWithSidebar />}>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products-list" element={<ProductsList />} />
            </Route>
          </Route>

          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routers;
