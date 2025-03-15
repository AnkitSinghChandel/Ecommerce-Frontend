import React from "react";
import box from "../assets/images/box(1).png";
import box2 from "../assets/images/box(4).png";

const NoData = (props) => {
  console.log("asc44", props);

  return (
    <div>
      {props.selectOptions.length > 0 &&
        props.selectOptions.filter((x) =>
          `${x.label} ${x.value}`
            .toLocaleLowerCase()
            .includes(props.searchValue.toLowerCase())
        ).length === 0 && (
          <div className="font-normal text-center">
            No data found!
            <br />
            <img src={box2} width={45} alt="" className="m-auto" />
          </div>
        )}

      {/* Display a message when no data to display */}
      {props.selectOptions.length === 0 && (
        <div className="font-normal text-center">
          No data to display!
          <br />
          <img src={box} width={45} alt="" className="m-auto" />
        </div>
      )}
    </div>
  );
};

export default NoData;
