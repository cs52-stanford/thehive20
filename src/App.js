import React, { useState, useEffect } from "react";
import Header from "./header.js";
import Form from "./form.js";
import Leaderboard from "./leaderboard.js";

import { css } from "emotion";
import moment from "moment";
import "./App.css";
import rootRef from "./firebase.js";

//the Donation component has been implemented for you.
import Donation from "./donation.js";

const useFirestoreQuery = (ref, sortby) => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const donationRef = ref.collection('donation').orderBy(sortby, "desc");
    return donationRef.onSnapshot(function(querySnapshot) {
      let newState = [];
      querySnapshot.forEach(function(doc) {
        newState.push({
          key: doc.id,
          name: doc.data().displayName,
          numTrees: doc.data().numTrees,
          message: doc.data().message,
          date: doc.data().date
        });
      })
      setDonations(newState);
    })
  });

  return donations;

}

const App = () => {

  const [sortby, setSortby] = useState("date");

  const donations = useFirestoreQuery(rootRef, sortby);

  return (
    <div className="App">
      <div className="container">
        <Header />
        <Form />
        <Leaderboard donations={donations} setSortby={setSortby}/>
      </div>
    </div>
  );
};

export default App;
