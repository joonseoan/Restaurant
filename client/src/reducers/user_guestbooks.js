import { SEND_GUESTBOOKS } from "../actions/fetch_guestbooks";

export default function(state = [], action) {
  switch (action.type) {
    case SEND_GUESTBOOKS:
      console.log(
        "user_guestbooks:dddddddddddddddddddddddddddddddddddddddddddddddddddddd ",
        action.payload
      );
      return action.payload;

    default:
      return state;
  }
}

// import { USER_LOGIN } from "../actions/fetch_guestbooks";

// export default function(state = null, action) {
//   switch (action.type) {
//     case USER_LOGIN:
//       return action.payload;

//     default:
//       return state;
//   }
// }
