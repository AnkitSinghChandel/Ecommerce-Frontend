import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence, color } from "motion/react";
import "../styles/Login.css";
import eye from "../assets/icons/eye.svg";
import eyeClose from "../assets/icons/eyeClose.svg";
import ASC22 from "../assets/images/ASC22.jpg";
import ASC33 from "../assets/images/ASC33.jpg";
import Button from "@mui/material/Button";
import { AddButton } from "../buttons/GlobalButtons2";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import ascResume from "../assets/ascResume.pdf";
import { loginApi } from "../redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN } from "../redux/constance/userType";
import { toast } from "react-toastify";
import {
  playSuccessSound,
  playErrorSound,
} from "../notifications-alert/CustomToastify";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Ankit] = useAutoAnimate();

  // Redirect logged-in users.👇
  useEffect(() => {
    const authentication = localStorage.getItem("userLoginData");
    if (authentication) {
      navigate("/products-list");
    }
  }, [navigate]);
  // Redirect logged-in users.👆

  const loginRes = useSelector((state) => state.user.loginRes);

  // state start 👇
  const [email, setEmail] = useState("");
  const [msgalert, setMsgalert] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [keepMeLogin, setKeepMeLogin] = useState(false);
  const [termCondition, setTermCondition] = useState(false);

  useEffect(() => {
    if (loginRes.status === true) {
      setLoginData(loginRes.data);

      if (keepMeLogin) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("isKeepLoggedIn", true);
      } else {
        sessionStorage.clear();
        localStorage.clear();
      }
      localStorage.setItem("userLoginData", JSON.stringify(loginRes.data));
      localStorage.setItem("userFirstName", loginRes.data.FirstName);
      localStorage.setItem("userLastName", loginRes.data.LastName);
      localStorage.setItem("userid", loginRes.data.userId);
      localStorage.setItem("token", loginRes.token);

      navigate("/products-list");

      // toast.success(`${loginRes.data.FirstName} Login successfully`, {
      //   autoClose: 3000,
      //   onOpen: playSuccessSound,
      // });

      toast.success(
        <div className="flex items-center">
          <img src={ASC22} alt="" className="toastImg me-2 w-8 h-8" />
          <span>{`${loginRes.data.FirstName} Login successfully`}</span>
        </div>,
        {
          autoClose: 3000,
          onOpen: playSuccessSound,
        }
      );

      dispatch({
        type: LOGIN,
        data: {},
      });
    } else {
      setMsgalert(loginRes?.message);
      loginRes?.message &&
        toast.error("Login failed", { onOpen: playErrorSound });
    }
  }, [loginRes]);

  const handleLogin = () => {
    dispatch(loginApi(email, password));
  };

  document.getElementById("asc_input")?.focus();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="login-left-box p-3">
        <img src={ASC22} alt="" className="login-left-img" />
      </div>

      <div className="login-right-box pt-5">
        <p className="ps-2 welcomeTxt">Welcome !</p>

        <div className="p-3">
          <label htmlFor="ASCemail" className="login-label ps-2">
            Email
          </label>
          <br />
          <input
            className="inputBorder ps-2"
            type="email"
            name="ASCemail"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMsgalert("");
            }}
          />
        </div>

        <div className="p-3">
          <p className="mb-0 login-label ps-2">Password</p>
          <div style={{ position: "relative" }}>
            <input
              className="inputBorder ps-2 pe-5"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMsgalert("");
              }}
            />

            <img
              className="eyeIcon pointer"
              src={showPassword ? eye : eyeClose}
              alt=""
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* <AnimatePresence>
            {msgalert && (
              <motion.p
                transition={{ duration: 0.5 }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="ps-2 mb-0 alertMsg"
              >
                {msgalert}
              </motion.p>
            )}
          </AnimatePresence> */}
          <p className="ps-2 mb-0 alertMsg" ref={Ankit}>
            {msgalert}
          </p>
        </div>

        <div className="keep-labels ps-5">
          <div className="ps-">
            <input
              type="checkbox"
              id="keep"
              className="checkboxRound pointer"
              value=""
              onChange={() => {
                setKeepMeLogin(!keepMeLogin);
              }}
            />
            <label htmlFor="keep" className="ps-1">
              Keep me logged in
            </label>
          </div>

          <div className="ps-">
            <input
              type="checkbox"
              id="agree"
              className="TermsCon pointer"
              value=""
              onChange={() => {
                setTermCondition(!termCondition);
              }}
            />
            <label htmlFor="agree" className="ps-1">
              I have read and agreed &nbsp;
              <a href={ascResume} target="_blank" rel="noopener noreferrer">
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>

        <div className="py-3 ps-5 pe-3">
          {/* <AddButton
            variant="contained"
            disabled={termCondition === !true}
            // startIcon={<DeleteIcon />}
            endIcon={<SendIcon />}
            // sx={{ background: "#00246a", color: "white" }}
            label={"Login"}
            // onClick={asc}
            className=""
            style={{ width: "100%" }}
          /> */}

          <AddButton
            label={"Login"}
            disabled={termCondition === !true}
            className=""
            style={{ width: "100%", maxWidth: "100%", fontSize: "18px" }}
            onClick={handleLogin}
          />

          <p className="pt-4 keep-labels">
            if you are not a member you can make
            <Link to="/signup">&nbsp;Signup</Link>
            &nbsp;first
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
