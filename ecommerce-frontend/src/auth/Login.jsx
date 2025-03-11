import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence, color } from "motion/react";
import "../styles/Login.css";
import "../styles/NewInput.css";
import eye from "../assets/icons/eye.svg";
import eyeClose from "../assets/icons/eyeClose.svg";
import ASC22 from "../assets/images/ASC22.jpg";
import Button from "@mui/material/Button";
import { AddButton } from "../buttons/GlobalButtons2";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import ascResume from "../assets/ascResume.pdf";
// import { loginApi } from "../Redux/actions/userAction";
// import { useSelector, useDispatch } from "react-redux";
// import { LOGIN } from "../Redux/constance/userType";
import { toast } from "react-toastify";
import {
  playSuccessSound,
  playErrorSound,
} from "../notifications-alert/CustomToastify";
import { WidthFull } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // state start 👇
  const [email, setEmail] = useState("");
  const [msgalert, setMsgalert] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [keepMeLogin, setKeepMeLogin] = useState(false);
  const [termCondition, setTermCondition] = useState(false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="login-left-box p-3">
        <img src={ASC22} alt="" className="login-left-img" />
      </div>
    </div>
  );
};

export default Login;
