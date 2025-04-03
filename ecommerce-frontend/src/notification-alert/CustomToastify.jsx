import React from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import successAlert from "../assets/notification-sound/successAlert.wav";
import errorAlert from "../assets/notification-sound/errorAlert.wav";

// const playSuccessSound = () => {
//   const audio = new Audio(successAlert);
//   audio.play();
// };

// const playErrorSound = () => {
//   const audio = new Audio(errorAlert);
//   audio.play();
// };

const playSuccessSound = () => {
  const audio = new Audio(successAlert);
  audio.play().catch((error) => {
    console.error("error:", error);
  });
};

const playErrorSound = () => {
  const audio = new Audio(errorAlert);
  audio.play().catch((error) => {
    console.error("error:", error);
  });
};

const Toastify = () => {
  return (
    <ToastContainer
      bodyClassName="toastBody"
      className="custom-toast-container"
      position="top-right"
      autoClose={5000}
      // closeButton={customCrossIcon}  Providing custom close button.
      closeButton={true}
      hideProgressBar={false}
      newestOnTop={true} // Ensure the newest toast appears on top.
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      // onOpen={() => playSuccessSound()}
    />
  );
};

export { playSuccessSound, playErrorSound };
export default Toastify;
