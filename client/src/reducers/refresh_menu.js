import { REFRESH_MENU } from '../actions/fetch_weather';

export default function(state = {}, action) {

    switch(action.type) {

        case REFRESH_MENU:
        
  		     return action.payload;

        default:
    
            return state;
   
    }

}