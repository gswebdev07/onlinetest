import React, { useEffect, useState } from "react";
import { Timer } from "./styles";

import timeIcon from "../../../static/icons/png/005-stopwatch.png";

const index = ({ time, finish, setFinish}) => {
  const [timeMutate, setTimeMutate] = useState(null);
  // Timer
  function convertTime(t) {
    const min = Math.floor(t / 60);
    const sec = t % 60;
    return min + ":" + sec;
  }
  useEffect(() => {
    if (!finish) {
      if (timeMutate !== null) {
        if (timeMutate !== 0) {
          const interval = setInterval(() => {
            setTimeMutate((prevState) => prevState - 1);
          }, 1000);
          return () => clearInterval(interval);
        } else if (timeMutate === 0) {
          return setFinish(true);
        }
      }
    }
  }, [timeMutate, finish]);

  useEffect(() => {
    setTimeMutate(time);
  }, [time]);

  return (
    <Timer>
      <img
        alt="icon"
        src={timeIcon}
        width="25px"
        height="auto"
        style={{ marginRight: "10px" }}
      />
      {convertTime(timeMutate)}
    </Timer>
  );
};

export default index;
