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
  ProductOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import navIcon from "../assets/icons/logo.jpg";
import Hamburger from "hamburger-react";
import DeviceType from "../layouts/DeviceType";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const deviceType = DeviceType(); // Store device type in a variable.

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
    if (location.pathname.startsWith("/update-team/")) return "3-2";
    if (location.pathname === "/team-list") return "4";
    if (location.pathname === "/products-list") return "5";
    if (location.pathname === "/add-product") return "6-1";
    if (location.pathname.startsWith("/update-product/")) return "6-2";
    if (location.pathname.startsWith("/task")) return "7";
    if (location.pathname === "/asc-folder") return "8";
    return "";
  })();

  // Set openKeys based on the current route
  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    if (selectedKey.startsWith("3")) {
      setOpenKeys(["3"]); // Open Users submenu
    } else if (selectedKey.startsWith("6")) {
      setOpenKeys(["6"]); // Open Products submenu
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
      icon: <UnorderedListOutlined />,
      label: "Products List",
      onClick: () => navigate("/products-list"),
    },

    {
      key: "6",
      icon: <ProductOutlined />,
      label: "Products",
      children: [
        {
          key: "6-1",
          icon: <UsergroupAddOutlined />,
          label: "Add Product",
          onClick: () => navigate("/add-product"),
        },
        {
          key: "6-2",
          icon: <UserSwitchOutlined />,
          label: "Update Product",
          onClick: () => navigate("/update-product/:id"),
        },
      ],
    },

    {
      key: "7",
      icon: <FolderOpenTwoTone />,
      label: "Tasks",
      onClick: () => navigate("/task"),
    },

    {
      key: "8",
      icon: <FolderOpenTwoTone />,
      label: "ASC-FOLDER",
      onClick: () => navigate("/asc-folder"),
    },
  ];

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          flex: "none",
          background: "#F2F2F2",
          display:
            deviceType === "mobileView" || deviceType === "tabView"
              ? "none"
              : "block",
        }}
      >
        <Sider
          id="asc_Sidebar"
          width={200}
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="p-2"
          style={{
            background: "#F2F2F2",
            position: "sticky",
            top: "-1px",
            maxHeight: "100vh",
            overflow: "auto",
          }}
        >
          <div className="logo p-4 text-center">
            <div className="">
              <h5
                className="text-[18px] text-[#5caf90] font-bold"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Grabit
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
