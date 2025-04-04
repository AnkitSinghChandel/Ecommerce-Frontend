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

  const [totalTime, setTotalTime] = useState(0); // total totalTime in seconds.
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      timerRef.current = setInterval(() => {
        setTotalTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTotalTime(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const convertToHMS = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const min = Math.floor((totalSeconds % 3600) / 60);
    const sec = totalSeconds % 60;
    return { hrs, min, sec };
  };

  const { hrs, min, sec } = convertToHMS(totalTime);

  console.log("⏱ Timer Raw Seconds:", totalTime);
  console.log("⏳ Hours:", hrs, "Minutes:", min, "Seconds:", sec);

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

      {/* <p className="timerText">Timer: {formatTime(totalTime)}</p> */}
      <div className="timerText flex justify-center items-center">
        <AccessAlarmIcon />
        <p className="min-w-[90px]">{formatTime(totalTime)}</p>
        <img src={isTimerRunning && "clock3.gif"} width={20} />
      </div>

      <div className="flex gap-2 justify-between pt-2">
        <button
          className="timerButton"
          onClick={startTimer}
          disabled={isTimerRunning}
        >
          Start
        </button>

        <button
          className="timerButton"
          onClick={stopTimer}
          disabled={!isTimerRunning}
        >
          Stop
        </button>

        <button
          className="timerButton"
          onClick={startTimer}
          disabled={isTimerRunning || totalTime === 0}
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
