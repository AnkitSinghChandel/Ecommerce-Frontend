import React from "react";
import "../styles/Buttons.css";
import Button from "@mui/material/Button";

const GlobalButtons = {}; // यह ऑब्जेक्ट सभी बटनों को एक साथ रखेगा

GlobalButtons.Add = ({ className, onClick, label, disabled }) => (
  <Button
    className={`addButton ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Add"}
  </Button>
);

GlobalButtons.Cancel = ({ className, onClick, label, disabled }) => (
  <Button
    className={`cancelButton ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Cancel"}
  </Button>
);

GlobalButtons.Delete = ({ className, onClick, label, disabled }) => (
  <Button
    className={`deleteButton ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Delete"}
  </Button>
);

GlobalButtons.Submit = ({ className, onClick, label, disabled }) => (
  <Button
    className={`submitButton ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Submit"}
  </Button>
);

export default GlobalButtons;

// import GlobalButtons from "./GlobalButtons";
{
  /* <GlobalButtons.Add />; */
}
