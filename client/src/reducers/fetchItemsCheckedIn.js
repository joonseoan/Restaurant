import { FETCH_ITEMS_CHECKEDIN } from "../actions/fetch_weather";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ITEMS_CHECKEDIN:
      return action.payload;

    default:
      return state;
  }
}
