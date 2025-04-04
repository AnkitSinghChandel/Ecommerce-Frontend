import React, { useState, useEffect, useRef } from "react";
import "../styles/SelectBox.css";
import useClickOutside from "../hooks/useClickOutside";
import { motion, AnimatePresence } from "motion/react";
import moment from "moment";
import DownArrowOption from "../assets/icons/DownArrowOption.svg";
import ASC22 from "../assets/images/ASC22.jpg";
import Xicon from "../assets/icons/Xicon.svg";
import searchicon from "../assets/icons/search.svg";
import box from "../assets/images/box(1).png";
import box2 from "../assets/images/box(3).png";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import NoData from "../common/NoData";

const SelectBox = () => {
  // const selectBoxPopupRef = useRef(null);
  const [Ankit] = useAutoAnimate();

  // ASC BOOT DROPDOWN START.
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectBoxShow, setSelectBoxShow] = useState(false);
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

  const selectOptions2 = [
    { firstName: "Ankit", lastName: "Singh", value: "asc1" },
    { firstName: "Ashu", lastName: "Goel", value: "asc2" },
    { firstName: "Shalini", lastName: "Rajput", value: "asc3" },
    { firstName: "Prajwal", lastName: "Bhoyar", value: "asc4" },
    { firstName: "Riya", lastName: "Tyagi", value: "asc5" },
    { firstName: "Ritika", lastName: "Tyagi", value: "asc6" },
    { firstName: "Sarthak", lastName: "Tyagi", value: "asc7" },
    { firstName: "Paras", lastName: "Sanghani", value: "asc8" },
  ];
  // ASC BOOT DROPDOWN END.

  // ASC close dropDown dlick dutside start
  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (
  //       selectBoxPopupRef.current &&
  //       !selectBoxPopupRef.current.contains(e.target)
  //     ) {
  //       // setSupplierDataShow(false);
  //       // setArrowOptionsRotate(false);
  //     }
  //     // if (
  //     //   filterPopupRef.current &&
  //     //   !filterPopupRef.current.contains(e.target)
  //     // ) {
  //     //   setFiltersPopupShow(false);
  //     // }
  //   };

  //   document.addEventListener("click", handleClickOutside, false);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside, false);
  //   };
  // }, []);
  // ASC close dropDown dlick dutside end

  // Call the custom hook to handle click outside 👇
  // useClickOutside(selectBoxPopupRef, () => {
  //   setSelectBoxShow(false);
  //   setArrowOptionsRotate(false);
  // });

  return (
    <search-Box-Section>
      {/* ASC SELECT BOX START */}
      <div className="p-5" ref={Ankit}>
        <div
          id="ascTeamSelectBox"
          className="ascInputDiv px-3 flex"
          onClick={() => {
            setSelectBoxShow(!selectBoxShow);
            setArrowOptionsRotate(!arrowOptionsRotate);
          }}
        >
          <p className="mb-0 selectedInput">{selectedLabel || "Select..."}</p>

          {selectedLabel ? (
            <img
              src={Xicon}
              className="xicon pointer"
              alt=""
              onClick={() => {
                setSelectedLabel("");
                setSelectedValue("");
              }}
            />
          ) : (
            <img
              src={DownArrowOption}
              className={arrowOptionsRotate ? "upArrow" : "downArrow"}
              alt=""
              onClick={() => {
                // setSelectBoxShow(!selectBoxShow);
                // setArrowOptionsRotate(!arrowOptionsRotate);
              }}
            />
          )}
        </div>

        <AnimatePresence>
          {selectBoxShow && (
            <motion.div
              // initial={{ translateY: -50, opacity: 0 }}
              // animate={{
              //   translateY: 0,
              //   opacity: 1,
              //   transition: {
              //     duration: 0.3,
              //   },
              // }}
              // exit={{
              //   translateY: -50,
              //   opacity: 0,
              //   transition: {
              //     duration: 0.3,
              //   },
              // }}
              className="ascSelectBox px-1 pb-2"
            >
              <div className="selectBoxInput px-2 mx-2">
                <img
                  src={searchicon}
                  className="ascSearchicon"
                  alt="Search Icon"
                />
                <input
                  type="text"
                  autoFocus={true}
                  className="ps-2 ascSearchInput w-full"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                />
              </div>

              <div className="selectBoxOptions py-2" id="ascScroll" ref={Ankit}>
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
                            : "optionsItem pointer mb-2 me-1 ps-3 p-1"
                        }
                        onClick={() => {
                          setSelectedLabel(item.label);
                          setSelectedValue(item.value);
                          setSearchValue("");
                          setSelectBoxShow(false);
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
                {selectOptions.length > 0 &&
                  selectOptions.filter((x) =>
                    `${x.label} ${x.value}`
                      .toLocaleLowerCase()
                      .includes(searchValue.toLowerCase())
                  ).length === 0 && (
                    <div className="text-center font-normal">
                      No data found!
                      <br />
                      <img src={box2} width={45} alt="" className="m-auto" />
                    </div>
                  )}

                {/* Display a message when no data to display */}
                {selectOptions.length === 0 && (
                  <div className="text-center font-normal">
                    No data to display!
                    <br />
                    <img src={box} width={45} alt="" className="m-auto" />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* ASC SELECT BOX END */}
    </search-Box-Section>
  );
};

export default SelectBox;
