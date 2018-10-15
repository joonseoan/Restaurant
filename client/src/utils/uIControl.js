export function removeSpace(name) {
  return name.replace(/\s/g, "");
}

export const initUI = CurrentMenuName => {
  console.log(removeSpace(CurrentMenuName));

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

// export const initUI = (menuChecked) => _.each(menuChecked, orders => {

//     if (orders.number === 0) {

//         document.querySelector(`input[name="${this.removeSpace(orders.name)}"]`).checked = false;

//         document.querySelector(`div.${this.removeSpace(orders.name)}BgColor`).style.backgroundColor = '';

//         document.querySelector(`div.${this.removeSpace(orders.name)}Button`).style.display = 'none';

//         document.querySelector(`i#${orders.name}`).style.visibility= 'visible';

//         document.querySelector(`input.${orders.name}`).disabled= false;

//     }

// });
