import React from "react";
import { DatePicker, Space } from "antd";

const CustomDatePicker = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
      <DatePicker
        onChange={onChange}
        // showWeek
        placeholder="Select a Date"
      />
    </div>
  );
};

export default CustomDatePicker;
