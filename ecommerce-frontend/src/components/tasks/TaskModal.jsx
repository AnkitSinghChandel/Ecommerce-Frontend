import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Flex, Modal } from "antd";
// import Draggable from "react-draggable";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { addTask, fetchTaskById } from "../../Redux/actions/taskAction";
import { ADD_TASK, FETCH_TASK_BY_ID } from "../../redux/constance/taskType";
import { useSelector, useDispatch } from "react-redux";
// import TaskEditor from "./TaskEditor";

const TaskModal = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = useParams();
  console.log("params", params.id);
  const [Ankit] = useAutoAnimate();

  const fetchTaskByIdRes = useSelector((state) => state.task.fetchTaskByIdRes);
  const addTaskMessageRes = useSelector(
    (state) => state.task.addTaskMessageRes
  );

  const fetchMessageByTaskIdRes = useSelector(
    (state) => state.task.fetchMessageByTaskIdRes
  );

  const [taskName, setTaskName] = useState("");
  const [warning, setWarning] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [modelOpen, setModelOpen] = useState(true);

  useEffect(() => {
    if (props.taskID && props.modalFunction === "update") {
      navigate(`/DragDrop2/task/${props.taskID}`);
    }
  }, [navigate, props.taskID, props.modalFunction]);

  useEffect(() => {
    if (props.taskID && props.modalFunction === "update") {
      dispatch(fetchTaskById(props.taskID || params.id));
    }
  }, [dispatch, props.taskID, params.id, props.modalFunction]);

  useEffect(() => {
    if (fetchTaskByIdRes.status === true) {
      setTaskName(fetchTaskByIdRes.data.taskName);
    }
  }, [fetchTaskByIdRes]);

  const handleAddModel = () => {
    if (taskName === "") {
      setWarning(true);
      return false;
    }

    if (props.modalFunction === "add") {
      dispatch(addTask(taskName, props.statusID));
    } else {
      // dispatch(addTask(taskName, props.statusID));
    }
    setShowLoader(true);
    props.onHide();
  };

  console.log("asc props", props);

  const clearAllDataWhenModalClose = () => {
    console.log("onHide triggered! Closing modal22");
    props.setTaskModelShow(false);
    dispatch({
      type: FETCH_TASK_BY_ID,
      data: {},
    });
    setModelOpen(false);
    navigate("/DragDrop2");
  };

  return (
    <div>
      <Modal
        {...props}
        title={props.title}
        centered
        open={props.open}
        onOk={() => props.onOk()}
        onCancel={() => props.onCancel()}
        maskClosable={false}
        loading={false}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
        footer={[
          <div className="flex justify-center gap-5">
            <Button
              key="back"
              onClick={props.onCancel}
              className="cancelButton ascButton"
            >
              Cancel
            </Button>

            <Button
              key="submit"
              loading={props.loading}
              className="addButton ascButton"
              onClick={() => {
                props.onOk();
              }}
            >
              Add Task
            </Button>
          </div>,
        ]}
      >
        <div className="py-4">
          <div className="text-[20px] text-[#212529]">
            Modal {props.statusName}
            {props.modalFunction === "update" && "Update"}
          </div>

          <div className="pt-6">
            <div className="asc-input-container" id="ascNewInput">
              <label className="asc-top-label labelText">First Name</label>
              <input
                type="text"
                // disabled
                autoFocus={true}
                className="asc-Normal-Input"
                style={{
                  border: warning && !taskName && "1.5px solid #dc3545",
                }}
                placeholder="Enter your Task Name"
                value={taskName}
                onChange={(e) => {
                  setTaskName(e.target.value);
                  // setTypeInScreen(e.target.value);
                }}
              />
              <br />
              <span className="warningTxt ps-2">
                {warning && !taskName && "Please fill your first name!"}
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskModal;
