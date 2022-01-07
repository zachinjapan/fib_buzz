import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Result from "./Result/Result";
import "./Form.css";
/* global BigInt */

const Form = () => {
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [fibBuzzArr, setFibBuzzArr] = useState([]);
  const [finalArr, setFinalArr] = useState([]);
  const [fib, setFib] = useState(3);
  const [buzz, setBuzz] = useState(5);
  const [iterations, setIterations] = useState(100);
  const [showNumbers, setShowNumbers] = useState(false);
  const [useBigInt, setUseBigInt] = useState(false);
  const [started, setStarted] = useState(false);

  const handleSubmit = () => {
    setFinalArr([]);
    setFibBuzzArr([]);
    fibBuzz();
  };

  const createFinalArr = (arr) => {
    let finalArr = [];
    for (let x = 0; x < iterations - 2; x += 3) {
      finalArr.push({
        id: x,
        num1: showNumbers ? fibBuzzArr[x][0] : fibBuzzArr[x][1],
        num2: showNumbers ? fibBuzzArr[x + 1][0] : fibBuzzArr[x + 1][1],
        num3: showNumbers ? fibBuzzArr[x + 2][0] : fibBuzzArr[x + 2][1],
      });
    }
    setFinalArr(finalArr);
  };

  const createBigIntArray = (arr) => {
    let finalArr = [];
    for (let x = 0; x < iterations - 2; x += 1) {
      finalArr.push({
        id: x,
        num1: arr[x],
      });
    }
    setFinalArr(finalArr);
  };

  const fibBuzz = () => {
    if (useBigInt) {
      fibBuzzArr.push(BigInt(num1));
      fibBuzzArr.push(BigInt(num2));

      for (let x = 1; x < iterations - 1; x++) {
        let currentNum = BigInt(fibBuzzArr[x] + fibBuzzArr[x - 1]);
        fibBuzzArr.push(currentNum);
      }
      createBigIntArray(fibBuzzArr);
    } else {
      fibBuzzArr.push([num1, num1]);
      fibBuzzArr.push([num2, num2]);

      for (let x = 1; x <= iterations - 1; x++) {
        let currentNum =
          parseFloat(fibBuzzArr[x][0]) + parseFloat(fibBuzzArr[x - 1][0]);
        if (currentNum.length > 9) {
          currentNum = currentNum.toPrecision(5);
        }

        if (currentNum === Infinity) {
          currentNum = ["Infinity", "Infinity"];
        } else if (currentNum % fib === 0 && currentNum % buzz === 0) {
          currentNum = [currentNum + " Fib Buzz", "Fib Buzz"];
        } else if (currentNum % fib === 0) {
          currentNum = [currentNum + " Fib ", "Fib"];
        } else if (currentNum % buzz === 0) {
          currentNum = [currentNum + " Buzz", "Buzz"];
        } else {
          currentNum = [currentNum, currentNum];
        }
        fibBuzzArr.push(currentNum);
      }

      createFinalArr(fibBuzzArr);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setStarted(true);
    handleSubmit();
  };

  return (
    <div className="main_div">
      <form className="fib-form" onSubmit={onSubmit} margin="normal">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <TextField
            color="primary"
            margin="normal"
            className="text-form"
            type="number"
            name="num1"
            label="Fibonachi 1st Number"
            onChange={(e) => {
              if (e.target.value < 0) {
                alert("Please enter a positive number");
                e.target.value = "";
              } else {
                setNum1(Number(e.target.value));
              }
            }}
            placeholder="Ex: 1"
            required
          />
          <TextField
            color="primary"
            margin="normal"
            className="text-form"
            type="number"
            name="num2"
            label="Fibonachi 2nd Number"
            onChange={(e) => {
              if (e.target.value < 0) {
                alert("Please enter a positive number");
                e.target.value = 0;
              } else {
                setNum2(Number(e.target.value));
              }
            }}
            placeholder="Ex: 1"
            required
          />
          <TextField
            color="primary"
            margin="normal"
            className="text-form"
            size="medium"
            type="number"
            label="remainder test for fib"
            disabled={useBigInt}
            onChange={(e) => {
              if (e.target.value < 0) {
                alert("Please enter a positive number");
                e.target.value = 0;
              } else {
                setFib(Number(e.target.value));
              }
            }}
            placeholder="Ex: 3"
            required
          ></TextField>
          <TextField
            color="primary"
            margin="normal"
            className="text-form"
            size="medium"
            type="number"
            label="remainder test for buzz"
            disabled={useBigInt}
            onChange={(e) => {
              if (e.target.value < 0) {
                alert("Please enter a positive number");
                e.target.value = 0;
              } else {
                setBuzz(Number(e.target.value));
              }
            }}
            placeholder="Ex: 5"
            required
          ></TextField>
          <TextField
            color="primary"
            margin="normal"
            className="text-form"
            size="medium"
            type="number"
            label="iterations"
            onChange={(e) => {
              if (e.target.value > 2000) {
                alert(
                  "wooo that's a lot of iterations! let's be nice to your lovely computer and do 2,000 or less iterations"
                );
                e.target.value = 0;
                setIterations(0);
              } else if (e.target.value < 0) {
                alert("Please enter a positive number");
                e.target.value = 0;
              } else {
                setIterations(Number(e.target.value));
              }
            }}
            placeholder="Ex: 100"
            required
          ></TextField>
        </div>
        <div className="button-div">
          <Button
            color="primary"
            variant="outlined"
            id="submitBtn"
            type="submit"
            disabled={false}
          >
            Calculate
          </Button>
          {!useBigInt ? (
            <Button
              color="primary"
              variant="outlined"
              id="showNumbersBtn"
              onClick={() => {
                setShowNumbers(!showNumbers);
              }}
            >
              {" "}
              {showNumbers
                ? "Show only 'Fib' and 'Buzz'"
                : "Include Numbers + 'fib' and 'buzz'"}
            </Button>
          ) : null}

          <Button
            color="warning"
            variant="outlined"
            id="useBigIntBtn"
            onClick={() => {
              setFinalArr([]);
              setFibBuzzArr([]);
              setUseBigInt(!useBigInt);
            }}
          >
            {useBigInt
              ? "Go back to normal numbers"
              : "enable BigInt and go past numbers larger than (2, 53) - 1"}
          </Button>
        </div>
      </form>
      <div className="fib-buzz-container">
        {started && <Result finalArr={finalArr} useBigInt={useBigInt} />}
      </div>
    </div>
  );
};

export default Form;
