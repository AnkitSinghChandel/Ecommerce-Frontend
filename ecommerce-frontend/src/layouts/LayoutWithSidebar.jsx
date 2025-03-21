import React from "react";
import { Outlet } from "react-router";
import SideBar from "./SideBar";

const LayoutWithSidebar = () => {
  return (
    <div style={{ display: "flex", gap: "1-0px" }}>
      <SideBar /> {/* Sidebar on the left */}
      <div style={{ flex: 1, overflowX: "auto", padding: "20px" }}>
        <Outlet /> {/* Renders the nested routes */}
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
