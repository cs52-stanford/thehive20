import React, { useState, useEffect } from "react";
import { css } from "emotion";
import dots from "./images/dots.svg";
import sockblack from "./images/sockblack.svg";
import mealblack from "./images/mealblack.svg";
import bedblack from "./images/bedblack.svg";
// This is the first card on the donation form beneath map

const SelectDonationButton = (props) => {
  const handleClick = (event) => {
    console.log(props.selected);
    console.log(props.id);
    props.setSelected(props.id);
  };

  return (
    <div
      className={
        "amount-button" + (props.selected === props.id ? " active" : "")
      }
      id={props.id}
      onClick={(event) => handleClick(event)}
    >
      <div> {props.amount} </div>
      <img
        src={props.image}
        className={css`
          max-width: 4.25rem;
        `}
      ></img>
    </div>
  );
};

const EnterAmountWidget = (props) => {
  const handleChange = (props, event) => {
    props.setCustomAmount(event.target.value);
    props.setNumTrees(event.target.value);
  };

  const handleNext = (event) => {
    switch (props.selected) {
      case "amt1":
        props.setNumTrees(1);
        props.setIsFirstCard(false);
        break;
      case "amt5":
        props.setNumTrees(5);
        props.setIsFirstCard(false);
        break;
      case "amt10":
        props.setNumTrees(10);
        props.setIsFirstCard(false);
        break;
      case "amtCustom":
        if (parseInt(props.customAmount) && props.customAmount > 0) {
          props.setIsFirstCard(false);
        } else {
          document.getElementById("demo").innerHTML =
            "Please enter a valid donation amount!";
        }
    }
  };

  return (
    <div id="widget-style">
      <div
        className={css`
          margin-bottom: 1.5rem;
          margin-top: 1rem;
        `}
      >
        <div>$1 = warm feet on a cold night</div>
        <div>$5 = satisfiying meal in someone's belly</div>
        <div>$10 = a place to sleep</div>
        <div>$50 = a light in the dark</div>
        <div>$50+ = a roof over someone's head</div>
        <img
          src={dots}
          className={css`
            max-width: 2.25rem;
          `}
        />
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        `}
      >
        <SelectDonationButton
          selected={props.selected}
          setSelected={props.setSelected}
          id={"amt1"}
          amount={"1"}
          image={sockblack}
        />
        <SelectDonationButton
          selected={props.selected}
          setSelected={props.setSelected}
          id={"amt5"}
          amount={"5"}
          image={mealblack}
        />
        <SelectDonationButton
          selected={props.selected}
          setSelected={props.setSelected}
          id={"amt10"}
          amount={"10"}
          image={bedblack}
        />
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        `}
      >
        <textarea
          id="amtCustom"
          className="donation-text"
          value={props.customAmount}
          placeholder="custom amount"
          onClick={(event) => props.setSelected("amtCustom")}
          onChange={(event) => handleChange(props, event)}
        />
      </div>
      <p id="demo"></p>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
        `}
      >
        <div className="next-button" onClick={() => handleNext(props)}>
          Next
        </div>
      </div>
    </div>
  );
};

const First_Card = (props) => {
  const default_button = "amt5";
  const numTreesPlaceHolder = "other amount";

  const [customAmount, setCustomAmount] = useState();

  const [selectedButton, setSelectedButton] = useState(default_button);
  const [err, setErr] = useState("");

  return (
    <div
      className={css`
        width: 576px;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          className={css`
            border-radius: calc(0.5rem - 1px) calc(0.5rem - 1px) 0 0;
            flex-direction: column;
            color: #5b92e5;
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
          DONATE FOR YOUR UNIVERSITY, COMPETE, SPREAD THE WORD!
        </div>
        {/* Hint: You'll be adding props to EnterAmountWidget as you go!*/}
        <EnterAmountWidget
          selected={selectedButton}
          setSelected={setSelectedButton}
          setIsFirstCard={props.setIsFirstCard}
          setNumTrees={props.setNumTrees}
          setCustomAmount={setCustomAmount}
          customAmount={customAmount}
        />
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
        >
          FAQ
        </div>
      </div>
    </div>
  );
};

export default First_Card;
