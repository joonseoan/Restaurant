import React from 'react';
import { connect } from 'react-redux';

// import TodayWeatherCoordinate from './today_weather_coordinate';
import TodayWeather from '../components/Today_weather';

const LocationCoordinate = (props) => {
    
    if(!props.branchLocation)
    return <div/>;

    const { location } = props.branchLocation.results[0].geometry;
    
    return(

        <div>

            <div>
                {/*
                    <TodayWeatherCoordinate
                    
                        lat = { lat }
                        lng = { lng }
                    />
                */}

                <TodayWeather area = { location } />

            </div>

        </div>
    );
}

function mapsPropsToState({ branchLocation }) {

    return { branchLocation };
}

export default connect(mapsPropsToState)(LocationCoordinate);