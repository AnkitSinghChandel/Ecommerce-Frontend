import React from "react";
import { useNavigate } from "react-router";
import SelectBox from "../ASC-FOLDER/SelectBox";

const ASCFolder = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div
        className="pointer font-medium text-[16px] py-3"
        onClick={() => {
          navigate("/selectBox");
        }}
      >
        SelectBox
      </div>

      <div
        className="pointer font-medium text-[16px] py-3"
        onClick={() => {
          navigate("/drag-drop-demo");
        }}
      >
        DragAndDropDemo
      </div>

      <div
        className="pointer font-medium text-[16px] py-3"
        onClick={() => {
          navigate("/todo-task");
        }}
      >
        MyTodoTask
      </div>

      <div
        className="pointer font-medium text-[16px] py-3"
        onClick={() => {
          navigate("/todo-task2");
        }}
      >
        MyTodoTask2
      </div>

      <div
        className="pointer font-medium text-[16px] py-3"
        onClick={() => {
          navigate("/todo-task3");
        }}
      >
        MyTodoTask3
      </div>

      <div
        className="pointer font-medium text-[16px] py-3"
        onClick={() => {
          navigate("/check-uncheck");
        }}
      >
        CheckUncheck
      </div>
    </div>
  );
};

export default ASCFolder;
