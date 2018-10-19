import { FETCH_MATCHED_MENU } from "../actions/fetch_weather";

export default function(state = "", action) {
  switch (action.type) {
    case FETCH_MATCHED_MENU:
      return action.payload;

    default:
      return state;
  }
}
