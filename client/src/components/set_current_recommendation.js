import React from 'react';


import RecommendedMenu from './Recommended_menu';
import { regexFilter, setWeather } from '../utils/mainWeather';

export default function SetCurrentRecommendation(props) {

        const { inputMenus, temperature, mainWeather } = props;

        const getWeather = regexFilter(mainWeather);
       
        const indexValue = setWeather(getWeather);
    
        return(
                
            <RecommendedMenu 
                menu = { inputMenus } 
                temp = { temperature }
                value = { indexValue }
            />
                            
        );

}