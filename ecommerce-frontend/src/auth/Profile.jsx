import React from "react";
import "../styles/Profile.css";
import Loader from "../common/Loader";
import CustomDatePicker from "../datePicker/CustomDatePicker";

const Profile = () => {
  return (
    <div>
      <div>
        <CustomDatePicker />
      </div>
      <div className="flex justify-center items-center h-screen">
        <Loader size="large" tip="" className="custom-spin" />
      </div>
    </div>
  );
};

export default Profile;
