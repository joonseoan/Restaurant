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
  FETCH_CANCEL_MENU
  // FETCH_ITEMS_CHECKEDIN
} from "./fetch_weather";

import {
  FETCH_GUESTBOOKS,
  CREATE_GUESTBOOK,
  MENU_ORDERED,
  FETCH_GUESTBOOK,
  DELETE_GUESTBOOK,
  USER_LOGIN,
  FETCH_LOGIN_GUESTBOOK,
  GUEST_PAY,
  GENERAL_GUEST
} from "./fetch_guestbooks";

const TodayURL = `https://api.openweathermap.org/data/2.5/weather?appid=${
  process.env.REACT_APP_OPEN_WEATHER_KEY
}`;

const GoogleURL = "https://maps.googleapis.com/maps/api/geocode/json?address";

export function setLocation(branch_city) {
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

export function fetchGuesbookLists() {
  // const url = 'http://localhost:3000/guests';

  const request = axios.get("/guests");

  return {
    type: FETCH_GUESTBOOKS,
    payload: request
  };
}

export function createGuestbook(guestbook, callback) {
  // console.log("guestbook: ", guestbook);
  const request = axios.post("/guests", guestbook).then(() => {
    callback();
  });

  return {
    type: CREATE_GUESTBOOK,
    payload: request
  };
}

export function fetchGuestbook(id) {
  const request = axios.get(`/guests/${id}`);

  return {
    type: FETCH_GUESTBOOK,
    payload: request
  };
}

export function userGuestbookLogin(loginInfo, callback) {
  return {
    type: USER_LOGIN,
    payload: axios.post("/guests/login", loginInfo).then(() => {
      callback();
    })
  };
}

export function fetchLoginUserGuestbooks() {
  const request = axios.get("/loginGuestbooks");

  return {
    type: FETCH_LOGIN_GUESTBOOK,
    payload: request
  };
}

export function deleteLoginUserGuestbook(id, callback) {
  axios.delete(`/guests/${id}`).then(() => {
    callback();
  });

  return {
    type: DELETE_GUESTBOOK,
    payload: id
  };
}
