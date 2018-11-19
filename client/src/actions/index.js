import axios from "axios";

import {
  FETCH_LOCATION,
  FETCH_ADDITIONAL_TODAY_WEATHER,
  RECOMMENDED_MENUS,
  REFRESH_MENU,
  REFRESH_BUTTON,
  FETCH_SELECTED_MENU,
  // FETCH_MATCHED_MENU,
  // RESET_CANCEL,
  FETCH_CANCEL_MENU,
  // FETCH_ITEMS_CHECKEDIN
  ORDER_STATE
} from "./fetch_weather";

import {
  FETCH_GUESTBOOKS,
  CREATE_GUESTBOOK,
  MENU_ORDERED,
  FETCH_GUESTBOOK,
  DELETE_GUESTBOOK,
  USER_LOGIN,
  //FETCH_LOGIN_GUESTBOOK,
  GUEST_PAY,
  GENERAL_GUEST,
  SEND_GUESTBOOKS,
  MODAL_CONTROL,
  POST_CONTROL
} from "./fetch_guestbooks";

const TodayURL = `https://api.openweathermap.org/data/2.5/weather?appid=${
  process.env.REACT_APP_OPEN_WEATHER_KEY
}`;

const GoogleURL = "https://maps.googleapis.com/maps/api/geocode/json?address";

export function setLocation(branch_city) {
  console.log("branch_city: ", branch_city);

  const url = `${GoogleURL}=${branch_city}&key=${
    process.env.REACT_APP_GMAP_API_KEY
  }`;

  const request = axios.get(url);
  return {
    type: FETCH_LOCATION,
    payload: request
  };
}

export function additionalTodayWeatherInfo(branch_city) {
  const url = `${TodayURL}&q=${branch_city},ca`;
  const request = axios.get(url);

  return {
    type: FETCH_ADDITIONAL_TODAY_WEATHER,
    payload: request
  };
}

export function fetchRecommendedMenus(menus) {
  return {
    type: RECOMMENDED_MENUS,
    payload: menus
  };
}

export function selectedReco(menu) {
  return {
    type: FETCH_SELECTED_MENU,
    payload: menu
  };
}

// export function resetCancel(reset) {
//   return {
//     type: RESET_CANCEL,
//     payload: reset
//   };
// }

export function fetchCancelMenu(menu) {
  return {
    type: FETCH_CANCEL_MENU,
    payload: menu
  };
}

export function refreshMenu(refresh = {}) {
  return {
    type: REFRESH_MENU,
    payload: refresh
  };
}

export function refreshButton(number) {
  return {
    type: REFRESH_BUTTON,
    payload: number
  };
}

// export function fetchMatchedMenu(name) {
//   return {
//     type: FETCH_MATCHED_MENU,
//     payload: name
//   };
// }

// export function fetchItemsCheckedIn(name_price) {
//   return {
//     type: FETCH_ITEMS_CHECKEDIN,
//     payload: name_price
//   };
// }

export function storeOrders(orders) {
  return {
    type: MENU_ORDERED,
    payload: orders
  };
}

export function handleTotalAmount(amount) {
  axios.post("/billing", { amount });
  return {
    type: GUEST_PAY
  };
}

export function handleToken(token) {
  const response = axios.post("/billing/credit", token).then(res => {
    return res;
  });

  return {
    type: GENERAL_GUEST,
    payload: response
  };
}

export function orderState(states) {
  console.log("ssssssss");
  return {
    type: ORDER_STATE,
    payload: states
  };
}

export function fetchGuesbookLists() {
  const request = axios.get("/guests");

  return {
    type: FETCH_GUESTBOOKS,
    payload: request
  };
}

export function createGuestbook(guestbook) {
  const response = axios.post("/guests", guestbook);

  return {
    type: CREATE_GUESTBOOK,
    payload: response
  };
}

// export function fetchGuestbook(id) {
//   const request = axios.get(`/guests/${id}`);

//   return {
//     type: FETCH_GUESTBOOK,
//     payload: request
//   };
// }

export function userGuestbookLogin(loginInfo) {
  const response = axios.post("/guests/login", loginInfo);

  return {
    type: USER_LOGIN,
    payload: response
  };
}

export function setGuestbook(userGuestbooks) {
  return {
    type: SEND_GUESTBOOKS,
    payload: userGuestbooks
  };
}

export function modalControl(setModal) {
  return {
    type: MODAL_CONTROL,
    payload: setModal
  };
}

export function postControl(post) {
  console.log("post", post);
  return {
    type: POST_CONTROL,
    payload: post
  };
}

export function deleteLoginUserGuestbook(id) {
  // axios.delete(`/guests/${id}`).then(() => {
  //   callback();
  // });

  const response = axios.delete(`/guests/${id}`);

  return {
    type: DELETE_GUESTBOOK,
    payload: response
  };
}
