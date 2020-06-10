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
          align-items: center;
          justify-content: space-between;
          margin: 1rem 2rem 1rem 1rem;
          color: #0072bc;
          font-weight: 300;
          border-bottom-style: solid;
          border-color: black;
          //font-family: Verdana, Geneva, sans-serif;
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
            justify-content: flex-end;
            flex-grow: 3.5;
          `}
        >
          <div
            className={css`
              display: flex;
              flex-direction: column;
              text-align: end;
            `}
          >
            <div
              className={css`
                display: flex;
                flex-direction: column;
                font-size: 4rem;
              `}
            >
              <CountdownTimer />
            </div>
            <div
              className={css`
                display: flex;
                flex-direction: column;
                margin-right: 4rem;
              `}
            >
              <p3
                className={css`
                  display: flex;
                  flex-direction: column;
                  font-size: 2.5rem;
                `}
              >
                {" "}
                The ultimate college donation
                <br></br>
                competition supporting refugees run by
              </p3>
              <br></br>
              <a
                href="https://www.unrefugees.org"
                class="logo"
                className={css`
                  display: flex;
                  flex-direction: row;
                  justify-content: flex-end;
                `}
              >
                <img src={unLogo} alt="UN_LOGO" height="100%" width="200vh" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
