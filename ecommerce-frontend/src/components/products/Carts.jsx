import React from "react";

const Carts = () => {
  return (
    <div className="flex gap-8 text-[18px] font-medium">
      <div className="text-[#4B5966]">
        <img alt="" src="" />
        <p>Account</p>
        <p>LOGIN</p>
      </div>

      <div className="text-[#4B5966]">
        <img alt="" src="" />
        <p>Wishlist</p>
        <p>{`${4}-items`}</p>
      </div>

      <div className="text-[#4B5966]">
        <img alt="" src="" />
        <p>Cart</p>
        <p>{`${4}-items`}</p>
      </div>
    </div>
  );
};

export default Carts;
