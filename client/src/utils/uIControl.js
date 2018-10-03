import _ from 'lodash';

export function removeSpace(name) {

    return name.replace(/\s/g, "");

}

export const initUI = (menuChecked) => _.each(menuChecked, orders => {

    if (orders.number === 0) {

        document.querySelector(`input[name="${this.removeSpace(orders.name)}"]`).checked = false;

        document.querySelector(`div.${this.removeSpace(orders.name)}BgColor`).style.backgroundColor = '';
        
        document.querySelector(`div.${this.removeSpace(orders.name)}Button`).style.display = 'none';
        
        document.querySelector(`i#${orders.name}`).style.visibility= 'visible';
        
        document.querySelector(`input.${orders.name}`).disabled= false;

    }

});