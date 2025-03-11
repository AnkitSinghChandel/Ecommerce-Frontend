import React from "react";
import "../styles/Buttons.css";
import Button from "@mui/material/Button";

// Add Button
export const AddButton = ({ className, onClick, label, disabled }) => (
  <Button
    className={`addBtn ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Add"}
  </Button>
);

// Cancel Button
export const CancelButton = ({ className, onClick, label, disabled }) => (
  <Button
    className={`cancelBtn ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Cancel"}
  </Button>
);

// Delete Button
export const DeleteButton = ({ className, onClick, label, disabled }) => (
  <Button
    className={`deleteBtn ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Delete"}
  </Button>
);

// Submit Button
export const SubmitButton = ({ className, onClick, label, disabled }) => (
  <Button
    className={`submitBtn ascButton ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label || "Submit"}
  </Button>
);

// import { AddButton, CancelButton, DeleteButton, SubmitButton } from "./GlobalButtons";
