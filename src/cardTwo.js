import React, { useState } from "react";
import { css } from "emotion";

import rootRef from "./firebase.js";

import moment from "moment";

const handleChange = (props, event) => {
  let curr_id = event.target.id;
  switch(curr_id) {
    case "entry1":
      props.setDisplayName(event.target.value);
      break;
    case "entry2":
      props.setEmail(event.target.value);
      break;
    case "entry3":
      props.setMessage(event.target.value);
      break;
  }
}

const handlePrevious = (props) => {
  props.setIsFirstCard(true);
}

function getDonationName (p1) {
  if (p1 == undefined){
    return "Anonymous"
  }
  return p1
}

function getMessage (p1) {
  if (p1 == undefined){
    return "No Message"
  }
  return p1
}

const handleSubmit = (props) => {
  var date = moment().format("L h:mm:ss A");
  const donationRef = rootRef.collection('donation');
  const new_donation = {
    displayName: getDonationName(props.displayName),
    numTrees: props.numTrees,
    message: getMessage(props.message),
    date: date
  }
  
  donationRef.add(new_donation);
  props.setIsFirstCard(true);
}

const DonationDetails = (props) =>  {
  return <div id="donation-style">
    <textarea 
    id="entry1" 
    className="donation-text" 
    value={props.displayName} 
    placeholder="Display name" 
    onChange={(event) => handleChange(props, event)}/>
    
    <textarea 
    id="entry2" 
    className="donation-text" 
    value={props.email} 
    placeholder="Email" 
    onChange={(event) => handleChange(props, event)}/>
    
    
    <textarea id="entry3"
    className="donation-text" 
    value={props.message} 
    placeholder="My #saverefugees message is..." 
    onChange={(event) => handleChange(props, event)}/>
    <div className={css`display: flex; flex-direction: row; justify-content: flex-end; width:100%`}>
      <div className="next-button previous-color" onClick={() => handlePrevious(props)}>Previous</div>
      <div className="next-button" onClick={() => handleSubmit(props)}>Submit</div>
    </div>
  </div>
}


const Second_Card = (props) => {
  const displayNamePlaceHolder = "Display Name";
  const emailPlaceHolder = "Email";
  const messagePlaceHolder = "My #Universities4Refugees message is..";

  //const [displayName, setDisplayName] = useState(displayNamePlaceHolder);
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  
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
            color: #5b92e5;
            background-color: #f6f6f4;
            padding: 1rem 1.25rem .8rem;
            border-bottom: 1px solid #eee;
            text-transform: uppercase!important;
            text-align: center!important;
            box-sizing: border-box;
            font-size: 1rem;
            font-weight: 600;
          `}
        >Details</div>
        {/* Hint: You'll be adding props to DonationDetails as you go!*/}
        <DonationDetails displayName={displayName} setDisplayName={setDisplayName} email={email}
        setEmail={setEmail} message={message} setMessage={setMessage} setIsFirstCard={props.setIsFirstCard}
        numTrees={props.numTrees}/>
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

export default Second_Card;