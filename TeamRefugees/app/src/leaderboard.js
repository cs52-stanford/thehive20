import React, { Component, useState } from "react";

import { css } from "emotion";
import moment from "moment";


const Leaderboard = (props) => {

  return (
    <div>
      <div
        className={css`
          width: 576px;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: column;
            margin: 10rem 0 10rem 0;
          `}
        >
          <div
            className={css`
              border-radius: calc(0.5rem - 1px) calc(0.5rem - 1px) 0 0;
              flex-direction: column;
              color: #4b7330;
              background-color: #f6f6f4;
              padding: 1rem 1.25rem 0.8rem;
              border-bottom: 1px solid #eee;
              text-transform: uppercase !important;
              text-align: center !important;
              box-sizing: border-box;
              font-size: 1rem;
              font-weight: 600;
            `}
          >
            DONATIONS
          </div>

          {props.donations}

          <div
            className={css`
              border-radius: 0 0 calc(0.5rem - 1px) calc(0.5rem - 1px);
              background-color: #f6f6f4;
              border-top: 1px solid #eee;
              padding: 0.75rem 1.25rem;
              flex-direction: column;
              font-weight: 400;
              margin-bottom: 0 !important;
              text-transform: uppercase !important;
              font-size: 70%;
              text-align: center !important;
              color: #518360;
            `}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
