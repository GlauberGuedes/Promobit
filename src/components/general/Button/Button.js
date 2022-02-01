//GLOBAL - components from npm
import React, { useState } from "react";

//STYLES
import "./button.scss";

//COMPONENTS

//SERVICES - api, conectors...

//GLOBAL STATE - redux, env...

//ASSETS - icons, images...
import { ReactComponent as IconClose } from "../../../assets/Close.svg";

export default function Button({ text, onClose, onClick }) {
  //GENERAL

  //STATES
  const [buttonActive, setButtonActive] = useState(false);

  //REDUX - Selectors

  //FUNCTIONS

  //USE EFFECTS

  return (
    <div
      className={`button ${buttonActive ? "active" : ""}`}
      onClick={() => {
          if(!buttonActive) {
              setButtonActive(true);
              onClick();
          }
      }}
    >
      <p>{text}</p>
      {buttonActive && (
        <IconClose
          onClick={() => {
            setButtonActive(false);
            onClose();
          }}
        />
      )}
    </div>
  );
}
