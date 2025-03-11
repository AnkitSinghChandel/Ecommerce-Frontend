import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
const axios = axiosInstance;

import {
  API_URL,
  LOGIN,
  SIGNUP,
  FETCH_USER_BY_ID,
} from "../constance/userType";

export const loginApi = (email, password) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/users/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    });
    dispatch({
      type: LOGIN,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: LOGIN,
      data: error.response.data,
    });
    console.error(error);
  }
};

export const signupApi =
  (FirstName, LastName, email, password, age, phoneNumber) =>
  async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/users`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          FirstName,
          LastName,
          email,
          password,
          age,
          phoneNumber,
        },
      });
      dispatch({
        type: SIGNUP,
        data: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export const fetchUserByid = (userId) => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/users/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_USER_BY_ID,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// export const generateAdvicedPurchaseOrder = () => {
//   return axiosInstance.get(`${API_URL}/api/User/GenerateAdvicedOrder`);
// };
