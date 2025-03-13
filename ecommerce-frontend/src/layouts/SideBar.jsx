import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import "../styles/SideBar.css";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SearchOutlined,
  SettingOutlined,
  HomeOutlined,
  FilePdfOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
  DashboardOutlined,
  CheckCircleOutlined,
  FolderOpenTwoTone,
} from "@ant-design/icons";
import navIcon from "../assets/icons/logo.jpg";
import Hamburger from "hamburger-react";
import DeviceType from "../layouts/DeviceType";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Determine selected menu item based on path
  const selectedKey = (() => {
    if (location.pathname === "/dashboard") return "1";
    if (location.pathname === "/profile") return "2";
    if (location.pathname === "/add-team") return "3-1";
    if (location.pathname.startsWith("/add-update-team/")) return "3-2";
    if (location.pathname === "/team-list") return "4";
    if (location.pathname === "/products-list") return "5";
    if (location.pathname === "/DragDrop2") return "6";
    if (location.pathname === "/list") return "7";
    if (location.pathname === "/PushedOnCheck") return "8";
    if (location.pathname === "/MyTodoTask") return "9";
    if (location.pathname === "/MyTodoTask2") return "10";
    if (location.pathname === "/MyTodoTask3") return "11";
    if (location.pathname === "/SelectBox") return "12";
    if (location.pathname === "/SelectBox2") return "13";
    return "";
  })();

  // Set openKeys based on the current route
  const [openKeys, setOpenKeys] = useState([]);
  useEffect(() => {
    if (selectedKey.startsWith("3")) {
      setOpenKeys(["3"]); // Open Users submenu if any user-related route is active
    } else {
      setOpenKeys([]); // Close all other submenus
    }
  }, [selectedKey]);

  // menu items below👇
  const menuItems = [
    // {
    //   key: "1",
    //   icon: (
    //     <img src={navIcon} alt="" width={25} style={{ borderRadius: "50%" }} />
    //   ),
    //   // label: "DashBoard",
    //   label: (
    //     <span
    //       style={{ fontWeight: "bold", color: "#1890ff", fontSize: "16px" }}
    //     >
    //       DashBoard
    //     </span>
    //   ),
    //   className: "custom-class",
    //   onClick: () => navigate("/dashboard"),
    // },

    {
      key: "1",
      icon: <DashboardOutlined />,
      // label: "DashBoard",
      label: "DashBoard",
      className: "custom-class",
      onClick: () => navigate("/dashboard"),
    },

    {
      key: "2",
      icon: <HomeOutlined />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },

    {
      key: "3",
      icon: <UserOutlined />,
      label: "My Teams",
      children: [
        {
          key: "3-1",
          icon: <UsergroupAddOutlined />,
          label: "Add Team",
          onClick: () => navigate("/add-team"),
        },
        {
          key: "3-2",
          icon: <UserSwitchOutlined />,
          label: "Update Team",
          onClick: () => navigate("/add-update-team/:id"),
        },
      ],
    },

    {
      key: "4",
      icon: <TeamOutlined />,
      label: "Team list",
      onClick: () => navigate("/team-list"),
    },

    {
      key: "5",
      icon: <HomeOutlined />,
      label: "Products List",
      onClick: () => navigate("/products-list"),
    },

    {
      key: "6",
      icon: <HomeOutlined />,
      label: "DragDrop2",
      onClick: () => navigate("/DragDrop2"),
    },

    {
      key: "7",
      icon: <FilePdfOutlined />,
      label: "Js PDF List",
      onClick: () => navigate("/list"),
    },
    {
      key: "8",
      icon: <CheckCircleOutlined />,
      label: "Check-Uncheck",
      onClick: () => navigate("/PushedOnCheck"),
    },
    {
      key: "9",
      icon: <FolderOpenTwoTone />,
      label: "MyTodoTask",
      onClick: () => navigate("/MyTodoTask"),
    },
    {
      key: "10",
      icon: <FolderOpenTwoTone />,
      label: "MyTodoTask2",
      onClick: () => navigate("/MyTodoTask2"),
    },
    {
      key: "11",
      icon: <FolderOpenTwoTone />,
      label: "MyTodoTask3",
      onClick: () => navigate("/MyTodoTask3"),
    },
    {
      key: "12",
      icon: <HomeOutlined />,
      label: "SelectBox",
      onClick: () => navigate("/SelectBox"),
    },
    {
      key: "13",
      icon: <HomeOutlined />,
      label: "SelectBox2",
      onClick: () => navigate("/SelectBox2"),
    },
  ];

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          flex: "none",
          display: DeviceType() === "mobileview" ? "none" : "",
        }}
      >
        <Sider
          id="asc_Sidebar"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: "#F2F2F2",
            position: "sticky",
            top: "-1px",
            maxHeight: "100vh",
            overflow: "auto",
          }}
        >
          <div
            className="logo"
            style={{ padding: "16px", textAlign: "center" }}
          >
            <div className="">
              <h5
                className="text-2xl text-emerald-500 font-bold"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                ASC
              </h5>

              <h4>
                {/* {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} */}
              </h4>
            </div>

            <div
              onClick={() => {
                toggleCollapse();
              }}
            >
              <div className="flex justify-center pointer">
                <Hamburger toggled={isOpen} toggle={setOpen} color="#5CAF90" />
              </div>
            </div>
          </div>

          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedKey]}
            openKeys={openKeys}
            onOpenChange={(keys) => setOpenKeys(keys)}
            style={{ background: "#F2F2F2", border: "none" }}
            items={menuItems}
          />
        </Sider>
      </Layout>
    </>
  );
};

export default SideBar;
