import React, { useState, useRef } from "react";
import { Tooltip, Popover, FloatButton } from "antd";
import "../styles/Timer.css";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

const Timer = () => {
  const [singleLeft, setSingleLeft] = useState(false);
  const [singleTop, setSingleTop] = useState(false);

  const [time, setTime] = useState(0); // time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div
      className="ascSmooth timerDiv z-10 text-center mt-2 p-3"
      style={{
        left: singleLeft ? "20px" : "77%",
        right: singleLeft ? "auto" : "20px",
        maxWidth: "fit-content",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <div className="flex justify-between">
        <DoubleLeftOutlined
          onClick={() => {
            setSingleLeft(true);
          }}
        />
        <DoubleRightOutlined
          onClick={() => {
            // setSingleRight(true);
            setSingleLeft(false);
          }}
        />
      </div>

      {/* <p className="timerText">Timer: {formatTime(time)}</p> */}
      <p className="timerText">
        <AccessAlarmIcon /> {formatTime(time)}
      </p>

      <div className="flex gap-2 justify-between pt-2">
        <button
          className="timerButton"
          onClick={startTimer}
          disabled={isRunning}
        >
          Start
        </button>

        <button
          className="timerButton"
          onClick={stopTimer}
          disabled={!isRunning}
        >
          Stop
        </button>

        <button
          className="timerButton"
          onClick={startTimer}
          disabled={isRunning || time === 0}
        >
          Resume
        </button>

        <button className="timerButton" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
