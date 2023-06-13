import { useState, useEffect, useCallback } from "react";
import * as math from "mathjs";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";

const App = () => {
  const [text, setText] = useState([]);
  const [result, setResult] = useState("");

  const addToText = useCallback((val) => {
    setText((text) => [...text, val]);
  }, []);

  const calculateResult = useCallback(() => {
    const input = text.join(""); // Remove commas
    const formattedInput = input.replace(/\s/g, ""); // Remove spaces
    setResult(math.evaluate(formattedInput).toLocaleString());
    setText([]); // Clear the input after calculating the result
  }, [text]);

  const resetInput = useCallback(() => {
    setText([]);
    setResult("");
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (/^[0-9]$/.test(key)) {
        addToText(key);
      } else if (key === "/" || key === "*" || key === "+" || key === "-") {
        addToText(` ${key} `);
      } else if (key === "=" || key === "Enter") {
        calculateResult();
        setText([]); // Clear the input after calculating the result
      } else if (key === "Escape") {
        resetInput();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addToText, calculateResult, resetInput]);

  const buttonColor = "#f2a33c";

  return (
    <div className="App">
      <div className="calc-wrapper">
        <Input text={text} result={result} />
        <div className="row">
          <Button symbol="7" handleClick={addToText} />
          <Button symbol="8" handleClick={addToText} />
          <Button symbol="9" handleClick={addToText} />
          <Button symbol="/" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol="4" handleClick={addToText} />
          <Button symbol="5" handleClick={addToText} />
          <Button symbol="6" handleClick={addToText} />
          <Button symbol="*" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol="1" handleClick={addToText} />
          <Button symbol="2" handleClick={addToText} />
          <Button symbol="3" handleClick={addToText} />
          <Button symbol="+" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol="0" handleClick={addToText} />
          <Button symbol="." handleClick={addToText} />
          <Button
            symbol="="
            handleClick={() => {
              calculateResult();
              setText([]);
            }}
          />
          <Button symbol="-" color={buttonColor} handleClick={addToText} />
        </div>
        <Button symbol="Clear" color="red" handleClick={resetInput} />
      </div>
    </div>
  );
};

export default App;
