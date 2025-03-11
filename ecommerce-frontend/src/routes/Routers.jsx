import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import PrivateComponent from "./PrivateComponent";
import PageNotFound from "../errors/PageNotFound";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Profile from "../auth/Profile";
import DashBoard from "../components/dashboard/DashBoard";
import LayoutWithSidebar from "../layouts/LayoutWithSidebar";

const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route element={<LayoutWithSidebar />}>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/profile" element={<Profile />} />
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
