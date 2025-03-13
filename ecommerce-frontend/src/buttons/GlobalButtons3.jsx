import React from "react";
import "../styles/Buttons.css";

const GlobalButtons = {}; // यह ऑब्जेक्ट सभी बटनों को एक साथ रखेगा

GlobalButtons.Add = ({ className, onClick, label, disabled, style }) => (
  <button
    className={`addBtn ascButton ${className}`}
    style={style}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Add"}
  </button>
);

GlobalButtons.Cancel = ({ className, onClick, label, disabled, style }) => (
  <button
    className={`cancelBtn ascButton ${className}`}
    style={style}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Cancel"}
  </button>
);

GlobalButtons.Delete = ({ className, onClick, label, disabled, style }) => (
  <button
    className={`deleteBtn ascButton ${className}`}
    style={style}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Delete"}
  </button>
);

GlobalButtons.Submit = ({ className, onClick, label, disabled, style }) => (
  <button
    className={`submitBtn ascButton ${className}`}
    style={style}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Submit"}
  </button>
);

export default GlobalButtons;

// import GlobalButtons from "./GlobalButtons";
{
  /* <GlobalButtons.Add />; */
}
