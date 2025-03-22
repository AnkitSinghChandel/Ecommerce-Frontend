import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "../../styles/ProductsList.css";
import Header from "../../layouts/Header";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Flex, Rate } from "antd";
import NoData from "../../common/NoData";
import Loader from "../../common/Loader";
import { useDispatch } from "react-redux";

const ProductItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  return (
    <div>
      <Header
        // setQuery={setQuerystring}
        placeholder={"You are in selected product item..."}
        leftComponent={
          <div className="leftComponentCss">
            <p className="text-[#5CAF90] font-medium text-[18px]">
              {/* You are in Products List */}
            </p>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-15 px-5">
        <div className="w-[350px] h-[350px] border-[1px_solid_red]">
          <img
            className="rounded-2xl"
            src="https://images.unsplash.com/photo-1521220509776-3df02465ccad?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8NDExNzAyfHxlbnwwfHx8fHw%3D"
            alt=""
          />
        </div>

        <div>
          <div>
            <p className="text-[#4b5966] text-[16px]">
              Dyazo 14.1 Inch Laptop Sleeve Case Cover With Handle And Two Front
              Pocket Compatible For Lenovo, Hp, Dell, Asus Acer & Other
              Notebooks (Grey)
            </p>

            <p className="bg-[#5caf90] text-[white] text-[16px] rounded-lg ps-4 w-[200px] my-3">
              Amazon's choice
            </p>

            <p className="text-2xl">-70% ₹299</p>
            <p className="text-[14px] text-[#4b5966] ps-4">{`M.R.P : ${999}`}</p>

            <p className="bg-[#5caf90] text-[white] text-[16px] rounded-lg ps-4 w-[200px] my-3 pointer">
              Add to cart
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
