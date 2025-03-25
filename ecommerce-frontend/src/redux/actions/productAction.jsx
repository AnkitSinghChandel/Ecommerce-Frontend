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
  ADD_REVIEW,
  ADD_TO_CART,
  FETCH_ALL_CART_PRODUCTS,
  DISCOUNT_PROPS_API,
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

export const addReview = (userId, productId, rating) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/reviews`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { userId, productId, rating },
    });
    dispatch({
      type: ADD_REVIEW,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addToCart =
  (userId, productId, productQuantity) => async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/carts`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { userId, productId, productQuantity },
      });
      dispatch({
        type: ADD_TO_CART,
        data: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch({
        type: ADD_TO_CART,
        data: error.response.data,
      });
    }
  };

export const fetchAllCartProducts = () => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/carts`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_ALL_CART_PRODUCTS,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// ASC REDUX PROPS START //
export const discount_Props_API =
  (discount1, discount2) => async (dispatch) => {
    try {
      console.log("Dispatching discount data:", discount1, discount2);

      dispatch({
        type: DISCOUNT_PROPS_API,
        data: { discount1, discount2 },
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: DISCOUNT_PROPS_API,
        data: error.response.data,
      });
    }
  };
// ASC REDUX PROPS END //
