import { State, Action } from "./../../app";

function waitingStart(action: Action, state: State): State {
  switch (action.type) {
    case "clickStartButton": {
      return {
        ...state,
        gameState: "gameStarted.running",
        barrierPhase: "waitingRequest",
      };
    }
    default:
      return state;
  }
}

export default waitingStart;
