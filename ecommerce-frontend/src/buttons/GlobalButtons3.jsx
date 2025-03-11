import React from "react";
import "../styles/Buttons.css";

const GlobalButtons = {}; // यह ऑब्जेक्ट सभी बटनों को एक साथ रखेगा

GlobalButtons.Add = ({ className, onClick, label, disabled }) => (
  <button
    className={`addBtn ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Add"}
  </button>
);

GlobalButtons.Cancel = ({ className, onClick, label, disabled }) => (
  <button
    className={`cancelBtn ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Cancel"}
  </button>
);

GlobalButtons.Delete = ({ className, onClick, label, disabled }) => (
  <button
    className={`deleteBtn ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Delete"}
  </button>
);

GlobalButtons.Submit = ({ className, onClick, label, disabled }) => (
  <button
    className={`submitBtn ascButton ${className}`}
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
