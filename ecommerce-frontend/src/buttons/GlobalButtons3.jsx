import React from "react";
import "../styles/Buttons.css";

const GlobalButtons = {}; // यह ऑब्जेक्ट सभी बटनों को एक साथ रखेगा

GlobalButtons.Add = ({ className, onClick, label, disabled, style }) => (
  <button
    className={`addButton ascButton ${className}`}
    style={style}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Add"}
  </button>
);

GlobalButtons.Cancel = ({ className, onClick, label, disabled, style }) => (
  <button
    className={`cancelButton ascButton ${className}`}
    style={style}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Cancel"}
  </button>
);

GlobalButtons.Delete = ({ className, onClick, label, disabled, style }) => (
  <button
    className={`deleteButton ascButton ${className}`}
    style={style}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Delete"}
  </button>
);

GlobalButtons.Submit = ({
  className,
  onClick,
  label,
  disabled,
  style,
  extraComponent,
  onMouseEnter,
  onMouseLeave,
}) => (
  <button
    className={`submitButton ascButton ${className}`}
    style={style}
    disabled={disabled}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {/* {label || "Submit"} */}
    {extraComponent && extraComponent}
  </button>
);

export default GlobalButtons;

// import GlobalButtons from "./GlobalButtons";
{
  /* <GlobalButtons.Add />; */
}
