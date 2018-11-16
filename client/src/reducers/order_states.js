import { ORDER_STATE } from "../actions/fetch_weather";

export default function(state = null, action) {
  switch (action.type) {
    case ORDER_STATE:
      return action.payload;

    default:
      return state;
  }
}
