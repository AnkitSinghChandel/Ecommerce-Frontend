import React, { useState } from "react";
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
import "../../styles/asc_Anime.css";

const Carts = () => {
  const [isOpenAccBox, setIsOpenAccBox] = useState(false);

  return (
    <div className="ascSmoot-h flex flex-wrap gap-8 font-medium">
      <div
        className="flex items-center gap-2 pointer carts relative"
        onClick={() => setIsOpenAccBox(!isOpenAccBox)}
      >
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

      <div className={isOpenAccBox ? "asc-anime-start" : "asc-anime-exit"}>
        <div className="bg-white border-gray-600 rounded-lg p-3">
          <p className="text-gray-600">Popup Content</p>
          <p className="text-gray-600">This is a sliding popup!</p>
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
