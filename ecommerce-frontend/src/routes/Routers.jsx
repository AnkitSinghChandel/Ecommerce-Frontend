import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import PrivateComponent from "./PrivateComponent";
import PageNotFound from "../errors/PageNotFound";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import DashBoard from "../components/dashboard/DashBoard";
import LayoutWithSidebar from "../layouts/LayoutWithSidebar";
import Profile from "../auth/Profile";
import AddTeam from "../components/teams/AddTeam";
import AddUpdateTeam from "../components/teams/AddUpdateTeam";
import TeamList from "../components/teams/TeamList";
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
              {/* <Route path="/add-team" element={<AddTeam />} /> */}
              {/* <Route path="/add-team/:id" element={<AddTeam />} /> */}
              <Route path="/add-team/" element={<AddUpdateTeam />} />
              <Route path="/add-team/:id" element={<AddUpdateTeam />} />
              <Route path="/team-list" element={<TeamList />} />
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
