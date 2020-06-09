import React, { useState, useEffect } from "react";
import { css } from "emotion";
import * as Papa from 'papaparse';
import * as File from 'File';


import rootRef from "./firebase.js";

import moment from "moment";
import { csv } from 'd3-request';
import colleges from "./CollegesForHive.csv";



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
    case "entry4":
      props.setCollege(event.target.value);
      break;
  }
}

const handlePrevious = (props) => {
  props.setIsFirstCard(true);
}

function getDonationName (p1) {
  if (p1 == undefined){
    return "Anonymous";
  }
  return p1;
}

function getMessage (p1) {
  if (p1 == undefined){
    return "No Message";
  }
  return p1;
}


function getMapFromCSV(){
  
  return csv(colleges, function(err, data) {
    if (err) {  
      console.log(err);
    } else{
      console.log(data);
      var dataset = data;

      var names = new Array(dataset.length).fill(0);
      
      for (var i = 0; i < dataset.length; i++){
        names[i] = dataset[i].NAME;
      }
    }
    console.log(names);
    var select = document.getElementById("productName"); 
    for (var i = 0; i < names.length; i++){
      var opt = names[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }
    
   });
  }

  


const handleSubmit = (props) => {
  var time = moment()
  var date = time.format("L h:mm:ss A");
  const donationRef = rootRef.child('donation');
  var newChildRef = donationRef.push();

  var options = document.getElementById('productName').getElementsByTagName('option');
  var optionVals = new Array(options.length).fill(0);
  for (var i=0; i < options.length; i += 1) {
    optionVals[i] = options[i].value;
  }

  console.log("optionVals", optionVals);
  console.log("props.college", props.college);

  var isValid = optionVals.indexOf(props.college) >= 0;
  if(!isValid){
    document.getElementById("Valid College").innerHTML = "Please enter a valid college!";
  }
  const new_donation = {
    displayName: getDonationName(props.displayName),
    numTrees: props.numTrees,
    message: getMessage(props.message),
    college: props.college,
    date: date,
    orderDate: -1*time.valueOf(),
    orderAmount: -1*props.numTrees
  }
  newChildRef.set(new_donation);
  if(isValid){
    props.setIsFirstCard(true);
  }
}



const DonationDetails = (props) =>  {
  useEffect(() => {
    getMapFromCSV();
    
  }, []);
  
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

    <div className={css` 
     font-size: 1rem;
     font-weight: 300;
     text-align: center!important;
     color: #8A8989;
     font-family: "courier";
 `}
        
    >Select College</div>

    <input id="entry4"
    className={css`display: flex; flex-direction: row; justify-content: flex-end;
    border-radius: 0.25rem; box-shadow: none;
    border-style: solid;
    border-color: #CFCFCF; border-width: 0.1px;
    font-family: "courier"; font-size: 1rem;
    font-weight: 300; height: 40px; width:93.5%`} 
      type="text" name="product" 
      onChange={(event) => handleChange(props, event)}
      placeholder = " Choose not to specify" list="productName"/>
      <datalist id="productName">
      <option value="Choose not to specify">Choose not to specify</option>
      </datalist>
      <p id="Valid College"></p>

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
  const [college, setCollege] = useState("Choose not to specify");
  
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

        setEmail={setEmail} message={message} setMessage={setMessage} college={college} 
        setCollege={setCollege} setIsFirstCard={props.setIsFirstCard}
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