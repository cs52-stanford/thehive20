import React, { Component, useState } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

import { css } from "emotion";
import moment from "moment";

import Donation from "./donation.js";
import sock from "./images/sock.svg";
import meal from "./images/meal.svg";
import lamp from "./images/lamp.svg";
import bed from "./images/bed.svg";
import house from "./images/house.svg";

var emily = house;

const handleClick = (props, event) => {
  document.getElementById(props.selected).classList.remove("active");
  event.target.classList.add("active");
  props.setSelected(event.target.id);
  switch (event.target.id) {
    case "sortTime":
      props.setSortby("orderDate");
      break;
    case "sortAmount":
      props.setSortby("orderAmount");
      break;
  }
};

const SortByWidget = (props) => {
  return (
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
      <div
        className="donation-sort active"
        id="sortTime"
        onClick={(event) => handleClick(props, event)}
      >
        Most Recent
      </div>
      <div
        className="donation-sort"
        id="sortAmount"
        onClick={(event) => handleClick(props, event)}
      >
        Most
      </div>
    </div>
  );
};

const Leaderboard = (props) => {
  const default_button = "sortTime";

  const [selectedButton, setSelectedButton] = useState(default_button);

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
            <SortByWidget
              selected={selectedButton}
              setSelected={setSelectedButton}
              setSortby={props.setSortby}
            />
            <div
              style={{ height: "500px", overflowY: "scroll" }}
              className={css`
                color: #4b7330;
                background-color: #f6f6f4;
                padding: 1rem 1.25rem 0.8rem;
              `}
            >
              {props.sortby == "orderDate"
                ? props.donationsD.map((item) => {
                    item.avatar = house;
                    if (item.numTrees < 5) {
                      item.avatar = sock;
                    } else if (item.numTrees < 10) {
                      item.avatar = meal;
                    } else if (item.numTrees < 50) {
                      item.avatar = bed;
                    } else if (item.numTrees < 60) {
                      item.avatar = lamp;
                    }
                    return (
                      <Donation
                        key={item.key}
                        avatar={item.avatar}
                        name={item.displayName}
                        numTrees={item.numTrees}
                        message={item.message}
                        date={item.date}
                      />
                    );
                  })
                : props.donationsA.map((item) => {
                    item.avatar = house;
                    if (item.numTrees < 5) {
                      item.avatar = sock;
                    } else if (item.numTrees < 10) {
                      item.avatar = meal;
                    } else if (item.numTrees < 50) {
                      item.avatar = bed;
                    } else if (item.numTrees < 60) {
                      item.avatar = lamp;
                    }
                    return (
                      <Donation
                        key={item.key}
                        avatar={item.avatar}
                        name={item.displayName}
                        numTrees={item.numTrees}
                        message={item.message}
                        date={item.date}
                      />
                    );
                  })}
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
