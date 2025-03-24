import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
const axios = axiosInstance;

import {
  API_URL,
  ADD_PRODUCT,
  FETCH_ALL_PRODUCTS,
  FETCH_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  DELETE_PRODUCT_BY_ID,
} from "../constance/productType";

export const addProduct =
  (productName, productImage, productTitle, productDescription, productPrice) =>
  async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/products`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          productName,
          productImage,
          productTitle,
          productDescription,
          productPrice,
        },
      });
      dispatch({
        type: ADD_PRODUCT,
        data: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export const fetchAllProducts = () => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/products`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_ALL_PRODUCTS,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProductById = (productID) => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/products/${productID}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_PRODUCT_BY_ID,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProductById =
  (
    productID,
    productName,
    productImage,
    productTitle,
    productDescription,
    productPrice
  ) =>
  async (dispatch) => {
    try {
      const response = await axios({
        method: "patch",
        url: `${API_URL}/products/${productID}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          productName,
          productImage,
          productTitle,
          productDescription,
          productPrice,
        },
      });
      dispatch({
        type: UPDATE_PRODUCT_BY_ID,
        data: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export const deleteProductById = (productID) => async (dispatch) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${API_URL}/products/${productID}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: DELETE_PRODUCT_BY_ID,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
