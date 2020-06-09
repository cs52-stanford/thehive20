import React, { useState, useEffect } from "react";
import Graphics from "./graphics.js";
import DonateForm from "./DonateForm.js";
import Leaderboard from "./leaderboard.js";
import avatar from "./images/icon-badge-grove-2.svg";
import Header from "./header.jsx";

import { css } from "emotion";
import moment from "moment";
import "./App.css";
import rootRef from "./firebase.js";
import * as am4core from "@amcharts/amcharts4/core";

//the Donation component has been implemented for you.
import Donation from "./donation.js";
import { copyAllProperties } from "@amcharts/amcharts4/.internal/core/utils/Object";

const App = () => {
  const donationsLimit = 100;
  const collegesLimit = 10;

  const [sortby, setSortby] = useState("orderDate");

  const [donationsDate, setDonationsDate] = useState([]);
  const [donationsAmount, setDonationsAmount] = useState([]);
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    var donationsRef = rootRef
      .child("donation")
      .orderByChild("orderDate")
      .limitToFirst(donationsLimit);

    return donationsRef.on("value", function (dataSnapshot) {
      var donates = [];
      dataSnapshot.forEach(function (childSnapshot) {
        donates.push(childSnapshot.val());
      });
      setDonationsDate(donates);
    });
  }, []);

  useEffect(() => {
    var donationsRef = rootRef
      .child("donation")
      .orderByChild("orderAmount")
      .limitToFirst(donationsLimit);

    return donationsRef.on("value", function (dataSnapshot) {
      var donates = [];
      dataSnapshot.forEach(function (childSnapshot) {
        donates.push(childSnapshot.val());
      });
      setDonationsAmount(donates);
    });
  }, []);

  useEffect(() => {
    var collegesRef = rootRef.child('college')
      .orderByChild("AMOUNT")
      .limitToFirst(collegesLimit);

    return collegesRef.on('value', function(dataSnapshot) {
      var colleges = [];
      dataSnapshot.forEach(function(childSnapshot) {
        colleges.push({
          label: childSnapshot.val().NAME,
          latitude: childSnapshot.val().LATITUDE,
          longitude: childSnapshot.val().LONGITUDE,
          value: -1*childSnapshot.val().AMOUNT
        });
      })
      setMapData(colleges);
    })
  }, []);
  

  return (
    <div className="App">
      <div className="container">
        <Header />
        <Graphics mapData={mapData}/>
        <DonateForm />
        <Leaderboard
          donationsA={donationsAmount}
          donationsD={donationsDate}
          setSortby={setSortby}
          sortby={sortby}
        />
      </div>
    </div>
  );
};

export default App;
