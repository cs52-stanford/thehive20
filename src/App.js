import React, { useState, useEffect } from "react";
import Header from "./header.js";
import Form from "./form.js";
import Leaderboard from "./leaderboard.js";
import CountdownTimer from "./countdown.jsx";

import { css } from "emotion";
import moment from "moment";
import "./App.css";
import rootRef from "./firebase.js";

//the Donation component has been implemented for you.
import Donation from "./donation.js";

const App = () => {

  const donationsLimit = 100;

  const [sortby, setSortby] = useState("orderDate");

  const [donationsDate, setDonationsDate] = useState([]);
  const [donationsAmount, setDonationsAmount] = useState([]);

  useEffect(() => {
    var donationsRef = rootRef.child('donation')
      .orderByChild("orderDate")
      .limitToFirst(donationsLimit);

    return donationsRef.on('value', function(dataSnapshot) {
      var donates = [];
      dataSnapshot.forEach(function(childSnapshot) {
        donates.push(childSnapshot.val());
      })
      setDonationsDate(donates);
    })
  }, []);

  useEffect(() => {
    var donationsRef = rootRef.child('donation')
      .orderByChild("orderAmount")
      .limitToFirst(donationsLimit);

    return donationsRef.on('value', function(dataSnapshot) {
      var donates = [];
      dataSnapshot.forEach(function(childSnapshot) {
        donates.push(childSnapshot.val());
      })
      setDonationsAmount(donates);
    })
  }, []);


  return (
    <div className="App">
      <div className="container">
        <Header />
        <CountdownTimer />
        <Form />
        <Leaderboard donationsA={donationsAmount} donationsD={donationsDate} setSortby={setSortby} sortby={sortby}/>
      </div>
    </div>
  );
};

export default App;
