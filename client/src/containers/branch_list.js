import React, { Component } from 'react';
import { connect } from 'react-redux';

import { location, additionalTodayWeatherInfo } from '../actions';
import DateTimeDisplay from '../components/Date_time_display';
import LocationCoordinate from './location_coordinate';
import { options } from '../utils/cities';
import { reset } from 'redux-form';


let startInterval;

let branch_city;

class BranchList extends Component {

    state = { 
        
        value: ''
    
    };
    
    setTodayWeatherInfo = branch_city => {

        this.setState({ value : branch_city});

        this.props.location(branch_city);
        
        this.props.additionalTodayWeatherInfo(branch_city);

        if(startInterval) clearInterval(startInterval);

        startInterval = setInterval(() => {

            this.props.additionalTodayWeatherInfo(branch_city);

        }, 300000);

    }

    componentDidMount() {

        if (!branch_city && !sessionStorage.branch_city) {

            branch_city = options[0].value;

            // window.localSession.setItem('branch_city', branch_city);

        } else if (sessionStorage.branch_city) {

            branch_city = sessionStorage.branch_city
        
        }

        this.setTodayWeatherInfo(branch_city);

    }

    handleOnClick = e => {

        sessionStorage.setItem('branch_city', e.target.value);
        
        this.setTodayWeatherInfo(e.target.value);

       // window.location.reload();

    }

    render() {

        if(!this.state.value)
        return <div/>;

        return (

            <div>
                <nav className="navbar navbar-expand-sm bg-warning">  

                    <div className="text-center w-100">
                        <h4>Welcome to Korean Restaurant in { `${this.state.value}` }</h4>
                    </div>

                    <div className="mx-auto text-center w-50">
                        
                        <div>
                            <div className="dropdown">

                                <button className="btn btn-success dropdown-toggle d-block" type="button" data-toggle="dropdown">
                                    Branch Restaurants
                                </button>

                                <div className="dropdown-menu border border-danger ml-1">
                                    
                                    { options.map(cities =>(

                                        <button

                                            key = { cities.value } 
                                            className="dropdown-item text-center"
                                            onClick={ this.handleOnClick } 
                                            value={ cities.value }>
                                            
                                            { cities.value }
                                        
                                        </button>

                                    ))}    

                                </div>
                            </div>
                        </div>

                    </div>
                </nav>

                    <div className="mt-5">
    
                        <LocationCoordinate />
                  
                    </div>

                <div>
                
                    <DateTimeDisplay branch_city = { this.state.value } />

                </div>

            </div>
        
        );

    }

}

export default connect (null, { location, additionalTodayWeatherInfo })(BranchList);