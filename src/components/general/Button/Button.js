//GLOBAL - components from npm
import React, { useState } from "react";

//STYLES
import "./button.scss";

//COMPONENTS

//SERVICES - api, conectors...

//GLOBAL STATE - redux, env...

//ASSETS - icons, images...
import { ReactComponent as IconClose } from "../../../assets/Close.svg";

export default function Button({ text, onClose, onClick, active }) {
  //GENERAL

  //STATES

  //REDUX - Selectors

  //FUNCTIONS

  //USE EFFECTS

  return (
    <div
      className={`button ${active ? "active" : ""}`}
      onClick={() => {
          if(!active) {
              onClick();
          }
      }}
    >
      <p>{text}</p>
      {active && (
        <IconClose
          onClick={() => {

            onClose();
          }}
        />
      )}
    </div>
  );
}
