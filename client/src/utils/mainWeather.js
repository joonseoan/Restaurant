import _ from 'lodash';

const weatherCategories = [ 'Clear', 'Cloudy', 'Clouds', 'Overcast', 'Rain', 'Drizzle', 'Mist', 
    'Haze', 'Sleet', 'Snow', 'Storm', 'Shower', 'Thunderstorms','Breezy', 'Smoke', 'Fog', 'Humid', 
    'Humidy', 'Blizzard', 'Dust', 'Whirls', 'Sand', 'Squalls', 'Tornado', 'Windy', 
    'Hurricane', 'Ash', 'windBearing', 'Thunderstorm', 'Humi',
     'Hail'];

export function regexFilter(weather) {

    console.log('weather in main: ', weather)
    
    let result;

    _.each(weatherCategories, data => {

        const patt = new RegExp(`${data}+`, 'i');

        if (weather.match(patt))
            result = weather.match(patt);

    });

    return result[0];

}

export function setWeather (getWeather) {

    let indexValue

    _.each(weatherCategories, weather => {

        if (getWeather === weather) {

            indexValue = weatherCategories.indexOf(getWeather);

        }

    });

    return indexValue;

}