import { RECOMMENDED_MENUS } from "../actions/fetch_weather";

export default function(state = [], action) {
  switch (action.type) {
    case RECOMMENDED_MENUS:
      return action.payload;

    default:
      return state;
  }
}
