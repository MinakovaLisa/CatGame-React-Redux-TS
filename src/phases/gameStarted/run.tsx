import { State, Action } from "./../../app";

function run(action: Action, state: State): State {
  switch (action.type) {
    case "arrowPressed": {
      const direction = action.payload;
      switch (direction) {
        case "top":
          return {
            ...state,
            gameState: "gameStarted.jump",
          };
        case "bottom": {
          return state;
        }
      }
    }
    default:
      return state;
  }
}

export default run;