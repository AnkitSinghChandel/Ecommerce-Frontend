import { useState, useEffect } from "react";

const useDeviceType = () => {
  const [device, setDevice] = useState("webview");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setDevice("mobileview");
      } else if (window.innerWidth <= 1024) {
        setDevice("tabview");
      } else {
        setDevice("webview");
      }
    };

    handleResize(); // Set the initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log("DeviceType", device);
  return device;
};

export default useDeviceType;
