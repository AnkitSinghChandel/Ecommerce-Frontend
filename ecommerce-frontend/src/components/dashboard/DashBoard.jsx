import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Header from "../../layouts/Header";
import { discount_Props_API } from "../../redux/actions/productAction";
import {} from "../../redux/constance/productType";
import { useSelector, useDispatch } from "react-redux";
import { Button, Flex, Progress, Space } from "antd";

const DashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  const [discount, setDiscount] = useState("");
  const [numberPercent, setNumberPercent] = useState(30);

  return (
    <div className="">
      <Header
        // setQuery={setQuerystring}
        leftComponent={
          <div className="leftComponentCss">
            <p className="text-[#5CAF90] font-medium text-[18px]">
              You are in DashBoard
            </p>
          </div>
        }
      />

      <input
        type="number"
        className="bg-amber-500 text-amber-50"
        value={discount}
        onChange={(e) => {
          setDiscount(e.target.value);
        }}
      />

      <button
        onClick={() => {
          console.log("ascee");
          dispatch(discount_Props_API(discount, "ASC"));
        }}
      >
        set
      </button>

      <Progress
        type="circle"
        percent={50}
        // success={{ percent: 50 }}
        success={numberPercent >= 50 ? { numberPercent } : undefined}
        // status="exception"
        trailColor={"217, 217, 225"} // only color name or RGB color format.
        // strokeColor={"red"}
        strokeWidth={12}
      />
      {/* <Progress type="circle" percent={100} format={() => "Done"} /> */}
    </div>
  );
};

export default DashBoard;
