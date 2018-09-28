import React, { Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import WOW from 'wow.js';

import { roundData, weatherImage } from '../utils/other_weathers';
import GoogleMap from '../components/Google_map';

class TodayWeather extends Component {

    componentDidMount() {

        if (typeof window !== 'undefined') { const wow = new WOW(); wow.init(); }

    }

    render() {

        // if (!this.props.todayWeather || !this.props.additionalTodayWeather)
        if (!this.props.additionalTodayWeather)
            return (<div>Loading...</div>);
    
        // const weather = this.props.todayWeather;
        const additionalWeather = this.props.additionalTodayWeather;
        const { lat, lng } = this.props.branchLocation.results[0].geometry.location;

        return(
        
            <div className="container">

                <div className="my-5">
                    <h4 className="text-center"> 
                        Real-Time Weather Info
                    </h4>
                </div>
                <div>
                    <div className="row text-center mt-3">
                    
                        <div className="col col-md mr-1 mb-2 wow flipInY" data-wow-delay="0.5s"> 
                            <div className="bg-success">Restaurant Location</div>
                            <GoogleMap lat = { lat } lng = { lng } />
                        </div>
                        <div className="col col-md border border-primary ml-1 mr-1 mb-2 wow flipInY" data-wow-offset="50" data-wow-delay="0.7s">
                            <div className="bg-primary"> Highest </div>
                            <div className="my-4">{ roundData((additionalWeather.main.temp_max) - 273) } &#8451;</div>
                        </div>
                        <div className="col col-md border border-danger ml-1 mr-1 mb-2 wow flipInY" data-wow-offset="50" data-wow-delay="0.9s">
                            <div className="bg-danger"> Present </div>
                            <div className="my-4">{ roundData((additionalWeather.main.temp) - 273) } &#8451;</div>
                        </div>
                        <div className="col col-md border border-warning ml-1 mr-1 mb-2 wow flipInY" data-wow-offset="50" data-wow-delay="1.1s">
                            <div className="bg-warning"> Lowest </div>
                            <div className="my-4">{ roundData((additionalWeather.main.temp_min) - 273) } &#8451;</div>
                        </div>
                        <div className="col col-md border border-info ml-1 mr-1 mb-2 wow flipInY" data-wow-offset="50" data-wow-delay="1.3s">
                            <div className="bg-info"> Weather </div>
                            <div className="my-2">{ weatherImage(additionalWeather.weather[0].main) }</div>
                        </div>
                        <div className="col col-md border border-secondary ml-1 mr-1 mb-2 wow flipInY" data-wow-offset="50" data-wow-delay="1.5s">
                            <div className="bg-secondary"> Description </div>
                            <div className="text-capitalize my-4">{ additionalWeather.weather[0].description }</div>
                        </div>


                        {/*
                            <div className="col col-md border border-danger ml-1 mr-1 mb-2 wow flipInY" data-wow-offset="50" data-wow-delay="1.5s">
                                <div className="bg-danger"> Present </div>
                                <div className="my-4">{ roundData((weather.temperature -32) / 1.8) } &#8451;</div>
                            </div>
                            <div className="col col-md border border-primary ml-1 mr-1 mb-2 wow flipInY" data-wow-offset="50" data-wow-delay="1.7s">
                                <div className="bg-primary"> Apperent </div>
                                <div className="my-4">{ roundData((weather.apparentTemperature -32) / 1.8) } &#8451;</div>
                            </div>
                            <div className="col col-md border border-success ml-1 mr-1 mb-2 wow flipInY" data-wow-offset="50" data-wow-delay="1.9s">
                                <div className="bg-success"> Wind </div>
                                <div className="my-4">{ roundData(weather.windSpeed * 1.61) } Km/h</div>
                            </div>
                        */}                       
                    </div>
                </div>

            </div>
        );

    }

}

// function mapStateToProps ({ todayWeather, additionalTodayWeather, branchLocation }) {
function mapStateToProps ({ additionalTodayWeather, branchLocation }) {

   // return({ todayWeather, additionalTodayWeather, branchLocation });
    return({ additionalTodayWeather, branchLocation });

}

export default connect(mapStateToProps)(TodayWeather);