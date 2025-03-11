import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../layouts/Header";
import "../styles/Signup.css";
import eye from "../assets/icons/eye.svg";
import eyeClose from "../assets/icons/eyeClose.svg";
import { useSelector, useDispatch } from "react-redux";
import { signupApi } from "../redux/actions/userAction";
// import CancelPopup from "../dialogs/CancelPopup";
import { toast } from "react-toastify";
import {
  playSuccessSound,
  playErrorSound,
} from "../notifications-alert/CustomToastify";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [warning, setWarning] = useState(false);

  // asc cancel popup start //
  const [cancelPopupShow, setCancelPopupShow] = useState(false);
  const handleClose = () => setCancelPopupShow(false);

  const handleCancel = (e) => {
    // history.push("/InvoiceAllList");
    navigate(-1);
  };
  const [typeInScreen, setTypeInScreen] = useState("");
  // asc cancel popup end //

  return (
    <div className="p-5">
      <div className="buttonsDiv pt-5 pe-3">
        <button
          className="cancelBtn ascButton"
          onClick={() => {
            if (typeInScreen !== "") {
              setCancelPopupShow(true);
            } else {
              // history.goBack();
              navigate(-1);
            }
          }}
        >
          Cancel
        </button>
        <button className="addBtn ascButton" onClick={"handleSignup"}>
          Signup
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 m-auto pt-7">
        <div className="p-3">
          <label htmlFor="fname" className="signup-label ps-2">
            First Name
          </label>
          <br />
          <input
            className="signup-inputBorder ps-2"
            type="text"
            name="fname"
            placeholder="Enter your First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setWarning("");
            }}
          />
        </div>

        <div className="p-3">
          <label htmlFor="lname" className="signup-label ps-2">
            Last Name
          </label>
          <br />
          <input
            className="signup-inputBorder ps-2"
            type="text"
            name="lname"
            placeholder="Enter your Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setWarning("");
            }}
          />
        </div>

        <div className="p-3">
          <label htmlFor="ASCemail" className="signup-label ps-2">
            Email
          </label>
          <br />
          <input
            className="signup-inputBorder ps-2"
            type="email"
            name="ASCemail"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setWarning("");
            }}
          />
        </div>

        <div className="p-3" style={{ position: "relative" }}>
          <label htmlFor="ASCemail" className="signup-label ps-2">
            Password
          </label>
          <br />
          <input
            className="signup-inputBorder ps-2 pe-5"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setWarning("");
            }}
          />
          <img
            className="eyeIcon pointer"
            style={{ top: "auto", bottom: "27px", right: "24px" }}
            src={showPassword ? eye : eyeClose}
            alt=""
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <div className="p-3">
          <label htmlFor="age" className="signup-label ps-2">
            Age
          </label>
          <br />
          <input
            className="signup-inputBorder ps-2"
            type="number"
            name="age"
            placeholder="Enter your Age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              setWarning("");
            }}
          />
        </div>

        <div className="p-3">
          <label htmlFor="phnumber" className="signup-label ps-2">
            Phone Number
          </label>
          <br />
          <input
            className="signup-inputBorder ps-2"
            type="number"
            name="phnumber"
            placeholder="Enter your Phone Number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setWarning("");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
