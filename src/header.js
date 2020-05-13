import React, { Component } from "react";

// This is one way to write CSS 
// Read more about it here:
//https://emotion.sh/docs/introduction
// For this assignment we recommend using emotion. 
// The header div below has been styled using the canonical emotion syntax
// Feel free to copy and reuse in all your components.
import { css } from "emotion";

//Here is all the image files that you need
import title_img from "./images/logo-teamtrees-full-alt.svg";
import astronaut from "./images/astronaut-sign.svg";
import spaceship from "./images/spaceship.svg";
import underline from "./images/counter-underline-light.svg";

class Header extends Component {
  render() {
    return (
      <div className="row-1">
        <div className="col-1">
          <img src={spaceship} className={css`height:7vh;`}/>
        </div>
        <div className="col-2">
          <img src={title_img}/>
          <p className="sub-header">We did it! But that doesn't mean we're done. Come back anytime you feel like planting a tree!</p>
          <div id="totalTrees">21,803,427</div>
          <div id="trees_planted">TREES PLANTED</div>
          <img src={underline} className={css`width: 7vw; justify-content: center; margin-top: 2vh;`}/>
          <div id="plant_button">Planting Projects</div>
        </div>
        <div className="col-3">
          <img src={astronaut} className="astronaut"/>
        </div>
      </div>
    );
  }
}

export default Header;
