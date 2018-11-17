import { MODAL_CONTROL } from "../actions/fetch_guestbooks";

export default function(state = null, action) {
  switch (action.type) {
    case MODAL_CONTROL:
      return action.payload;

    default:
      return state;
  }
}
