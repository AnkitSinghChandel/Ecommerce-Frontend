import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "../styles/Profile.css";
import "../styles/NewInput.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Header from "../layouts/Header";
import CancelPopup from "../dialogs/CancelPopup";
import addicon from "../assets/icons/addicon.svg";
import singleUser from "../assets/icons/singleUser.svg";
import ASC22 from "../assets/images/ASC22.jpg";
import DownArrowOption from "../assets/icons/DownArrowOption.svg";
import Xicon from "../assets/icons/Xicon.svg";
import searchicon from "../assets/icons/search.svg";
import calendarIcon from "../assets/icons/calendarIcon.svg";
import doubleUser from "../assets/icons/doubleUser.svg";
import { fetchUserByid } from "../redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
// import AntDatePicker from "../datePicker/AntDatePicker";
import { DatePicker, Spin } from "antd";

import { toast } from "react-toastify";
import {
  playSuccessSound,
  playErrorSound,
} from "../notifications-alert/CustomToastify";
import moment from "moment";
import NoData from "../common/NoData";
import GlobalButtons from "../buttons/GlobalButtons3";
import Loader from "../common/Loader";
import CustomDatePicker from "../datePicker/CustomDatePicker";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  // const userID = sessionStorage.getItem("userid");
  const userID = localStorage.getItem("userid");

  const fetchUserRes = useSelector((state) => state.user.fetchUserRes);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [validemail, setValidemail] = useState(false);
  const [password, setPassword] = useState("");
  const [creationDate, setCreationDate] = useState();
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [warning, setWarning] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // asc cancel popup start //
  const [cancelPopupShow, setCancelPopupShow] = useState(false);
  const handleClose = () => setCancelPopupShow(false);

  const handleCancel = (e) => {
    // history.push("/InvoiceAllList");
    navigate(-1);
  };
  const [typeInScreen, setTypeInScreen] = useState("");
  // asc cancel popup end //

  useEffect(() => {
    dispatch(fetchUserByid(userID));
  }, []);

  useEffect(() => {
    if (fetchUserRes.status === true) {
      setFirstName(fetchUserRes.data.FirstName);
      setLastName(fetchUserRes.data.LastName);
      setEmail(fetchUserRes.data.email);
      setPassword(fetchUserRes.data.password);
      setPhoneNumber(fetchUserRes.data.phoneNumber);
      setAge(fetchUserRes.data.age);
      setCreationDate(fetchUserRes.data.creationDate);
    }
  }, [fetchUserRes]);

  const checkEmailValidation = (e) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const emails = e.target.value;
    if (!emailPattern.test(emails) && emails.trim() !== "") {
      setValidemail(true);
    } else {
      setValidemail(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(fetchUserByid(userID));
    }
  };

  return (
    <div className="">
      {/* <div>
        <CustomDatePicker />
      </div> */}

      <Header
        // setQuery={setQuerystring}
        placeholder={"You are in your profile..."}
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
          <label className="asc-top-label labelText">Age</label>
          <input
            type="number"
            // disabled
            min={18}
            className="asc-Normal-Input"
            placeholder="Enter your Age"
            style={{ border: warning && !age && "1.5px solid #dc3545" }}
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              setTypeInScreen(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning && !age && "Please fill your age!"}
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
      </div>
    </div>
  );
};

export default Profile;
