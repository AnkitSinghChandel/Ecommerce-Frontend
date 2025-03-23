import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "../../styles/ProductsList.css";
import Header from "../../layouts/Header";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Flex, Rate } from "antd";
import {
  UserOutlined,
  ArrowLeftOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import NoData from "../../common/NoData";
import Loader from "../../common/Loader";
import { useDispatch } from "react-redux";
import GlobalButtons from "../../buttons/GlobalButtons3";

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-15 px-5">
        <div className="">
          <img
            className="rounded-2xl object-cover"
            src="https://cdn.pixabay.com/photo/2022/07/15/18/15/burgers-7323689_640.jpg"
            alt=""
          />
        </div>

        <div className="pt-2">
          <p className="text-[#4b5966] text-[18px]">
            Dyazo 14.1 Inch Laptop Sleeve Case Cover With Handle And Two Front
            Pocket Compatible For Lenovo, Hp, Dell, Asus Acer & Other Notebooks
            (Grey)
          </p>

          <p className="bg-[#5caf90] text-[white] text-[16px] rounded-lg ps-4 w-[150px] max-w-full my-3 p-1">
            Amazon's choice
          </p>

          <p className="text-2xl">-70% ₹299</p>
          <p className="text-[14px] text-[#4b5966] ps-4">{`M.R.P : ${999}`}</p>

          <p className="bg-[#5caf90] text-[white] text-[16px] rounded-lg ps-4 w-[150px] max-w-full my-3 p-1 pointer">
            <span className="ps-1">
              <ShoppingCartOutlined />
            </span>
            <span className="ps-3">Add to cart</span>
          </p>

          <p
            className="bg-[#5caf90] text-[white] text-[16px] rounded-lg ps-4 w-[150px] max-w-full my-3 p-1 pointer"
            onClick={() => {
              // history.goBack();
              navigate(-1);
            }}
          >
            <span className="ps-1">
              <ArrowLeftOutlined />
            </span>
            <span className="ps-3">Go Back</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
