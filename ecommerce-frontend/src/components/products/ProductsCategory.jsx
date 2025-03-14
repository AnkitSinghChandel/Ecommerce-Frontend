import React, { useState } from "react";
import "../../styles/SelectBox.css";
import DownArrowOption from "../../assets/icons/DownArrowOption.svg";
import ASC22 from "../../assets/images/ASC22.jpg";
import Xicon from "../../assets/icons/Xicon.svg";
import searchicon from "../../assets/icons/search.svg";
import box from "../../assets/images/box(1).png";
import box2 from "../../assets/images/box(4).png";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import NoData from "../../Common/NoData";
import SelectBox from "../../Common/SelectBox";

const ProductsCategory = () => {
  const [Ankit] = useAutoAnimate();

  // ASC BOOT DROPDOWN START.
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [optionsShow, setOptionsShow] = useState(false);
  const [homeHover, setHomeHover] = useState(false);
  const [arrowOptionsRotate, setArrowOptionsRotate] = useState(false);

  const selectOptions = [
    { label: "Java", value: "asc1" },
    { label: "JavaScript", value: "asc2" },
    { label: "React", value: "asc3" },
    { label: "Python", value: "asc4" },
    { label: "Node", value: "asc5" },
    { label: "MongoDB", value: "asc6" },
    { label: "SQL", value: "asc7" },
    { label: "My SQL", value: "asc8" },
  ];

  return (
    <div className="flex gap-9 pointer">
      <div>
        <div
          className="relative flex gap-3 text-[18px] font-medium items-baseline"
          onMouseEnter={() => setHomeHover(true)}
          // onMouseLeave={() => setHomeHover(false)}
        >
          <p className="text-[#4b5966] hover:text-[#5CAF90]">Home</p>
          <img alt="" src={DownArrowOption} width={14} />
        </div>

        <div onMouseLeave={() => setHomeHover(false)}>
          {homeHover && (
            <SelectBox
              selectBoxShow={homeHover}
              setSelectBoxShow={setHomeHover}
              selectOptions={selectOptions}
              // asc
              selectedLabel={selectedLabel}
              setSelectedLabel={setSelectedLabel}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              style={{ top: "165px" }}
            />
          )}
        </div>

        {optionsShow && (
          <div className="ascBootOptionDrop px-1 pb-2">
            <div className="ascInputBoot px-2 mx-2">
              <img
                src={searchicon}
                className="asc_searchicon"
                alt="Search Icon"
              />
              <input
                type="text"
                autoFocus={true}
                className="ps-2 bootSearch w-100"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </div>

            <div className="ascBootOptionList py-2" id="ascScroll" ref={Ankit}>
              {selectOptions
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
                        setHomeHover(false);
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
                selectOptions={selectOptions}
                searchValue={searchValue}
                item={searchValue}
              />
            </div>
          </div>
        )}
      </div>

      <div
        className="flex gap-3 text-[18px] font-medium items-baseline"
        onMouseEnter={() => setHomeHover(true)}
        onMouseLeave={() => setHomeHover(false)}
      >
        <p className="text-[#4b5966] hover:text-[#5CAF90]">Categories</p>
        <img alt="" src={DownArrowOption} width={14} />
      </div>

      <div
        className="flex gap-3 text-[18px] font-medium items-baseline"
        onMouseEnter={() => setHomeHover(true)}
        onMouseLeave={() => setHomeHover(false)}
      >
        <p className="text-[#4b5966] hover:text-[#5CAF90]">Products</p>
        <img alt="" src={DownArrowOption} width={14} />
      </div>

      <div
        className="flex gap-3 text-[18px] font-medium items-baseline"
        onMouseEnter={() => setHomeHover(true)}
        onMouseLeave={() => setHomeHover(false)}
      >
        <p className="text-[#4b5966] hover:text-[#5CAF90]">Blogs</p>
        <img alt="" src={DownArrowOption} width={14} />
      </div>
    </div>
  );
};

export default ProductsCategory;
