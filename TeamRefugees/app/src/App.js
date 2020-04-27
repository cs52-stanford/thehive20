import React, { useState } from "react";
import Header from "./header.js";
import Form from "./form.js";
import Leaderboard from "./leaderboard.js";
import avatar from "./images/icon-badge-grove-2.svg";

import { css } from "emotion";
import moment from "moment";
import "./App.css";

//the Donation component has been implemented for you.
import Donation from "./donation.js"

const App = () => {
  const [donations, setDonations] = useState([]);

  const addDonation = (values) => {
    setDonations([
      ...donations,
      <Donation
        avatar={avatar}
        name={values[0]}
        numTrees={values[1]}
        message={values[2]}
      />,
    ]);
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        <Form addDonation={addDonation} />
        <Leaderboard donations={donations} />
      </div>
    </div>
  );
}

export default App;
