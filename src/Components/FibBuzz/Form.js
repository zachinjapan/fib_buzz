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
  const [showResultsComponent, setShowResultsComponent] = useState(false);
  const [showOptionButtons, setShowOptionButtons] = useState(false);

  const handleSubmit = () => {
    setFibBuzzArr([]);
    setFinalArr([]);
    fibBuzz();
  };

  const createFinalArr = (arr) => {
    let finalArr = [];

    const num_columns = 3;

    let data = {};

    for (let x = 0; x < iterations; x += num_columns) {
      data = { id: x };
      for (let i = 0; i < num_columns; ++i) {
        if (x + i < iterations) {
          data["num" + i] =
            (showNumbers ? arr[x + i][0] : "") + fibBuzzArr[x + i][1];
        } else data["num" + i] = "";
      }
      finalArr.push(data);
    }

    setFinalArr(finalArr);
  };

  const createBigIntArray = (arr) => {
    let finalArr = [];
    for (let x = 0; x < iterations - 1; x += 1) {
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

      for (let x = 1; x < iterations; x++) {
        let currentNum = BigInt(fibBuzzArr[x] + fibBuzzArr[x - 1]);
        fibBuzzArr.push(currentNum);
      }
      createBigIntArray(fibBuzzArr);
    } else {
      fibBuzzArr.push([num1, num1]);
      fibBuzzArr.push([num2, num2]);

      for (let x = 1; x < iterations - 1; x++) {
        let currentNum = fibBuzzArr[x][0] + fibBuzzArr[x - 1][0];

        if (currentNum[1] === Infinity) {
          currentNum = ["Infinity", "Infinity"];
        } else if (currentNum % fib === 0 && currentNum % buzz === 0) {
          currentNum = [currentNum, "Fib Buzz"];
        } else if (currentNum % fib === 0) {
          currentNum = [currentNum, "Fib"];
        } else if (currentNum % buzz === 0) {
          currentNum = [currentNum, "Buzz"];
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
    if (!showResultsComponent) {
      setShowResultsComponent(true);
    }
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
        <div className="top-button-div">
          <div className="button-div">
            {!showOptionButtons ? (
              <Button
                sx={{
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
                variant="outlined"
                color="secondary"
                id="show option button"
                onClick={() => {
                  setShowOptionButtons(true);
                }}
              >
                {" "}
                Advanced Options{" "}
              </Button>
            ) : null}
            {!useBigInt && showOptionButtons ? (
              <Button
                sx={{
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
                color="secondary"
                variant={showNumbers ? "contained" : "outlined"}
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
            {showOptionButtons ? (
              <Button
                sx={{
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
                color="warning"
                variant={useBigInt ? "contained" : "outlined"}
                id="useBigIntBtn"
                onClick={() => {
                  setFinalArr([]);
                  setFibBuzzArr([]);

                  if (!useBigInt)
                    alert(
                      "Have fun calculating the fibonacci sequence with bigInt! Reaaaally big numbers!"
                    );
                  setUseBigInt(!useBigInt);
                }}
              >
                {useBigInt
                  ? "Go back to normal numbers"
                  : "Calculate fibonacci numbers with BigInt!"}
              </Button>
            ) : null}
          </div>
          <div className="button-div">
            <Button
              sx={{
                marginTop: "10px",
              }}
              color="primary"
              variant="contained"
              id="submitBtn"
              type="submit"
              disabled={false}
            >
              Calculate
            </Button>
          </div>
        </div>
      </form>
      <div className="fib-buzz-container">
        {showResultsComponent && (
          <Result finalArr={finalArr} useBigInt={useBigInt} />
        )}
      </div>
    </div>
  );
};

export default Form;
