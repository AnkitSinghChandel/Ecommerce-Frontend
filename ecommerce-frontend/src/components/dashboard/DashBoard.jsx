import React, { useState } from "react";
import Header from "../../layouts/Header";
import { Button, Flex, Progress, Space } from "antd";

const DashBoard = () => {
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
