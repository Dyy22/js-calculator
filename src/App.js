import { useEffect, useState } from "react";
import "./App.css";
import Buttons from "./components/Buttons";
import Display from "./components/Display";

function App() {
  const [display, setDisplay] = useState({
    input: "0",
    history: "",
    isOperator: false,
    isResult: false,
  });

  const handleInput = (event) => {
    const value = event.target.value;

    if (display.isResult) handleClear();

    switch (value) {
      case "AC":
        handleClear();
        break;

      case "*":
      case "/":
      case "+":
        handleOperator(value);
        break;

      case "-":
        handleMinus(value);
        break;

      case "0":
        handleZero(value);
        break;

      case ".":
        handleDecimal(value);
        break;

      case "=":
        handleEquals();
        break;

      default:
        handleNumber(value);
    }
  };

  const handleNumber = (value) => {
    if (display.isOperator || display.input === "0")
      setDisplay({ ...display, input: "" });
    else if (display.isResult)
      setDisplay({
        ...display,
        input: "",
        history: "",
      });

    setDisplay((prev) => ({
      input: prev.input + value,
      history: prev.history + value,
      isOperator: false,
      isResult: false,
      isDecimal: false,
    }));
  };

  const handleClear = () => {
    setDisplay({
      input: "0",
      history: "",
      isOperator: false,
      isResult: false,
      isDecimal: false,
    });
  };

  const handleOperator = (value) => {
    const history = display.history;

    if (!history || history === "-") return;

    if (display.isResult) setDisplay({ ...display, history: display.input });

    if (history.match(/[\/*+-]-$/)) {
      setDisplay((prev) => ({
        ...display,
        input: value,
        history: prev.history.replace(/[\/*+-]-$/, value),
      }));
      return;
    }

    if (history[history.length - 1].match(/[\/*+-]/)) {
      setDisplay((prev) => ({
        ...display,
        input: value,
        history: prev.history.replace(/.$/, value),
      }));
      return;
    }

    setDisplay((prev) => ({
      ...display,
      input: value,
      history: prev.history + value,
      isOperator: true,
    }));
  };

  const handleMinus = (value) => {
    const history = display.history;

    if (history === "-") return;

    if (display.isResult)
      setDisplay({ history: display.input, isResult: false });

    if (history.match(/[\/*+-]-$/)) {
      setDisplay((prev) => ({
        ...display,
        input: value,
        history: prev.history.replace(/[\/*+-]-$/, value),
      }));
      return;
    } else
      setDisplay((prev) => ({
        ...display,
        input: value,
        history: prev.history + value,
        isOperator: true,
      }));
  };

  const handleZero = (value) => {
    if (display.input === "0" || display.isResult) return;
    handleNumber(value);
  };

  const handleDecimal = (value) => {
    const history = display.history;

    if (!history)
      setDisplay(() => ({
        ...display,
        input: 0 + value,
        history: 0 + value,
      }));
    else if (display.input.includes(".") || display.isOperator) return;
    else
      setDisplay((prev) => ({
        ...display,
        input: prev.input + value,
        history: prev.history + value,
      }));
  };

  const handleEquals = () => {
    const result = Math.round(eval(display.history) * 10000) / 10000;

    if (!display.history) return;

    setDisplay((prev) => ({
      ...display,
      input: result,
      history: prev.history + "=" + result,
      isResult: true,
    }));
  };

  useEffect(() => console.log(display));

  return (
    <div className="App">
      <Display display={display} />
      <Buttons onClick={handleInput} />
    </div>
  );
}

export default App;
