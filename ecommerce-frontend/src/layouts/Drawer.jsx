import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Drawer, Button } from "antd";
import "../styles/Drawer.css";
import DeviceType from "../layouts/DeviceType";
import Hamburger from "hamburger-react";

const MyDrawer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  console.log("path", path);

  const [open, setOpen] = useState(false);

  return (
    <div className={DeviceType() === "mobileview" ? "" : "d-non-e"}>
      <Hamburger toggled={open} toggle={setOpen} />

      <Drawer
        title={
          <div className="drawer-title d-flex gap-4 align-items-center">
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
        mask={false}
        onClose={() => setOpen(false)}
        open={open}
        className="custom-drawer"
        classNames={{
          header: "custom-header",
          body: "custom-body",
          footer: "custom-footer",
        }}
      >
        <div className="pointer">
          <p
            className={path === "/team-list" ? "txtHighlighted" : "optionText"}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            DashBoard
          </p>

          <p
            className={path === "/profile" ? "txtHighlighted" : "optionText"}
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </p>

          <p
            className={path === "/add-team" ? "txtHighlighted" : "optionText"}
            onClick={() => {
              navigate("/add-team");
            }}
          >
            Add Team
          </p>

          <p
            className={path === "/team-list" ? "txtHighlighted" : "optionText"}
            onClick={() => {
              navigate("/team-list");
            }}
          >
            Team List
          </p>

          <p
            className={path === "/DragDrop" ? "txtHighlighted" : "optionText"}
            onClick={() => {
              navigate("/DragDrop");
            }}
          >
            DragDrop
          </p>

          <p
            className={path === "/DragDrop2" ? "txtHighlighted" : "optionText"}
            onClick={() => {
              navigate("/DragDrop2");
            }}
          >
            DragDrop2
          </p>

          <p
            className={path === "/list" ? "txtHighlighted" : "optionText"}
            onClick={() => {
              navigate("/list");
            }}
          >
            Js PDF List
          </p>

          <p
            className={
              path === "/PushedOnCheck" ? "txtHighlighted" : "optionText"
            }
            onClick={() => {
              navigate("/PushedOnCheck");
            }}
          >
            Check-Uncheck
          </p>

          <p
            className={path === "/MyTodoTask" ? "txtHighlighted" : "optionText"}
            onClick={() => {
              navigate("/MyTodoTask");
            }}
          >
            MyTodoTask
          </p>

          <p
            className={
              path === "/MyTodoTask2" ? "txtHighlighted" : "optionText"
            }
            onClick={() => {
              navigate("/MyTodoTask2");
            }}
          >
            MyTodoTask2
          </p>

          <p
            className={
              path === "/MyTodoTask3" ? "txtHighlighted" : "optionText"
            }
            onClick={() => {
              navigate("/MyTodoTask3");
            }}
          >
            MyTodoTask3
          </p>

          <p
            className={path === "/SelectBox" ? "txtHighlighted" : "optionText"}
            onClick={() => {
              navigate("/SelectBox");
            }}
          >
            SelectBox
          </p>

          <p
            className={path === "/SelectBox2" ? "txtHighlighted" : "optionText"}
            onClick={() => {
              navigate("/SelectBox2");
            }}
          >
            SelectBox2
          </p>

          <p
            className={path === "/asctesting" ? "txtHighlighted" : "optionText"}
            onClick={() => {
              navigate("/asctesting");
            }}
          >
            asctesting
          </p>
        </div>
      </Drawer>
    </div>
  );
};

export default MyDrawer;
