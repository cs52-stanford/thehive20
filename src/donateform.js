import React, { useState } from "react";
import First_Card from "./cardOne";
import Second_Card from "./cardTwo";

const DonateForm = (props) => {
  const [isFirstCard, setIsFirstCard] = useState(true);
  const [numTrees, setNumTrees] = useState(null);

  //TODO: Your form implementation
  if (isFirstCard)
    return (
      <First_Card setIsFirstCard={setIsFirstCard} setNumTrees={setNumTrees} />
    );
  else
    return <Second_Card setIsFirstCard={setIsFirstCard} numTrees={numTrees} />;
};

export default DonateForm;
