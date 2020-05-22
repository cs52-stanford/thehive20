import React, { Component, useState } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

import { css } from "emotion";
import moment from "moment";

const Leaderboard = (props) => {
  return (
    <div>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          margin: 5rem 0 5rem 0;
        `}
      >
        <div
          className={css`
            width: 576px;
          `}
        >
          <div
            className={css`
              display: flex;
              flex-direction: column;

              margin: 0 1rem 10rem 1rem;
            `}
          >
            <div
              className={css`
                border-radius: calc(0.5rem - 1px) calc(0.5rem - 1px) 0 0;
                flex-direction: column;
                color: #004a98;
                background-color: #ffffff;
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
            <div
              className={css`
                display: flex;
                flex-direction: column;
                flex-direction: row;
                color: #4b7330;
                background-color: #f6f6f4;
                padding: 0.5rem 0.25rem 0.5rem;
                border-bottom: 1px solid #eee;
                text-transform: uppercase !important;
                text-align: center !important;
                box-sizing: border-box;
                font-size: 1rem;
                font-weight: 600;
              `}
            >
              <div className="donation-sort active">Most Recent</div>
              <div className="donation-sort">Most Trees</div>
            </div>
            <div
              style={{ height: "500px", overflowY: "scroll" }}
              className={css`
                color: #4b7330;
                background-color: #f6f6f4;
                padding: 1rem 1.25rem 0.8rem;
              `}
            >
              {props.donations}
            </div>

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
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="UNRefugeeAgency"
          options={{ height: "80.5%" }}
        />
      </div>
    </div>
  );
};

export default Leaderboard;
