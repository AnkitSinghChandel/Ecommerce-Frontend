import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
const axios = axiosInstance;

import {
  API_URL,
  ADD_TEAM,
  FETCH_TEAM,
  DELETE_TEAM,
  FETCH_TEAM_BY_ID,
  UPDATE_TEAM_BY_ID,
  TEAMS_GENRATE_PDF,
} from "../constance/teamType";

export const addTeam =
  (
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    devsPrice,
    technology,
    creationDate
  ) =>
  async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/teams`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          devsPrice,
          technology,
          creationDate,
        },
      });
      dispatch({
        type: ADD_TEAM,
        data: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export const fetchAllTeams =
  (searchQuery, TechnologyQuery, sortBy) => async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        // url: `${API_URL}/teams?searchText=${searchQuery}`,
        url: `${API_URL}/teams/fetchAllTeam`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { searchQuery, TechnologyQuery, sortBy },
      });
      dispatch({
        type: FETCH_TEAM,
        data: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export const deleteTeamById = (teamid) => async (dispatch) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${API_URL}/teams/${teamid}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { teamid },
    });
    dispatch({
      type: DELETE_TEAM,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTeamByid = (teamid) => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/teams/${teamid}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_TEAM_BY_ID,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateTeamByid =
  (
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    devsPrice,
    teamid,
    technology,
    creationDate
  ) =>
  async (dispatch) => {
    try {
      const response = await axios({
        method: "put",
        url: `${API_URL}/teams/${teamid}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          devsPrice,
          teamid,
          technology,
          creationDate,
        },
      });
      dispatch({
        type: UPDATE_TEAM_BY_ID,
        data: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export const TeamsGeneratePDF = () => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/TeamsGeneratePDF`,
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    if (response.status === 200) {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(response.data);
      // downloadLink.download = `PO_${ordercode.replace(".", "/")}.pdf`;
      downloadLink.download = "Teams_PDF.pdf";
      downloadLink.click();
    }
    dispatch({
      type: TEAMS_GENRATE_PDF,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
