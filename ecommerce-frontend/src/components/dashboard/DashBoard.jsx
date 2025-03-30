import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Header from "../../layouts/Header";
import { discount_Props_API } from "../../redux/actions/productAction";
import {} from "../../redux/constance/productType";
import { useSelector, useDispatch } from "react-redux";
import { Button, Flex, Progress, Switch } from "antd";
import GlobalButtons from "../../buttons/GlobalButtons3";

const DashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  const [globalDiscount, setGlobalDiscount] = useState("");
  const [checkedSwitch, setCheckedSwitch] = useState(false);
  const [switchLoading, setSwitchLoading] = useState(false);
  const [numberPercent, setNumberPercent] = useState(30);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // handleAddTeam();
      localStorage.setItem("globalDiscount", globalDiscount);
    }
  };

  useEffect(() => {
    if (checkedSwitch) {
      setSwitchLoading(true);
      localStorage.setItem("globalDiscount", globalDiscount);
      setTimeout(() => {
        setSwitchLoading(false);
      }, 2000);
    } else if (!checkedSwitch) {
      setSwitchLoading(true);
      localStorage.setItem("globalDiscount", 0);
      setTimeout(() => {
        setSwitchLoading(false);
      }, 2000);
    }
  }, [checkedSwitch]);

  console.log("switch checked", checkedSwitch);

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

      <div className="flex flex-wrap gap-4 items-baseline p-8">
        <div className="w-[300px]">
          <div className="asc-input-container" id="ascNewInput">
            <label className="asc-top-label labelText">Global Discount</label>
            <input
              type="number"
              // disabled
              className="asc-Normal-Input"
              placeholder="Set Discount % for your products"
              value={globalDiscount}
              onChange={(e) => {
                setGlobalDiscount(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <br />
            <span className="warningTxt ps-2">
              {/* {warning && !globalDiscount && "Please fill your phone!"} */}
            </span>
          </div>
        </div>

        <GlobalButtons.Add
          label={"Discount for Products"}
          className="hidden"
          onClick={() => {
            console.log("ascee");
            dispatch(discount_Props_API(globalDiscount, "ASC"));
          }}
        />

        <Switch
          // size="small"
          checkedChildren="Discount on"
          unCheckedChildren="Discount off"
          // defaultChecked
          loading={switchLoading}
          checked={checkedSwitch}
          disabled={!globalDiscount}
          onChange={(pre) => setCheckedSwitch(pre)}
          style={{
            backgroundColor: checkedSwitch ? "#5caf90" : "",
            // width: "80px",
          }}
        />
      </div>

      <div className="ps-7">
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
    </div>
  );
};

export default DashBoard;
