import { REFRESH_BUTTON } from '../actions/fetch_weather';

export default function(state = null, action) {

    switch(action.type) {

        case REFRESH_BUTTON:
        
  		     return action.payload;

        default:
    
            return state;
   
    }

}