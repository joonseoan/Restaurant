import { combineReducers } from "redux";
import { reducer as guestbookForm } from "redux-form";

import branchLocation from "./branch_location";
import additionalTodayWeather from "./additional_today_weather";
import menu from "./menu";
import guestbooks from "./guestbooks";
import orderedMenu from "./menu_ordered";
import login from "./user_login";
import loginUserGuestbook from "./login_user_guestbooks";
import recommendedMenus from "./recommended_menu";
import refreshMenu from "./refresh_menu";
import refreshButton from "./refresh_button";
import selectedMenu from "./selectedMenu";
//import matchedMenu from "./matched_menu";
//import makeMatchedMenu from "./make_matched_menu";
//import resetClickedMenuButton from "./reset_clicked_menu_button";
//import resetRecoButton from "./reset_reco_button";
import itemsCheckedIn from "./fetchItemsCheckedIn";
import canceledMenu from "./fetch_cancel_menu";

const reducers = combineReducers({
  branchLocation,
  additionalTodayWeather,
  menu,
  guestbooks,
  form: guestbookForm,
  orderedMenu,
  auth: login,
  loginUserGuestbook,
  recommendedMenus,
  refreshMenu,
  refreshButton,
  selectedMenu,
  // matchedMenu,
  //makeMatchedMenu,
  // resetRecoButton,
  // resetClickedMenuButton,
  itemsCheckedIn,
  canceledMenu
});

export default reducers;
