import React from "react";

export default function Buttons(props) {
  const numbers = [
    [7, "seven"],
    [8, "eight"],
    [9, "nine"],
    [4, "four"],
    [5, "five"],
    [6, "six"],
    [1, "one"],
    [2, "two"],
    [3, "three"],
    [0, "zero"],
  ];
  const operators = [
    ["AC", "clear"],
    ["*", "multiply"],
    ["/", "divide"],
    ["+", "add"],
    ["-", "subtract"],
    [".", "decimal"],
    ["=", "equals"],
  ];
  return (
    <div id="buttons">
      {operators.map((op) => {
        return (
          <button
            id={op[1]}
            key={op[1]}
            className={`${op[1]} grey`}
            value={op[0]}
            onClick={props.onClick}
          >
            {op[0] === "*" ? "X" : op[0]}
          </button>
        );
      })}
      {numbers.map((num) => {
        return (
          <button
            id={num[1]}
            key={num[1]}
            className={num[0]}
            onClick={props.onClick}
            value={num[0]}
          >
            {num[0]}
          </button>
        );
      })}
    </div>
  );
}
