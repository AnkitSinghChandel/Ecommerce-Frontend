import React from "react";
import "../styles/Buttons.css";

// Add Button
export const AddButton = ({ className, onClick, label, disabled, style }) => (
  <button
    className={`addButton ascButton ${className}`}
    style={style}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Add"}
  </button>
);

// Cancel Button
export const CancelButton = ({
  className,
  onClick,
  label,
  disabled,
  style,
}) => (
  <button
    className={`cancelButton ascButton ${className}`}
    style={style}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Cancel"}
  </button>
);

// Delete Button
export const DeleteButton = ({ className, onClick, label, disabled }) => (
  <button
    className={`deleteButton ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Delete"}
  </button>
);

// Submit Button
export const SubmitButton = ({ className, onClick, label, disabled }) => (
  <button
    className={`submitButton ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Submit"}
  </button>
);

// import { AddButton, CancelButton, DeleteButton, SubmitButton } from "./GlobalButtons";
