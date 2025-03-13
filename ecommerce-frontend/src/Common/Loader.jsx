import React from "react";
import { Spin } from "antd";
import { colors } from "@mui/material";

const Loader = (props) => {
  console.log("asc loader props", props);

  const contentStyle = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };

  // const content = <div style={contentStyle} />;
  const content = <div />;

  return (
    <div>
      {/* <style>
        {`
          .custom-spin .ant-spin-dot i {
            background-color: red !important;
          }
        `}
      </style> */}

      {/* <Spin size="small" /> */}

      <Spin tip="Loading" size="small" wrapperClassName="hidden">
        {content}
        {/* {"Ankit Singh Chandel"} */}
      </Spin>

      <Spin
        tip={props.tip}
        size={props.size}
        // wrapperClassName="custom-spin" // to change spin color.
        wrapperClassName={props.className}
      >
        {content}
        {/* {props.content} */}
      </Spin>
    </div>
  );
};

export default Loader;
