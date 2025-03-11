import React from "react";
import { Navigate, Outlet } from "react-router";

const PrivateComponent = () => {
  // const authentication = sessionStorage.getItem("userLoginData");
  const authentication = localStorage.getItem("userLoginData");

  return authentication ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateComponent;
