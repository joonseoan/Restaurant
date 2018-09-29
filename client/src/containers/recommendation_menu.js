import React from 'react';
import { connect } from 'react-redux';
// import _ from 'lodash';

import SetCurrentRecommendation from '../components/Set_current_recommendation';
import { roundData } from '../utils/other_weathers';

function RecommendationMenu (props) {

    //if (!props.menu || !props.todayWeather || !props.additionalTodayWeather)
    if (!props.menu || !props.additionalTodayWeather)
        return <div>Loading....</div>

        const { menu } = props; 
        const { main } = props.additionalTodayWeather.weather[0];
        const { temp } = props.additionalTodayWeather.main;

        return (
        
            <div className="mt-5 container border border-info text-center">

                <h4>
                    Special For you Based on Weather
                </h4>
                        
                    <SetCurrentRecommendation
                            
                            inputMenus = { menu }
                            mainWeather = { main }
                            temperature = { roundData(temp - 273) }
                            
                    />    
            
            </div>

        );
}

// function mapsPropsToState ({ menu, todayWeather, additionalTodayWeather,  }) {

//     return ({ menu, todayWeather, additionalTodayWeather,  });

// }

function mapsPropsToState ({ menu, additionalTodayWeather,  }) {

    return ({ menu, additionalTodayWeather  });

}

export default connect (mapsPropsToState)(RecommendationMenu);

