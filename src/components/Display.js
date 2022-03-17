import React from "react";

export default function Display(props) {
  return (
    <div id="screen">
      <div className="history">{props.display.history}</div>
      <div id="display" className="input">
        {props.display.input}
      </div>
    </div>
  );
}
