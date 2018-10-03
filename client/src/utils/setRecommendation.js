import { soup, main, side, drink } from './recommendation_engine';
import _ from 'lodash';

export function setCurrentMenu(inputData) {

    if (!inputData) 
        inputData = this.props;

    const { menu, temp, value } = inputData;

    const selectedSoup = soup(temp, value, menu.soup);
    const selectedMain = main(temp, value, menu.main);
    const selectedSide = side(temp, value, menu.side);
    const selectedDrink = drink(temp, value, menu.drink);
    
    const selectedMenu = _.concat(selectedSoup, selectedMain, selectedSide, selectedDrink);

    return selectedMenu;
  
}
