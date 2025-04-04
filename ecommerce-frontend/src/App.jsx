import React, { useEffect, useState } from "react";
import "./App.css";
import "animate.css";

// AOS BELOW👇
import "aos/dist/aos.css";
import AOS from "aos";

import CustomToastify from "./notification-alert/CustomToastify";

import Routers from "./routes/Routers";
import NetworkStatus from "./errors/NetworkStatus";
import Timer from "./timer/Timer";

function App() {
  // Initialize AOS by ASC
  useEffect(() => {
    AOS.init();
  }, []);

  // for SEO friendly dynamic url start
  useEffect(() => {
    document
      .querySelector('meta[property="og:url"]')
      .setAttribute("content", window.location.href);
  }, []);
  // for SEO friendly dynamic url end

  return (
    <div className="App">
      <CustomToastify />
      <Routers />
      <NetworkStatus />
      <Timer />
    </div>
  );
}

export default App;
