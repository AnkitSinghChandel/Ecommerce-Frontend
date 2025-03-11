const initialState = {
  addTaskRes: {},
  fetchAllTaskRes: {},
  fetchTaskByIdRes: {},
  updateTaskByIdRes: {},
  deleteTaskByIdRes: {},
  updateAllMultiTasksRes: {},
  addTaskMessageRes: {},
  fetchMessageByTaskIdRes: {},
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_STATUS":
      return {
        ...state,
        addStatusRes: action.data,
      };

    case "FETCH_ALL_STATUS":
      return {
        ...state,
        fetchAllStatusRes: action.data,
      };

    case "UPDATE_STATUS_BY_ID":
      return {
        ...state,
        updateStatusByIdRes: action.data,
      };

    case "DELETE_STATUS_BY_ID":
      return {
        ...state,
        deleteStatusByIdRes: action.data,
      };

    case "ADD_TASK":
      return {
        ...state,
        addTaskRes: action.data,
      };

    case "FETCH_ALL_TASK":
      return {
        ...state,
        fetchAllTaskRes: action.data,
      };

    case "FETCH_TASK_BY_ID":
      return {
        ...state,
        fetchTaskByIdRes: action.data,
      };

    case "UPDATE_TASK_BY_ID":
      return {
        ...state,
        updateTaskByIdRes: action.data,
      };

    case "DELETE_TASK_BY_ID":
      return {
        ...state,
        deleteTaskByIdRes: action.data,
      };

    case "UPDATE_ALL_MULTI_TASKS":
      return {
        ...state,
        updateAllMultiTasksRes: action.data,
      };

    case "SEND_MESSAGE":
      return {
        ...state,
        addTaskMessageRes: action.data,
      };

    case "FETCH_MESSAGE_BY_TASK_ID":
      return {
        ...state,
        fetchMessageByTaskIdRes: action.data,
      };

    default:
      return { ...state };
  }
};

export default taskReducer;
