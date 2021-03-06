import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";

const StartButton = styled.button`
  margin: 200px auto;
  width: 100px;
`;

function StartScreen() {
  const dispatch = useDispatch();
  return (
    <>
      <StartButton
        onClick={() => {
          dispatch({ type: "clickStartButton" });
        }}
      >
        {" "}
        start
      </StartButton>
    </>
  );
}

export default StartScreen;
