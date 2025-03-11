import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
const axios = axiosInstance;

import {
  API_URL,
  ADD_STATUS,
  FETCH_ALL_STATUS,
  UPDATE_STATUS_BY_ID,
  DELETE_STATUS_BY_ID,
  ADD_TASK,
  FETCH_ALL_TASK,
  FETCH_TASK_BY_ID,
  UPDATE_TASK_BY_ID,
  DELETE_TASK_BY_ID,
  UPDATE_ALL_MULTI_TASKS,
  SEND_MESSAGE,
  FETCH_MESSAGE_BY_TASK_ID,
} from "../constance/taskType";

export const addStatus = (statusName) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/status`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        statusName,
      },
    });
    dispatch({
      type: ADD_STATUS,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllStatus = () => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/status`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_ALL_STATUS,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateStatusById = (statusName, tasks) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/status`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        statusName,
        tasks,
      },
    });
    dispatch({
      type: UPDATE_STATUS_BY_ID,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteStatusById = (statusId) => async (dispatch) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${API_URL}/status/${statusId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: DELETE_STATUS_BY_ID,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addTask = (taskName, status) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/tasks`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        taskName,
        status,
      },
    });
    dispatch({
      type: ADD_TASK,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllTask = () => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/tasks`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_ALL_TASK,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTaskById = (id) => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/tasks/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_TASK_BY_ID,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateTaskById =
  (taskId, status, indexPosition) => async (dispatch) => {
    try {
      const response = await axios({
        method: "patch",
        url: `${API_URL}/tasks/${taskId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { status, indexPosition },
      });
      dispatch({
        type: UPDATE_TASK_BY_ID,
        data: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export const deleteTaskById = (taskId) => async (dispatch) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${API_URL}/tasks/${taskId}`,
      headers: {
        "Content-Type": "application/json",
      },
      // data: {},
    });
    dispatch({
      type: DELETE_TASK_BY_ID,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateAllMultiTasks = (data) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/tasks/updateManyTasks`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { data },
    });
    dispatch({
      type: UPDATE_ALL_MULTI_TASKS,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendMessage =
  (sender, receiver, task, message) => async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/message`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { sender, receiver, task, message },
      });
      dispatch({
        type: SEND_MESSAGE,
        data: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export const fetchMessageByTaskId = (id) => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/message/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_MESSAGE_BY_TASK_ID,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
