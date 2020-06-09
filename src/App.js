import React, { useState, useEffect } from "react";
import Graphics from "./graphics.js";
import DonateForm from "./donateform.js";
import Leaderboard from "./leaderboard.js";
import avatar from "./images/icon-badge-grove-2.svg";
import Header from "./header.jsx";

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
  let mapData = [
    // {
    //   label: "Stanford University",
    //   latitude: 40.4167,
    //   longitude: -3.7033,
    //   value: 32358260,
    //   color: colorSet.next(),
    // },
    // {
    //   label: "University of Texas Austin",
    //   latitude: 64.1353,
    //   longitude: -21.8952,
    //   value: 22605732,
    //   color: colorSet.next(),
    // },
    {
      label: "UNIVERSITY OF CALIFORNIA-SANTA CRUZ",
      latitude: 36.9990184170001,
      longitude: -122.060726126,
      value: 8413429,
      // color: colorSet.next(),
    },
    {
      label: "UNIVERSITY OF OREGON",
      latitude: 44.044515,
      longitude: -123.07398,
      value: 9306023,
      // color: colorSet.next(),
    },
    {
      label: "UNIVERSITY OF WASHINGTON-SEATTLE CAMPUS",
      latitude: 47.655775179,
      longitude: -122.310802164,
      value: 9323535,
      // color: colorSet.next(),
    },
  ];

  return (
    <div className="App">
      <div className="container">
        <Header />
        <Graphics mapData={mapData} />
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
