import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SetCurrentRecommendation from './Set_current_recommendation';
import { roundData } from '../../utils/other_weathers';

class RecommendationMenu extends Component {

    // shouldComponentUpdate(nextProps) {
        
    //     if(nextProps.menu === this.props.menu) return false;

    //     return true;

    // }

    render() {

        const { menu, additionalTodayWeather } = this.props;

        if (!menu || !additionalTodayWeather)
            return <div/>;
 
            const { main } = additionalTodayWeather.weather[0];
            const { temp } = additionalTodayWeather.main;

            return (

                <div>
                    <div className="mt-5 container border border-info text-center">
        
                        <h4 className="mb-2">
                            Special For you Based on Weather
                        </h4>

                        
                        <SetCurrentRecommendation
                                
                                inputMenus = { menu }
                                mainWeather = { main }
                                temperature = { roundData(temp - 273) }
                                
                        />    
                
                    </div>

                    <div className="container border border-danger text-center">

                        <Link className="btn btn-info btn-sm mt-3" to = '/guestbookAllPosted'>

                            REVIEW CUSTOMER's BEST CHOICE

                        </Link>
                    
                    </div>

                </div>
    
            );
    
    }

}

function mapsPropsToState ({ menu, additionalTodayWeather,  }) {

    return ({ menu, additionalTodayWeather  });

}

export default connect(mapsPropsToState)(RecommendationMenu);

