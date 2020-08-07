import React, { useEffect, useMemo, forwardRef } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore, compose } from "redux";
import styled, { ThemeProvider } from "styled-components";

import { Cat, CatAnimated } from "./features/Cat";
import Arrows from "./features/Arrows";
import StartScreen from "./features/StartScreen";

import waitingStartPhase from "./phases/waitingStart";
import run from "./phases/gameStarted/run";
import jump from "./phases/gameStarted/jump";
/*1. стартовый экран
2. котик бежит и прыгает на белом фоне
3. описать, спроектировать сущности и состояния
 */

const Field = styled.div`
  position: relative;
  width: 600px;
  height: 500px;
  margin: 0 auto;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

export type MoveDirection = "top" | "bottom";

export type GameState =
  | "waitingStart"
  | "gameStarted.run"
  | "gameStarted.jump"
  | "gameStarted.doubleJump"
  | "endGame"
  | "getEndScreen";

export type Action =
  | { type: "clickStartButton" }
  | { type: "arrowPressed"; payload: MoveDirection }
  | { type: "endJump" }
  | { type: "catDoubleJump" }
  | { type: "catfFall" };

export type CatMove = "jump" | "doubleJump" | "fall" | "run";

export type State = {
  gameState: GameState;
  /*health
   */
};
const getInitialState = (): State => {
  return {
    gameState: "waitingStart",
  };
};

const reducer = (state = getInitialState(), action: Action): State => {
  const [phaseOuter, phaseInner] = state.gameState.split(".");
  switch (phaseOuter) {
    case "waitingStart": {
      return waitingStartPhase(action, state);
    }
    case "gameStarted": {
      switch (phaseInner) {
        case "run": {
          return run(action, state);
        }
        case "jump": {
          return jump(action, state);
        }
        default:
          return state;
      }
    }

    default:
      return state;
  }
};

function App() {
  const [gameState] = useSelector((state: State) => [state.gameState]);
  const dispatch = useDispatch();

  useEffect(() => {
    switch (gameState) {
      case "gameStarted.jump": {
        const timerJump = setTimeout(() => dispatch({ type: "endJump" }), 600);
        return (): void => {
          clearTimeout(timerJump);
        };
      }
      default:
        break;
    }
  }, [gameState]);

  const getGameScreen = () => {
    switch (gameState) {
      case "waitingStart":
        return <StartScreen />;
      case "gameStarted.jump": {
        return (
          <>
            <CatAnimated />
            <Arrows />
          </>
        );
      }

      default:
        return (
          <>
            <Cat move="run" />
            <Arrows />
          </>
        );
    }
  };
  return <Field>{getGameScreen()}</Field>;
}

const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);