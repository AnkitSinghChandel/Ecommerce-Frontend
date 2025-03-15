import React from "react";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  ArrowDownOutlined,
  ReloadOutlined,
  ShoppingOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "../../styles/cart.css";

const Carts = () => {
  return (
    <div className="ascSmooth flex gap-8 font-medium">
      <div className="flex items-center gap-2 pointer carts">
        {/* <img alt="" src="" /> */}
        <UserOutlined
          className="carts-icons"
          // style={{ fontSize: "25px" }}
        />
        <div>
          <p className="carts-main-label">Account</p>
          <p className="carts-label">LOGIN</p>
        </div>
      </div>

      <div className="flex items-center gap-2 pointer carts">
        {/* <img alt="" src="" /> */}
        <HeartOutlined className="carts-icons" />
        <div>
          <p className="carts-main-label">Wishlist</p>
          <p className="carts-label">{`${4}-items`}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 pointer carts">
        {/* <img alt="" src="" /> */}
        <ShoppingCartOutlined className="carts-icons" />
        <div>
          <p className="carts-main-label">Cart</p>
          <p className="carts-label">{`${4}-items`}</p>
        </div>
      </div>
    </div>
  );
};

export default Carts;
