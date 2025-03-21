import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import "../../styles/AddTeam.css";
import "../../styles/NewInput.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Header from "../../layouts/Header";
import CancelPopup from "../../dialogs/CancelPopup";
import addicon from "../../assets/icons/addicon.svg";
import singleUser from "../../assets/icons/singleUser.svg";
import ASC22 from "../../assets/images/ASC22.jpg";
import DownArrowOption from "../../assets/icons/DownArrowOption.svg";
import Xicon from "../../assets/icons/Xicon.svg";
import searchicon from "../../assets/icons/search.svg";
import calendarIcon from "../../assets/icons/calendarIcon.svg";
import doubleUser from "../../assets/icons/doubleUser.svg";
import {
  addTeam,
  fetchTeamByid,
  updateTeamByid,
} from "../../Redux/actions/teamAction";
import { ADD_TEAM } from "../../Redux/constance/teamType";
import { useSelector, useDispatch } from "react-redux";
// import AntDatePicker from "../../datePicker/AntDatePicker";
import { DatePicker, Spin } from "antd";
import dayjs from "dayjs";

import { toast } from "react-toastify";
import {
  playSuccessSound,
  playErrorSound,
} from "../../notifications-alert/CustomToastify";
import moment from "moment";
import NoData from "../../common/NoData";
import GlobalButtons from "../../buttons/GlobalButtons3";

const AddUpdateTeam = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  const addTeamRes = useSelector((state) => state.team.addTeamRes);
  const fetchTeambyidRes = useSelector((state) => state.team.fetchTeambyidRes);
  const updateTeambyidRes = useSelector(
    (state) => state.team.updateTeambyidRes
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [validemail, setValidemail] = useState(false);
  const [password, setPassword] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [technology, setTechnology] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [devsPrice, setDevsPrice] = useState("");
  const [warning, setWarning] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // for select Box start
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [optionsShow, setOptionsShow] = useState(false);
  const [arrowOptionsRotate, setArrowOptionsRotate] = useState(false);
  // for select Box end

  // asc cancel popup start //
  const [cancelPopupShow, setCancelPopupShow] = useState(false);
  const handleClose = () => setCancelPopupShow(false);

  const handleCancel = (e) => {
    // history.push("/InvoiceAllList");
    navigate(-1);
  };
  const [typeInScreen, setTypeInScreen] = useState("");
  // asc cancel popup end //

  // for Add Team start👇.
  useEffect(() => {
    if (addTeamRes.status === true) {
      setShowLoader(false);

      toast.success(`${firstName} Added successfully`, {
        // autoClose: 3000,
        onOpen: playSuccessSound,
      });
      navigate("/team-list");

      dispatch({
        type: ADD_TEAM,
        data: {},
      });
    } else if (addTeamRes.status === false) {
      toast.error(`Failed to add team ${firstName}`, {
        // autoClose: 3000,
        onOpen: playErrorSound,
      });
    }
  }, [addTeamRes]);

  // when we add team
  const handleAddTeam = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      creationDate === "" ||
      technology === "" ||
      phoneNumber === "" ||
      devsPrice === ""
    ) {
      setWarning(true);
      return false;
    }
    dispatch(
      addTeam(
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        devsPrice,
        technology,
        creationDate
      )
    );
    setShowLoader(true);
  };
  // for Add Team end👆.

  // for Update Team start👇.
  useEffect(() => {
    dispatch(fetchTeamByid(params.id));
  }, []);

  useEffect(() => {
    if (fetchTeambyidRes.status === true) {
      setFirstName(fetchTeambyidRes.data.firstName);
      setLastName(fetchTeambyidRes.data.lastName);
      setEmail(fetchTeambyidRes.data.email);
      setPassword(fetchTeambyidRes.data.password);
      setDevsPrice(fetchTeambyidRes.data.devsPrice);
      setPhoneNumber(fetchTeambyidRes.data.phoneNumber);
      setTechnology(fetchTeambyidRes.data.technology);
      setCreationDate(new Date(fetchTeambyidRes.data.creationDate));
      //   setCreationDate(dayjs(fetchTeambyidRes.data.creationDate));
    }
  }, [fetchTeambyidRes]);

  useEffect(() => {
    if (updateTeambyidRes.status === true) {
      setShowLoader(false);

      toast.success(`${firstName} Updated successfully`, {
        // autoClose: 3000,
        onOpen: playSuccessSound,
      });
      navigate("/team-list");
    }
  }, [updateTeambyidRes]);

  // when we update team
  const handleUpdateTeam = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      creationDate === "" ||
      technology === "" ||
      phoneNumber === "" ||
      devsPrice === ""
    ) {
      setWarning(true);
      return false;
    }
    dispatch(
      updateTeamByid(
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        devsPrice,
        params.id,
        technology,
        creationDate
      )
    );
    setShowLoader(true);
  };
  // for Update Team end👆.

  const checkEmailValidation = (e) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const emails = e.target.value;
    if (!emailPattern.test(emails) && emails.trim() !== "") {
      setValidemail(true);
    } else {
      setValidemail(false);
    }
  };

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTeam();
    }
  };

  return (
    <div className="">
      <Header
        // setQuery={setQuerystring}
        placeholder={"You are in Add Team"}
        leftComponent={
          <div className="leftComponentCss">
            <p className="text-[#5CAF90] font-medium text-[18px]">
              {/* You are in Products List */}
            </p>
          </div>
        }
      />

      {cancelPopupShow && (
        <CancelPopup
          open={cancelPopupShow}
          // onCancel={() => setCancelPopupShow(false)}
          onCancel={handleClose}
          onOk={handleCancel}
          title={""}
          keyboard={true}
        />
      )}

      <div className="flex justify-center md:justify-end flex-wrap gap-4 pt-15 p-6">
        <GlobalButtons.Cancel
          label={"Cancel"}
          onClick={() => {
            if (typeInScreen !== "") {
              setCancelPopupShow(true);
            } else {
              // history.goBack();
              navigate(-1);
            }
          }}
        />

        <GlobalButtons.Submit
          disabled={validemail || showLoader}
          // onClick={handleAddTeam}
          onClick={params.id ? handleUpdateTeam : handleAddTeam}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          className="addBtn"
          extraComponent={
            showLoader ? (
              <div>
                <Spin size="small" className="team-custom-spin" />
                <span className="px-2">Updating...</span>
              </div>
            ) : (
              <div className="flex gap-5 justify-center pe-4">
                <img
                  className="icons mx-"
                  src={btnHover ? addicon : doubleUser}
                  alt=""
                />
                {params.id ? "Update Team" : "Add Team"}
              </div>
            )
          }
        />
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 m-auto pt-6 lg:w-[70%] w-full"
        ref={Ankit}
      >
        <div className="asc-input-container" id="ascNewInput">
          <label className="asc-top-label labelText">First Name</label>
          <input
            type="text"
            // disabled
            autoFocus={true}
            className="asc-Normal-Input"
            style={{ border: warning && !firstName && "1.5px solid #dc3545" }}
            placeholder="Enter your First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setTypeInScreen(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning && !firstName && "Please fill your Name!"}
          </span>
        </div>

        <div className="asc-input-container" id="ascNewInput">
          <label className="asc-top-label labelText">Last Name</label>
          <input
            type="text"
            // disabled
            className="asc-Normal-Input"
            style={{ border: warning && !lastName && "1.5px solid #dc3545" }}
            placeholder="Enter your Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setTypeInScreen(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning && !lastName && "Please fill your Last Name!"}
          </span>
        </div>

        <div className="asc-input-container" id="ascNewInput">
          <label className="asc-top-label labelText">Technology</label>
          <input
            type="text"
            // disabled
            readOnly
            className="asc-Normal-Input"
            style={{ border: warning && !technology && "1.5px solid #dc3545" }}
            placeholder="Enter your Technology"
            value={technology}
            onChange={(e) => {
              setTechnology(e.target.value);
              setTypeInScreen(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            onClick={() => {
              setOptionsShow(!optionsShow);
            }}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning && !technology && "Please fill your Technology!"}
          </span>

          {optionsShow && (
            <div className="ascBootOptionDrop px-1 pb-2 top-[60px]! max-w-[100%]!">
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

              <div
                className="ascBootOptionList py-2"
                id="ascScroll"
                ref={Ankit}
              >
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
                          setOptionsShow(false);
                          setTechnology(item.label);
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
                  filterParameters={selectOptions.map(
                    (x) => `${x.label} ${x.value}`
                  )}
                />
              </div>
            </div>
          )}
        </div>

        <div className="asc-input-container" id="ascNewInput">
          <label className="asc-top-label labelText">Email</label>
          <input
            type="email"
            // disabled
            className="asc-Normal-Input"
            style={{ border: warning && !email && "1.5px solid #dc3545" }}
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setTypeInScreen(e.target.value);
              checkEmailValidation(e);
            }}
            onKeyDown={handleKeyDown}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning && !email && "Please fill your Email!"}
            {validemail && "Email is invalid!"}
          </span>
        </div>

        <div className="asc-input-container" id="ascNewInput">
          <label className="asc-top-label labelText">Password</label>
          <input
            type="password"
            // disabled
            className="asc-Normal-Input"
            style={{ border: warning && !password && "1.5px solid #dc3545" }}
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setTypeInScreen(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning && !password && "Please fill your password!"}
          </span>
        </div>

        <div className="asc-input-container" id="ascNewInput">
          <label className="asc-top-label labelText">Date</label>
          {/* <input
                className="ps-2"
                type="date"
                placeholder="Enter your First Name"
                value={creationDate}
                onChange={(e) => {
                  setCreationDate(e.target.value);
                  setTypeInScreen(e.target.value);
                }}
              /> */}

          {/* <img
                className="calendarCss"
                src={calendarIcon}
                onClick={() => {
                  setCalendarOpen(!calendarOpen);
                  // setCalendarOpen((p) => !p);
                  // setTouched("asc");
                }}
                alt=""
              /> */}

          <DatePicker
            className="asc-Normal-Input"
            id="asc-date"
            style={{
              border: warning && !creationDate && "1.5px solid #dc3545",
            }}
            popupClassName="datePopupCss"
            placeholder="Select a Date"
            open={calendarOpen}
            value={creationDate}
            defaultValue={new Date()}
            // format={"DD-MM-YYYY"}
            format={{
              format: "DD-MM-YYYY",
              type: "mask",
            }}
            onChange={(e) => {
              setCreationDate(e);
              setCalendarOpen(false);
            }}
            onKeyDown={handleKeyDown}
            variant="borderless"
            // prefix={<img src={calendarIcon} alt="calendar" />}
            prefix={
              <img
                className="pointer"
                src={calendarIcon}
                alt="calendar"
                width={20}
                onClick={() => setCalendarOpen(!calendarOpen)}
              />
            }
            // allowClear={false}
            multiple={false}
            size="large"
            renderExtraFooter={() => (
              <div>{/* Additional footer content */}</div>
            )}
            showWeek={false}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning && !creationDate && "Please fill your Date!"}
          </span>
        </div>

        <div className="asc-input-container" id="ascNewInput">
          <label className="asc-top-label labelText">Phone Number</label>
          <input
            type="number"
            // disabled
            className="asc-Normal-Input"
            placeholder="Enter your Phone Number"
            style={{ border: warning && !phoneNumber && "1.5px solid #dc3545" }}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setTypeInScreen(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning && !phoneNumber && "Please fill your phone!"}
          </span>
        </div>

        <div className="asc-input-container" id="ascNewInput">
          <label className="asc-top-label labelText">Devs Price</label>
          <input
            type="number"
            // disabled
            className="asc-Normal-Input"
            style={{ border: warning && !devsPrice && "1.5px solid #dc3545" }}
            placeholder="Enter your Price"
            value={devsPrice}
            onChange={(e) => {
              setDevsPrice(e.target.value);
              setTypeInScreen(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning && !devsPrice && "Please fill your Price!"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateTeam;
