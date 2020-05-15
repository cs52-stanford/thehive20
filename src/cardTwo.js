import React, { useState } from "react";
import { css } from "emotion";

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

const handleSubmit = (props) => {
  props.addDonation([props.displayName, props.numTrees, props.message]);
  props.setIsFirstCard(true);
}

const DonationDetails = (props) =>  {
  return <div id="donation-style">
    <textarea id="entry1" className="donation-text" value={props.displayName} onChange={(event) => handleChange(props, event)}/>
    <textarea id="entry2" className="donation-text" value={props.email} onChange={(event) => handleChange(props, event)}/>
    <textarea id="entry3" className="donation-text" value={props.message} onChange={(event) => handleChange(props, event)}/>
    <div className={css`display: flex; flex-direction: row; justify-content: flex-end; width:100%`}>
      <div className="next-button previous-color" onClick={() => handlePrevious(props)}>Previous</div>
      <div className="next-button" onClick={() => handleSubmit(props)}>Submit</div>
    </div>
  </div>
}


const Second_Card = (props) => {
  const displayNamePlaceHolder = "Display Name";
  const emailPlaceHolder = "Email";
  const messagePlaceHolder = "My #TeamTrees message is..";

  const [displayName, setDisplayName] = useState(displayNamePlaceHolder);
  const [email, setEmail] = useState(emailPlaceHolder);
  const [message, setMessage] = useState(messagePlaceHolder);
  
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
        >Details</div>
        {/* Hint: You'll be adding props to DonationDetails as you go!*/}
        <DonationDetails displayName={displayName} setDisplayName={setDisplayName} email={email}
        setEmail={setEmail} message={message} setMessage={setMessage} setIsFirstCard={props.setIsFirstCard}
        addDonation={props.addDonation} numTrees={props.numTrees}/>
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