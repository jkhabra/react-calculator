/* eslint-disable */
import React, { useState } from "react";
import "./style.scss";

const numberButtons = [
  { buttonId: "seven", buttonValue: "7" },
  { buttonId: "eight", buttonValue: "8" },
  { buttonId: "nine", buttonValue: "9" },
  { buttonId: "four", buttonValue: "4" },
  { buttonId: "five", buttonValue: "5" },
  { buttonId: "six", buttonValue: "6" },
  { buttonId: "one", buttonValue: "1" },
  { buttonId: "two", buttonValue: "2" },
  { buttonId: "three", buttonValue: "3" },
  { buttonId: "zero", buttonValue: "0" },
];

const CalButton = (p:{ id:string, handleClick: any, value:string }) => {
  return (
    <div className="cal-item" id={p.id} onClick={p.handleClick}>
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

  const handleNumClick = (e:any) => {
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
          console.log("---type--num-");
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

  const computeFormula = (formula:string, input:string) => {
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
          <div id="number-pad">
            {numberButtons.map((numObj, i, numArr) => {
              return (
                <div key={i}>
                  <CalButton
                    id={numArr[i].buttonId}
                    value={numArr[i].buttonValue}
                    handleClick={handleNumClick}
                  />
                </div>
              );
            })}
          </div>
          <div id="other-buttons">
            <CalButton id="add" value="+" handleClick={handleNumClick} />
            <CalButton id="subtract" value="-" handleClick={handleNumClick} />
            <CalButton id="multiply" value="&times;" handleClick={handleNumClick} />
            <CalButton id="divide" value="&divide;" handleClick={handleNumClick} />
            <CalButton id="clear" value="CLEAR" handleClick={handleNumClick} />
            <CalButton id="equals" value="=" handleClick={handleNumClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
