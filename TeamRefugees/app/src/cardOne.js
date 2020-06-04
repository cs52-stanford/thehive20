import React, { useState, useEffect } from "react";
import { css } from "emotion";
import dots from "./images/dots.svg";

const handleClick = (props, event) => {
  document.getElementById(props.selected).classList.remove("active");
  event.target.classList.add("active");
  props.setSelected(event.target.id);
}

const handleChange = (props, event) => {
    props.setCustomAmount(event.target.value);
    props.setNumTrees(event.target.value);
  }
const handleNext = (props) => {
  props.setIsFirstCard(false);
  switch(props.selected) {
    case "tree10":
      props.setNumTrees(10);
      break;
    case "tree20":
      props.setNumTrees(20);
      break;
    case "tree50":
      props.setNumTrees(50);
      break;
    case "entry3":
      
  }
}

const EnterAmountWidget = (props) =>  {
  return <div id="widget-style">
    <div className={css`margin-bottom: 1.5rem; margin-top: 1rem;`}>
      <div>$1 PLANTS A TREE</div>
      <img src={dots} className={css`max-width: 2.25rem;`}/>
    </div>
    <div className={css`display: flex; flex-direction: row; justify-content: space-around;`}>
      <div className="tree-amount-button" id="tree10" onClick={(event) => handleClick(props, event)}>10<br/>Trees</div>
      <div className="tree-amount-button active" id="tree20" onClick={(event) => handleClick(props, event)}>20<br/>Trees</div>
      <div className="tree-amount-button" id="tree50" onClick={(event) => handleClick(props, event)}>50<br/>Trees</div>
      <textarea id="entry3" className="donation-text" value={props.customAmount} onClick={(event) => handleClick(props, event)} onChange={(event) => handleChange(props, event)}/>
    </div>
    <div className={css`display: flex; flex-direction: row; justify-content: flex-end;`}>
      <div className="next-button" onClick={() => handleNext(props)}>Next</div>
    </div>
  </div>
}

const First_Card = (props) => {
  const numTreesPlaceHolder = "other amount";

  const [customAmount, setCustomAmount] = useState(numTreesPlaceHolder);

  const default_button = "tree20"
  
  const [selectedButton, setSelectedButton] = useState(default_button);
  const [err, setErr] = useState("");

  
  return <div 
    className={css`
    width: 576px;
    `
    }>
      <div
        className={css`
          display: flex;
          flex-direction: column;
        `}
        >
        <div
          className={css`
            border-radius: calc(.5rem - 1px) calc(.5rem - 1px) 0 0;
            flex-direction: column;
            color: #273654;
            background-color: #f6f6f4;
            padding: 1rem 1.25rem .8rem;
            border-bottom: 1px solid #eee;
            text-transform: uppercase!important;
            text-align: center!important;
            box-sizing: border-box;
            font-size: 1rem;
            font-weight: 600;
          `}
        >JOIN #TEAMTREES. GIFT #TEAMTREES</div>
        {/* Hint: You'll be adding props to EnterAmountWidget as you go!*/}
        <EnterAmountWidget selected={selectedButton} setSelected={setSelectedButton} setIsFirstCard={props.setIsFirstCard} setNumTrees={props.setNumTrees} setCustomAmount={setCustomAmount} customAmount={customAmount}/>
        <div
          className={css`
            border-radius: 0 0 calc(.5rem - 1px) calc(.5rem - 1px);
            background-color: #f6f6f4;
            border-top: 1px solid #eee;
            padding: .75rem 1.25rem;
            flex-direction: column;
            font-weight: 400;
            margin-bottom: 0!important;
            text-transform: uppercase!important;
            font-size: 70%;
            text-align: center!important;
            color: #518360;
        `}
        >FAQ</div>
      </div>
    </div>
}

export default First_Card;
