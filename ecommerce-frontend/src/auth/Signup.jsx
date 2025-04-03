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
} from "../notification-alert/CustomToastify";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import GlobalButtons from "../buttons/GlobalButtons3";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Ankit] = useAutoAnimate();

  const signupRes = useSelector((state) => state.user.signupRes);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [validemail, setValidemail] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [warning, setWarning] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // asc cancel popup start //
  const [cancelPopupShow, setCancelPopupShow] = useState(false);
  const handleClose = () => setCancelPopupShow(false);

  const handleYes = (e) => {
    // history.push("/InvoiceAllList");
    navigate(-1);
  };
  const [typeInScreen, setTypeInScreen] = useState("");
  // asc cancel popup end //

  useEffect(() => {
    if (signupRes.status === true) {
      localStorage.setItem("userLoginData", JSON.stringify(signupRes.data));
      localStorage.setItem("userFirstName", signupRes.data.FirstName);
      localStorage.setItem("userLastName", signupRes.data.LastName);
      localStorage.setItem("userid", signupRes.data.userId);

      toast.success(`${signupRes.data.FirstName} you signup successfully`, {
        // autoClose: 3000,
        onOpen: playSuccessSound,
      });
      navigate("/products-list");
    } else {
      // setApimessage(signupRes?.message);
    }
  }, [signupRes]);

  const handleSignup = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      age === "" ||
      phone === ""
    ) {
      setWarning(true);
      return false;
    }
    dispatch(signupApi(firstName, lastName, email, password, age, phone));
    setShowLoader(true);
  };

  const checkEmailValidation = (e) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const emails = e.target.value;
    if (!emailPattern.test(emails) && emails.trim() !== "") {
      setValidemail(true);
    } else {
      setValidemail(false);
    }
  };

  return (
    <div className="ascSmooth p-5">
      <div className="buttonsDiv pt-5 pe-3">
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

        <GlobalButtons.Add label={"Signup"} onClick={handleSignup} />
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 m-auto pt-7 lg:w-[50%] w-full"
        ref={Ankit}
      >
        <div className="p-1">
          <label htmlFor="fname" className="signup-label ps-2">
            First Name
          </label>
          <br />
          <input
            type="text"
            name="fname"
            // disabled
            autoFocus={true}
            placeholder="Enter your First Name"
            className="placeholder-gray-600 signup-inputBorder ps-2"
            style={{ border: warning && !firstName && "1.5px solid #dc3545" }}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setWarning("");
            }}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning && !firstName && "Please fill your Name!"}
          </span>
        </div>

        <div className="p-1">
          <label htmlFor="lname" className="signup-label ps-2">
            Last Name
          </label>
          <br />
          <input
            type="text"
            name="lname"
            placeholder="Enter your Last Name"
            className="placeholder-gray-600 signup-inputBorder ps-2"
            style={{ border: warning && !lastName && "1.5px solid #dc3545" }}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setWarning("");
            }}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning && !lastName && "Please fill your Last Name!"}
          </span>
        </div>

        <div className="p-1">
          <label htmlFor="ASCemail" className="signup-label ps-2">
            Email
          </label>
          <br />
          <input
            type="email"
            name="ASCemail"
            placeholder="Enter your Email"
            className="placeholder-gray-600 signup-inputBorder ps-2"
            style={{ border: warning && !email && "1.5px solid #dc3545" }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              checkEmailValidation(e);
              setWarning("");
            }}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning && !email && "Please fill your Email!"}
            {validemail && "Email is invalid!"}
          </span>
        </div>

        <div className="p-1" style={{ position: "relative" }}>
          <label htmlFor="ASCemail" className="signup-label ps-2">
            Password
          </label>
          <br />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            className="placeholder-gray-600 signup-inputBorder ps-2 pe-5"
            style={{ border: warning && !password && "1.5px solid #dc3545" }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setWarning("");
            }}
          />
          <img
            className="eyeIcon pointer"
            style={{ top: "auto", bottom: "45px", right: "24px" }}
            src={showPassword ? eye : eyeClose}
            alt=""
            onClick={() => setShowPassword(!showPassword)}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning && !password && "Please fill your password!"}
          </span>
        </div>

        <div className="p-1">
          <label htmlFor="age" className="signup-label ps-2">
            Age
          </label>
          <br />
          <input
            type="number"
            min={1}
            name="age"
            required
            placeholder="Enter your Age"
            className="placeholder-gray-600 signup-inputBorder ps-2"
            style={{ border: warning && !age && "1.5px solid #dc3545" }}
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              setWarning("");
            }}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning && !age && "Please fill your age!"}
          </span>
        </div>

        <div className="p-1">
          <label htmlFor="phnumber" className="signup-label ps-2">
            Phone Number
          </label>
          <br />
          <input
            type="number"
            name="phnumber"
            placeholder="Enter your Phone Number"
            className="placeholder-gray-600 signup-inputBorder ps-2"
            style={{ border: warning && !phone && "1.5px solid #dc3545" }}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setWarning("");
            }}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning && !phone && "Please fill your phone number!"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
