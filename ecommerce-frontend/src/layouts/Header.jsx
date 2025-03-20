import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import "../styles/Header.css";
import ASC22 from "../assets/images/ASC22.jpg";
import moment from "moment";
import Drawer from "./Drawer";
import { Tooltip } from "antd";
import ProductsCategory from "../components/products/ProductsCategory";
import Carts from "../components/products/Carts";
import DeviceType from "../layouts/DeviceType";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  ArrowDownOutlined,
  ReloadOutlined,
  ShoppingOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  console.log("path", path);
  const deviceType = DeviceType();

  const today = new Date();
  const formatedDate = moment(today).format("DD.MMM.YYYY");
  // Get the ISO Current Weeks Number 👇
  const weekNumber = moment().isoWeek();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const dayOfMonth = today.getDate();
  const dayOfWeek = today.getDay();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const milliseconds = today.getMilliseconds();
  const timeStamp = new Date().toISOString();

  // Get the ISO Current Weeks Dates 👇
  const currentWeekStartDate = moment().startOf("week").format("DD-MM-YYYY");
  const currentWeekEndDate = moment().endOf("week").format("DD-MM-YYYY");

  console.log("dates:", formatedDate);

  // const authentication = sessionStorage.getItem("userLoginData");
  const authentication = localStorage.getItem("userLoginData");

  console.log("asc567", JSON.parse(authentication)?.FirstName);

  const [query, setQuery] = useState("");

  console.log("header props:", props);

  return (
    <div>
      {authentication ? (
        <>
          <div className="headerMainDiv px-5 pt-2">
            <div
              className={
                deviceType === "webView" || deviceType === "tabView"
                  ? "hidden"
                  : ""
              }
            >
              <Drawer />
            </div>

            <div
              className={
                deviceType === "mobileView"
                  ? "hidden"
                  : "flex flex-wrap gap-5 items-center"
              }
            >
              <p
                className={
                  path === "/products-list" ? "txtHighlighted" : "txtDacoration"
                }
                onClick={() => {
                  navigate("/products-list");
                }}
              >
                Products List
              </p>

              <p
                className={
                  path === "/add-team" ? "txtHighlighted" : "txtDacoration"
                }
                onClick={() => {
                  navigate("/add-team");
                }}
              >
                Add Team
              </p>

              <p
                className={
                  path === "/team-list" ? "txtHighlighted" : "txtDacoration"
                }
                onClick={() => {
                  navigate("/team-list");
                }}
              >
                Team list
              </p>

              <p
                className={
                  path === "/profile" ? "txtHighlighted" : "txtDacoration"
                }
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </p>
            </div>

            {/* left component start */}
            <div className="flex-gro-w">
              {/* {props.leftComponent && props.leftComponent} */}
            </div>
            {/* left component end */}

            <div className="flex-grow">
              <input
                type="text"
                autoFocus={true}
                className="commanSearchBox text-[14px] p-3"
                placeholder={props.placeholder || "Search..."}
                value={props.query}
                onChange={(e) => {
                  props.setQuery(e.target.value);
                }}
              />
            </div>

            <div className="flex flex-wrap align-middle gap-5 pt-4 ms-auto">
              <div className="txtDacoration text-muted">
                {/* <p>{moment(new Date()).format("dddd")}</p> */}
                <p className="mb-0">
                  {moment(new Date()).format("dddd-DD-MMM-YYYY")}
                </p>
                <p className="mb-0">
                  Hello Mr. {JSON.parse(authentication)?.FirstName} {""}
                  {JSON.parse(authentication)?.LastName}
                </p>
                <div>
                  <p
                    onClick={() => {
                      sessionStorage.clear();
                      localStorage.clear();
                      navigate("/");
                    }}
                    className="txtDacoration"
                  >
                    Log Out
                  </p>
                </div>
              </div>

              <img
                className="userImg"
                // src="https://image-cdn.essentiallysports.com/wp-content/uploads/Untitled-design-32-2-9.jpg?width=900"
                src={ASC22}
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-wrap-reverse justify-between pt-5 px-8">
            <div className="pt-6 lg:pt-1">
              <ProductsCategory />
            </div>
            <div className="ms-auto">
              <Carts />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-wrap justify-end gap-4 pt-4 pe-5">
          <Link
            to="/signup"
            className={path === "/signu-p" ? "withUnderLine" : "txtDacoration"}
          >
            Signup
          </Link>

          <Link
            to="/"
            className={path === "/-" ? "withUnderLine" : "txtDacoration"}
          >
            Login
          </Link>

          <div // for smooth underline.
            className="withUnderLineAnima"
            style={{
              // display: path === "/" || path === "/signup" ? "block" : "none",
              display: ["/", "/signup"].includes(path) ? "block" : "none",
              right: path === "/" ? "35px" : path === "/signup" ? "115px" : "",
              top: "60px",
              width: "75px",
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Header;
