import { FETCH_SELECTED_MENU } from "../actions/fetch_weather";

export default function(state = "", action) {
  switch (action.type) {
    case FETCH_SELECTED_MENU:
      return action.payload;

    default:
      return state;
  }
}
