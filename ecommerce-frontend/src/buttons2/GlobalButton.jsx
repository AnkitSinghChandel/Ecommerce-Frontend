import React from "react";
import "../styles/Buttons.css";
import Button from "@mui/material/Button";

// const Button = (props) => {
//   console.log("asc button props from parent components", props);
//   return (
//     <button
//       // className="cancelButton ascButton"
//       className={`cancelButton ascButton ${props.className}`}
//       onClick={props.onClick}
//     >
//       {props.label}
//     </button>
//   );
// };

const Button = ({ label, className, onClick, disabled }) => {
  console.log("asc button props from parent components label", label);
  console.log("asc button props from parent components className", className);
  console.log("asc button props from parent components onClick", onClick);

  return (
    <Button
      disabled={disabled}
      // className="cancelButton ascButton"
      className={`cancelButton ascButton ${className}`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default Button;
