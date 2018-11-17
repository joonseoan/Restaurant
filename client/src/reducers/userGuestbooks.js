import { SEND_GUESTBOOKS } from "../actions/fetch_guestbooks";

export default function(state = [], action) {
  switch (action.type) {
    case SEND_GUESTBOOKS:
      console.log("action.payload", action.payload);
      return action.payload;

    default:
      return state;
  }
}
