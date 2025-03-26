import React from "react";
import "../styles/Buttons.css";
import Button from "@mui/material/Button";

// Add Button
export const AddButton = ({ className, onClick, label, disabled }) => (
  <Button
    className={`addButton ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Add"}
  </Button>
);

// Cancel Button
export const CancelButton = ({ className, onClick, label, disabled }) => (
  <Button
    className={`cancelButton ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Cancel"}
  </Button>
);

// Delete Button
export const DeleteButton = ({ className, onClick, label, disabled }) => (
  <Button
    className={`deleteButton ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Delete"}
  </Button>
);

// Submit Button
export const SubmitButton = ({ className, onClick, label, disabled }) => (
  <Button
    className={`submitButton ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Submit"}
  </Button>
);

// import { AddButton, CancelButton, DeleteButton, SubmitButton } from "./GlobalButtons";
