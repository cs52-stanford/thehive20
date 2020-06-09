import React, { useState, useEffect } from "react";
import { css } from "emotion";
import * as Papa from 'papaparse';
import * as File from 'File';


import rootRef from "./firebase.js";

import moment from "moment";
import { csv } from 'd3-request';
import colleges from "./Colleges.csv";

// var bigArray = [0, 0, 0, 0];
// var names1;
// var states1;
// var latitudes1;
// var longitudes1;


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
      console.log("changing message");
      props.setMessage(event.target.value);
      break;
    case "entry4":
      console.log("changing college name");
      if(event.target.value == "Choose not to specify" || event.target.value == ""){
        props.setSchool("None specified");
        props.setState("No state");
        props.setLatitude("No latitude");
        props.setLongitude("No longitude");
        console.log("No school");
        break;
      }
      props.setSchool(event.target.value);
      props.setState(props.listOfStates[props.listOfSchools.findIndex(event.target.value)]);
      props.setLatitude(props.listOfLats[props.listOfSchools.findIndex(event.target.value)]);
      props.setLongitude(props.listOfLongs[props.listOfSchools.findIndex(event.target.value)]);
      console.log("final answer", props.school, props.state, props.latitude, props.longitude);
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


function getMapFromCSV(setListOfSchools, setListOfStates, setListOfLats, setListOfLongs){
  
  return csv(colleges, function(err, data) {
    var bigArray1 = [0, 0, 0, 0];
    if (err) {  
      console.log(err);
    } else{
      console.log(data);
      var dataset = data;
      console.log("emily", dataset);

      var names = new Array(dataset.length).fill(0);
      var states = new Array(dataset.length).fill(0);
      var latitudes = new Array(dataset.length).fill(0);
      var longitudes = new Array(dataset.length).fill(0);
      
      for (var i = 0; i < dataset.length; i++){
        names[i] = dataset[i].NAME;
        states[i] = dataset[i].STATE;
        latitudes[i] = dataset[i].LATITUDE;
        longitudes[i] = dataset[i].LONGITUDE;
      }
      console.log(names); //this works
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
    console.log("names", names);//this workds
    setListOfSchools(names);
    setListOfStates(states);
    setListOfLats(latitudes);
    setListOfLongs(longitudes);
   });
  }

  


const handleSubmit = (props) => {
  var time = moment()
  var date = time.format("L h:mm:ss A");
  const donationRef = rootRef.child('donation');
  var newChildRef = donationRef.push()
  const new_donation = {
    displayName: getDonationName(props.displayName),
    numTrees: props.numTrees,
    message: getMessage(props.message),
    date: date,
    orderDate: -1*time.valueOf(),
    orderAmount: -1*props.numTrees
  }
  newChildRef.set(new_donation);
  props.setIsFirstCard(true);
}



const DonationDetails = (props) =>  {
  const [listOfSchools, setListOfSchools] = useState();
  const [listOfStates, setListOfStates] = useState();
  const [listOfLats, setListOfLats] = useState();
  const [listOfLongs, setListOfLongs] = useState();
  
  useEffect(() => {
    for (var i = 0; i<10; i++){
      getMapFromCSV(setListOfSchools, setListOfStates, setListOfLats, setListOfLongs);
      console.log("schools", listOfSchools);
      console.log("states", listOfStates);
      console.log("lats", listOfLats);
      console.log("longs", listOfLongs);
    }

  }, []);
  
  //console.log("yikes", bigArray);
  // names1 = bigArray[0];
  // states1 = bigArray[1];
  // latitudes1 = bigArray[2];
  // longitudes1 = bigArray[3];
  // console.log("names1", names1);
  // console.log("states1", states1);
  // console.log("longitudes1", longitudes1);
  // console.log("latitudes1", latitudes1);
  
  // console.log("help!!!", names1);
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


    <input id ="entry4" className={css`display: flex; flex-direction: row; justify-content: flex-end;
    border-radius: 0.25rem; box-shadow: none;
    border-style: solid;
    border-color: #CFCFCF; border-width: 0.1px;
    font-family: "courier"; font-size: 1rem;
    font-weight: 300; height: 40px; width:93.5%`} 
      type="text" name="product" placeholder = " Select College" list="productName"/>
      <datalist id="productName">
      <option value="Choose not to specify">Choose not to specify</option>

      </datalist>

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
  const [map, setMap] = useState();
  const [school, setSchool] = useState("no school");
  const [state, setState] = useState();
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  
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
        state = {state} setState = {setState} latitude = {latitude} setLatitude = {setLatitude}
        longitude = {longitude} setLongitude = {setLongitude}
        numTrees={props.numTrees} map = {map} setMap={setMap} school = {school} setSchool = {setSchool}/>
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