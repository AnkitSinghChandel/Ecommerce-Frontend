import React, { useState } from "react";
import "../styles/SelectBox.css";
import DownArrowOption from "..//assets/icons/DownArrowOption.svg";
import ASC22 from "../assets/images/ASC22.jpg";
import Xicon from "../assets/icons/Xicon.svg";
import searchicon from "../assets/icons/search.svg";
import box from "../assets/images/box(1).png";
import box2 from "../assets/images/box(4).png";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import NoData from "./NoData";

const SelectBox = (props) => {
  const [Ankit] = useAutoAnimate();

  // ASC BOOT DROPDOWN START.
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectBoxShow, setSelectBoxShow] = useState(false);
  const [arrowOptionsRotate, setArrowOptionsRotate] = useState(false);

  console.log("asc select box props", props);

  return (
    <>
      {props.selectBoxShow && (
        <div className="ascBootOptionDrop px-1 pb-2" style={props.style}>
          <div className="ascInputBoot px-2 mx-2">
            <img
              src={searchicon}
              className="asc_searchicon"
              alt="Search Icon"
            />
            <input
              type="text"
              autoFocus={true}
              className="ps-2 placeholder-gray-600 bootSearch w-100"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>

          <div className="ascBootOptionList py-2" id="ascScroll" ref={Ankit}>
            {props.selectOptions
              .filter((x) =>
                // x.label
                //   ?.toLowerCase()
                //   .includes(searchValue.toLowerCase()) ||
                // x.value
                //   ?.toLowerCase()
                //   .includes(searchValue.toLowerCase())

                `${x.label} ${x.value}`
                  .toLocaleLowerCase()
                  .includes(searchValue.toLowerCase())
              )
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      selectedValue === item.value
                        ? "selectedItem pointer mb-2 me-1 ps-3 p-1"
                        : "ascBootList pointer mb-2 me-1 ps-3 p-1"
                    }
                    onClick={() => {
                      setSelectedLabel(item.label);
                      setSelectedValue(item.value);
                      setSearchValue("");
                      props.setSelectBoxShow(false);
                    }}
                  >
                    <img src={ASC22} alt="" className="option-img" />
                    <span className="px-2">{item.label}</span>
                    {selectedValue === item.value && (
                      <span className="ms-auto pe-2">✔</span>
                    )}
                  </div>
                );
              })}
            {/* Display a message when no search are found */}
            <NoData
              selectOptions={props.selectOptions}
              searchValue={searchValue}
              item={searchValue}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SelectBox;
