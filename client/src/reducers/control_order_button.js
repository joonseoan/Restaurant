import { CONTROL_ORDER_BUTTON } from "../actions/fetch_weather";

export default function(state = {}, action) {
  switch (action.type) {
    case CONTROL_ORDER_BUTTON:
      return action.payload;

    default:
      return state;
  }
}
