import React, { Component } from "react";
import CountdownTimer from "./countdown.jsx";

// This is one way to write CSS
// Read more about it here:
//https://emotion.sh/docs/introduction
// For this assignment we recommend using emotion.
// The header div below has been styled using the canonical emotion syntax
// Feel free to copy and reuse in all your components.
import { css } from "emotion";

//Here is all the image files that you need
import unLogo from "./images/unhcrLogo.svg";
import univlogo from "./images/univlogoheader2.0.svg";

class Header extends Component {
  render() {
    return (
      <div
        className={css`
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          margin: 0 0 0 1rem;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          `}
        >
          <img src={univlogo} alt="PROJECT_LOGO" height="450vh" width="400vh" />
        </div>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            flex-grow: 2;
          `}
        >
          <div className="colB">
            <CountdownTimer />
          </div>
          <p3>
            The ultimate college donation
            <br></br>
            competition supporting refugees run by
          </p3>
          <br></br>
          <a href="https://www.unrefugees.org" class="logo">
            <img src={unLogo} alt="UN_LOGO" height="50vh" width="100%" />
          </a>
        </div>
      </div>
    );
  }
}
export default Header;
