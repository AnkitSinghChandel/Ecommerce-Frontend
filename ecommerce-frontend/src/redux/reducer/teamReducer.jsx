const initialState = {
  addTeamRes: {},
  fetchTeamRes: {},
  deleteTeamRes: {},
  fetchTeambyidRes: {},
  updateTeambyidRes: {},
  teamsGenratePDFRes: {},
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TEAM":
      return {
        ...state,
        addTeamRes: action.data,
      };

    case "FETCH_TEAM":
      return {
        ...state,
        fetchTeamRes: action.data,
      };

    case "DELETE_TEAM":
      return {
        ...state,
        deleteTeamRes: action.data,
      };

    case "FETCH_TEAM_BY_ID":
      return {
        ...state,
        fetchTeambyidRes: action.data,
      };

    case "UPDATE_TEAM_BY_ID":
      return {
        ...state,
        updateTeambyidRes: action.data,
      };

    case "TEAMS_GENRATE_PDF":
      return {
        ...state,
        teamsGenratePDFRes: action.data,
      };

    default:
      return { ...state };
  }
};

export default teamReducer;
