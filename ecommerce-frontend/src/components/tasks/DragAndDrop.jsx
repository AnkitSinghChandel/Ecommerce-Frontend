import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import "../../styles/DragAndDrop.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  addStatus,
  fetchAllStatus,
  deleteStatusById,
  addTask,
  fetchAllTask,
  updateTaskById,
  updateAllMultiTasks,
  deleteTaskById,
} from "../../redux/actions/taskAction";
import { useSelector, useDispatch } from "react-redux";
import addicon from "../../assets/icons/addicon.svg";
import binIcon from "../../assets/icons/Bin.svg";
import TaskModal from "./TaskModal";
import { Tooltip } from "antd";
import GlobalButton from "../../buttons/GlobalButton";
import CancelPopup from "../../dialogs/CancelPopup";

const DragAndDrop = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [Ankit] = useAutoAnimate();

  // Drag-End start from here 👇.
  const handleDragEnd = (result) => {
    // if (!result.destination) return;
    if (!result.destination) {
      console.log("Task was dropped outside any droppable area.");
      return;
    }

    const { source, destination } = result;

    // only for Log the dragged item👇
    const draggedTask = allStatusData
      .flatMap((column) => column.tasks)
      .find((task) => task.taskId === result.draggableId);

    console.log("Dragged Item Details:", draggedTask);
    console.log("Source Dragged Column ID From:", source.droppableId);
    console.log("Source Dragged Index:", source.index);
    console.log("Destination Dropped Column ID To:", destination.droppableId);
    console.log("Destination Dropped Index:", destination.index);
    // only for Log the dragged item👆

    let movedItems = [];

    // If task is moved within the same column ✍️.
    if (source.droppableId === destination.droppableId) {
      // const tempMainBox = [...allStatusData];
      const tempMainBox = allStatusData.map((column) => ({
        ...column,
        tasks: [...column.tasks],
      }));

      // Find source data columns
      const sourceColumn = tempMainBox.find(
        (column) => column.statusId === source.droppableId
      );
      // Remove the task from the source column
      const [removedTask] = sourceColumn.tasks.splice(source.index, 1);

      // Add task to destination column
      sourceColumn.tasks.splice(destination.index, 0, removedTask);

      // only for Log which items changed their position within the same column👇
      movedItems = [
        {
          taskId: removedTask.taskId,
          taskName: removedTask.taskName,
          fromColumn: source.droppableId,
          fromIndex: source.index, // Real index in source column.
          toColumn: destination.droppableId,
          toIndex: destination.index, // Real index in destination column.
        },
      ];

      // Updated all tasks in both source and destination columns below
      const finalList = [];
      sourceColumn.tasks.map((item, index) => {
        finalList.push({
          taskName: item.taskName,
          taskId: item?.taskId,
          _id: item?._id,
          status: source.droppableId,
          indexPosition: index + 1,
        });
      });
      // only for Log which items changed their position within the same column👆

      setAllStatusData(tempMainBox);
      console.log("All Data:", tempMainBox);
      console.log("only moved Task:", movedItems);
      sendPayload(finalList);
      console.log("asc finalList", finalList);
    }

    // If task is moved between multiple columns ✍️.
    else {
      // const tempMainBox = [...allStatusData];
      const tempMainBox = allStatusData.map((column) => ({
        ...column,
        tasks: [...column.tasks],
      }));

      // Find source data columns
      const sourceColumn = tempMainBox.find(
        (column) => column.statusId === source.droppableId
      );
      // Find destination columns
      const destColumn = tempMainBox.find(
        (column) => column.statusId === destination.droppableId
      );
      // Remove the task from the source column
      const [removedTask] = sourceColumn.tasks.splice(source.index, 1);

      // Add task to destination column
      destColumn.tasks.splice(destination.index, 0, removedTask);

      // only for Log which items changed their position across the column👇
      movedItems = [
        {
          taskId: removedTask.taskId,
          taskName: removedTask.taskName,
          fromColumn: source.droppableId,
          fromIndex: source.index, // Real index in source column.
          toColumn: destination.droppableId,
          toIndex: destination.index, // Real index in destination column.
        },
      ];

      // Updated all tasks in both source and destination columns below
      const finalList = [];
      destColumn.tasks.map((item, index) => {
        finalList.push({
          taskName: item.taskName,
          taskId: item?.taskId,
          _id: item?._id,
          status: destination.droppableId,
          indexPosition: index + 1,
        });
      });

      sourceColumn.tasks.map((item, index) => {
        finalList.push({
          taskName: item.taskName,
          taskId: item?.taskId,
          _id: item?._id,
          status: source.droppableId,
          indexPosition: index + 1,
        });
      });
      // only for Log which items changed their position across the column👆

      setAllStatusData(tempMainBox);
      console.log("All Data:", tempMainBox);
      console.log("only moved Task 33:", movedItems);
      sendPayload(finalList);
      console.log("asc finalList 33", finalList);
    }
  };

  const sendPayload = (data) => {
    console.log("asc payload", data);
    data.forEach((item) => {
      delete item.taskName;
      delete item.id;
      delete item._id;
    });
    console.log("asc final payload:", data);
    dispatch(updateAllMultiTasks(data));
  };
  // Drag-End end from above👆.

  // with states and all things below.
  const fetchAllStatusRes = useSelector(
    (state) => state.task.fetchAllStatusRes
  );

  const updateTaskByIdRes = useSelector(
    (state) => state.task.updateTaskByIdRes
  );

  const updateAllMultiTasksRes = useSelector(
    (state) => state.task.updateAllMultiTasksRes
  );

  const deleteTaskByIdRes = useSelector(
    (state) => state.task.deleteTaskByIdRes
  );

  const addTaskRes = useSelector((state) => state.task.addTaskRes);
  const addStatusRes = useSelector((state) => state.task.addStatusRes);

  const deleteStatusByIdRes = useSelector(
    (state) => state.task.deleteStatusByIdRes
  );

  const [allStatusData, setAllStatusData] = useState([]);
  const [statusName, setStatusName] = useState("");
  const [statusID, setStatusID] = useState("");

  const [allTaskName, setAllTaskName] = useState([]);
  const [taskID, setTaskID] = useState("");
  const [deleteBoxOpen, setDeleteBoxOpen] = useState(false);
  const [taskModelShow, setTaskModelShow] = useState(false);
  const [modalFunction, setModalFunction] = useState();

  // asc cancel popup start //
  const [cancelPopupShow, setCancelPopupShow] = useState(false);
  const handleClose = () => setCancelPopupShow(false);

  const handleYes = (e) => {
    dispatch(deleteStatusById(statusID));
    setCancelPopupShow(false);
  };
  const [typeInScreen, setTypeInScreen] = useState("");
  // asc cancel popup end //

  useEffect(() => {
    dispatch(fetchAllStatus());
    dispatch(fetchAllTask());
  }, [
    dispatch,
    updateTaskByIdRes,
    updateAllMultiTasksRes,
    deleteTaskByIdRes,
    addTaskRes,
    deleteStatusByIdRes,
    addStatusRes,
  ]);

  useEffect(() => {
    if (fetchAllStatusRes?.status === true) {
      setAllStatusData(fetchAllStatusRes?.data);
    }
  }, [fetchAllStatusRes]);

  useEffect(() => {
    if (id) {
      setTaskModelShow(true);
      setModalFunction("update");
      setTaskID(id);
    }
  }, [id]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(addStatus(statusName));
      setStatusName("");
    }
  };

  return (
    <div className="">
      {taskModelShow && (
        <TaskModal
          open={taskModelShow}
          onCancel={() => setTaskModelShow(false)}
          // onOk={handleYes}
          keyboard={false}
          taskModelShow={taskModelShow}
          setTaskModelShow={setTaskModelShow}
          modalFunction={modalFunction}
          setModalFunction={setModalFunction}
          statusName={statusName}
          setStatusName={setStatusName}
          statusID={statusID}
          setStatusID={setStatusID}
          taskID={taskID || id}
          setTaskID={setTaskID}
        />
      )}

      {cancelPopupShow && (
        <CancelPopup
          open={cancelPopupShow}
          // onCancel={() => setCancelPopupShow(false)}
          onCancel={handleClose}
          onOk={handleYes}
          title={""}
          keyboard={true}
        />
      )}

      <div className="p-4">
        <div className="flex gap-3">
          <div>
            <input
              type="text"
              className="asc-Normal-Input"
              placeholder="Add Status Name"
              value={statusName}
              onChange={(e) => {
                setStatusName(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>

          <GlobalButton
            disabled={statusName === ""}
            className="customAddCss"
            label={"Add Status"}
            onClick={() => {
              dispatch(addStatus(statusName));
              setStatusName("");
            }}
          />
        </div>
      </div>
      {/* add status end */}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="overflow-auto p-5">
          <div className="DragDropWrapper p-3" ref={Ankit}>
            {allStatusData
              .sort((a, b) => a.statusId - b.statusId)
              .map((column, index) => {
                return (
                  <Droppable droppableId={column.statusId} key={index}>
                    {(provider, snapshot) => (
                      <div
                        // className="mainBoxCss p-3"
                        className={`mainBoxCss p-3 ${
                          snapshot.isDraggingOver ? "isDraggingOver" : ""
                        }`}
                        ref={provider.innerRef}
                        {...provider.droppableProps}
                      >
                        <div className="flex statusName p-2">
                          <Tooltip title="Delete Status" color="red">
                            <img
                              src={binIcon}
                              alt=""
                              className="pointer"
                              width={20}
                              onClick={() => {
                                // dispatch(deleteStatusById(column.statusId));
                                setCancelPopupShow(true);
                                setStatusID(column.statusId);
                              }}
                            />
                          </Tooltip>

                          <p className="mb-0">{column.statusName}</p>

                          <Tooltip title="Add Status">
                            <img
                              src={addicon}
                              alt=""
                              className="pointer"
                              width={30}
                              onClick={() => {
                                setStatusID(column.statusId);
                                setStatusName(column.statusName);
                                setTaskModelShow(true);
                                setModalFunction("add");
                                console.log("asc22", column.statusName);
                              }}
                            />
                          </Tooltip>
                        </div>

                        {column.tasks.map((item, index) => {
                          return (
                            <Draggable
                              key={item.taskId}
                              draggableId={item.taskId}
                              index={index}
                            >
                              {(provider, snapshot) => (
                                <div
                                  // className="mainItemCss pb-1"
                                  className={`mainItemsDiv mt-3 ${
                                    snapshot.draggingOver ? "draggingOver" : ""
                                  }`}
                                  ref={provider.innerRef}
                                  {...provider.draggableProps}
                                  {...provider.dragHandleProps}
                                >
                                  <div className="relative" ref={Ankit}>
                                    <p
                                      className="taskitems mb-0"
                                      onContextMenu={(e) => {
                                        e.preventDefault();
                                        setDeleteBoxOpen((prev) => !prev);
                                        setTaskID(item.taskId);
                                      }}
                                      onClick={(e) => {
                                        setTaskID(item.taskId);
                                        setStatusID(column.statusId);
                                        setStatusName(column.statusName);
                                        setTaskModelShow(true);
                                        setModalFunction("update");
                                        console.log(
                                          "asc222",
                                          column.statusName
                                        );
                                      }}
                                    >
                                      {item.taskName}
                                    </p>

                                    {deleteBoxOpen &&
                                      taskID === item.taskId && (
                                        <div
                                          className="deleteTask pointer"
                                          onClick={() => {
                                            dispatch(
                                              deleteTaskById(item.taskId)
                                            );
                                          }}
                                        >
                                          <img src={binIcon} alt="" />
                                          <p className="mb-0">Delete</p>
                                        </div>
                                      )}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provider.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default DragAndDrop;
