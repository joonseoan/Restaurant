import { combineReducers } from "redux";
import { reducer as guestbookForm } from "redux-form";

import branchLocation from "./branch_location";
import additionalTodayWeather from "./additional_today_weather";
import menu from "./menu";
import guestbooks from "./guestbooks";
import orderedMenu from "./menu_ordered";
import recommendedMenus from "./recommended_menu";
import refreshMenu from "./refresh_menu";
import refreshButton from "./refresh_button";
import selectedMenu from "./selectedMenu";
import canceledMenu from "./fetch_cancel_menu";
import finishCreditPay from "./finishCreditCard";
import userGuestbooks from "./userGuestbooks";
import orderStates from "./order_states";
import modalControl from "./modalControl";
import postStateControl from "./postControl";
// import cartControlData from "./cart_control";

const reducers = combineReducers({
  branchLocation,
  additionalTodayWeather,
  menu,
  guestbooks,
  userGuestbooks,
  form: guestbookForm,
  orderedMenu,
  recommendedMenus,
  refreshMenu,
  refreshButton,
  selectedMenu,
  modalControl,
  canceledMenu,
  finishCreditPay,
  orderStates,
  postStateControl
  // cartControlData
});

export default reducers;
