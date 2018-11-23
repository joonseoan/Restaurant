import _ from "lodash";
import moment from "moment";

export function timeInfo(timeStamp) {
  const visitTime = moment(Number(timeStamp));
  return visitTime.format("h:mm a in MMM Do YYYY");
}

export function sortGuestbooks(guestbooks) {
  return guestbooks.sort((date1, date2) => date2.visitedAt - date1.visitedAt);
}

export function removeSpace(name) {
  return name.replace(/\s/g, "");
}

export function insertSpaces(name) {
  name = name.replace(/([a-z])([A-Z])/g, "$1 $2");
  name = name.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  return name;
}

export function rounding(number) {
  return _.round(number, 2);
}

export const initUI = CurrentMenuName => {
  document.querySelector(
    `input[name="${removeSpace(CurrentMenuName)}"]`
  ).checked = false;

  document.querySelector(
    `div.${removeSpace(CurrentMenuName)}BgColor`
  ).style.backgroundColor = "";

  document.querySelector(
    `div.${removeSpace(CurrentMenuName)}Button`
  ).style.display = "none";

  document.querySelector(`i#${CurrentMenuName}`).style.visibility = "visible";

  document.querySelector(`input.${CurrentMenuName}`).disabled = false;
};
