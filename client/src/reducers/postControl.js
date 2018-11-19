import { POST_CONTROL } from "../actions/fetch_guestbooks";

export default function(state = "", action) {
  switch (action.type) {
    case POST_CONTROL:
      return action.payload;
    default:
      return state;
  }
}
