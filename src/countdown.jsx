import React, { useEffect, useState } from "react";
import { css } from "emotion";

function CountdownTimer() {
  const calculateTimeLeft = () => {
    //to modify which day countdown timer will end modify the string in newDate("   ")
    const difference = +new Date("2021-01-01") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        secs: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];
  const timerLabels = [];

  Object.keys(timeLeft).forEach((interval) => {
    timerComponents.push(<span>{timeLeft[interval]} </span>);
    timerLabels.push(<span>{interval} </span>);
  });

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
        `}
      >
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
        `}
      >
        {timerLabels}
      </div>
    </div>
  );
}
export default CountdownTimer;
