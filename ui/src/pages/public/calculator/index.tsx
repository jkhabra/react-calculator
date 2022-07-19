/* eslint-disable */
import React, { useState } from "react";
import "./style.scss";

const numberButtons = [
  { id: "seven", value: "7" },
  { id: "eight", value: "8" },
  { id: "nine", value: "9" },
  { id: "four", value: "4" },
  { id: "five", value: "5" },
  { id: "six", value: "6" },
  { id: "one", value: "1" },
  { id: "two", value: "2" },
  { id: "three", value: "3" },
  { id: "zero", value: "0" },
];

const CalButton = (p: { id: string; handleClick: any; value: string; className?: string }) => {
  return (
    <div className={`cal-item ${p.className || ""}`} id={p.id} onClick={p.handleClick}>
      {p.value}
    </div>
  );
};

const opperators = ["add", "subtract", "multiply", "divide"];
const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const Calculator = () => {
  const [displayInput, setDisplayInput] = useState<string>("0");
  const [displayFormula, setDisplayFormula] = useState<string>("");
  const [lastInput, setLastInput] = useState<string>("");

  const initialState = () => {
    setDisplayInput("0");
    setDisplayFormula("");
    setLastInput("");
  };

  const handleNumClick = (e: any) => {
    let input = e.target.id;
    console.log("-----handlenumclikc===", input);

    if (input === "clear") {
      initialState();
    } else if (input === "equals") {
      if (lastInput !== "equals") {
        computeFormula(displayFormula, displayInput);
      }
    } else if (input === "zero") {
      if (lastInput !== "equals") {
        setDisplayInput(displayInput.concat("0"));
        setLastInput("zero");
      } else {
        setDisplayFormula("");
        setDisplayInput("0");
      }
    } else if (opperators.indexOf(input) > -1) {
      if (lastInput !== "equals") {
        switch (opperators.indexOf(input)) {
          case 0:
            setDisplayFormula(displayFormula.concat(displayInput).concat("+"));
            setLastInput("add");
            setDisplayInput("0");

            break;
          case 1:
            setDisplayFormula(displayFormula.concat(displayInput).concat("-"));
            setLastInput("subtract");
            setDisplayInput("0");
            break;

          case 2:
            setDisplayFormula(displayFormula.concat(displayInput).concat("*"));
            setLastInput("multiply");
            setDisplayInput("0");

            break;
          case 3:
            setDisplayFormula(displayFormula.concat(displayInput).concat("/"));
            setLastInput("divide");
            setDisplayInput("0");
            break;
        }
      }
    } else {
      if (lastInput !== "equals") {
        if (displayInput !== "0") {
          setDisplayInput(displayInput.concat(numbers.indexOf(input).toString()));
          setLastInput(numbers.indexOf(input).toString());
        } else {
          setDisplayInput(numbers.indexOf(input).toString());
          setLastInput(numbers.indexOf(input).toString());
        }
      } else {
        setDisplayFormula("");
        setDisplayInput(numbers.indexOf(input).toString());
        setLastInput(numbers.indexOf(input).toString());
      }
    }
  };

  const computeFormula = (formula: string, input: string) => {
    let finalFormula = formula.concat(input);
    let answer = eval(finalFormula);
    answer = +answer.toFixed(6);

    setDisplayFormula(finalFormula.concat("="));
    setDisplayInput(answer.toString());
    setLastInput("equals");
  };

  return (
    <div className="cal-container">
      <div className="cal-body">
        <div className="display-container">
          <div id="displayFormula">{displayFormula}</div>
          <div id="display">{displayInput}</div>
        </div>

        <div className="cal-wrapper">
          <div className="number-pad">
            {numberButtons.map((numObj: { id: string; value: string }, i: number) => (
              <span key={i}>
                <CalButton id={numObj.id} value={numObj.value} handleClick={handleNumClick} />
              </span>
            ))}
          </div>
          <div className="other-buttons">
            <CalButton id="add" value="+" handleClick={handleNumClick} />
            <CalButton id="subtract" value="-" handleClick={handleNumClick} />
            <CalButton id="multiply" value="&times;" handleClick={handleNumClick} />
            <CalButton id="divide" value="&divide;" handleClick={handleNumClick} />
            <CalButton id="clear" value="CE" handleClick={handleNumClick} />
            <CalButton id="equals" value="=" handleClick={handleNumClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
