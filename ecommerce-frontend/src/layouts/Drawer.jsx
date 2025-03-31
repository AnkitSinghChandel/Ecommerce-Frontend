import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Drawer, Button } from "antd";
import "../styles/Drawer.css";
import DeviceType from "../layouts/DeviceType";
import Hamburger from "hamburger-react";
import { Tooltip } from "antd";

const MyDrawer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  console.log("path", path);
  const deviceType = DeviceType();

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Hamburger toggled={open} toggle={setOpen} />

      <Drawer
        title={
          <div className="drawer-title flex gap-4 items-center">
            <span>Ankit Singh</span>
            <span>
              <Hamburger toggled={open} toggle={setOpen} size={30} />
            </span>
          </div>
        }
        width={250}
        closeIcon={null} // Removes default close button.
        // placement="right"
        placement="left"
        // mask={false}
        onClose={() => setOpen(false)}
        open={open}
        classNames={{
          header: "custom-header",
          body: "custom-body",
          footer: "custom-footer",
        }}
        className="custom-drawer"
      >
        <div className="pointer">
          <p
            className={
              path === "/dashboard" ? "drawer-txtHighlighted" : "optionText"
            }
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            DashBoard
          </p>

          <p
            className={
              path === "/profile" ? "drawer-txtHighlighted" : "optionText"
            }
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </p>

          <p
            className={
              path === "/add-team" ? "drawer-txtHighlighted" : "optionText"
            }
            onClick={() => {
              navigate("/add-team");
            }}
          >
            Add Team
          </p>

          <p
            className={
              path === "/team-list" ? "drawer-txtHighlighted" : "optionText"
            }
            onClick={() => {
              navigate("/team-list");
            }}
          >
            Team List
          </p>

          <p
            className={
              path === "/products-list" ? "drawer-txtHighlighted" : "optionText"
            }
            onClick={() => {
              navigate("/products-list");
            }}
          >
            Products List
          </p>

          <p
            className={
              path === "/task" ? "drawer-txtHighlighted" : "optionText"
            }
            onClick={() => {
              navigate("/task");
            }}
          >
            Task
          </p>

          <p
            className={
              path === "/demo" ? "drawer-txtHighlighted" : "optionText"
            }
            onClick={() => {
              navigate("/demo");
            }}
          >
            Js PDF List
          </p>
        </div>
      </Drawer>
    </div>
  );
};

export default MyDrawer;
