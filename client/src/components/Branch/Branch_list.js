import React, { Component } from 'react';
import { connect } from 'react-redux';

import { location, additionalTodayWeatherInfo } from '../../actions';
import DateTimeDisplay from '../Weather/Date_time_display';
import LocationCoordinate from '../Weather/Location_coordinate';
import SelectCity from './SelectCity';
import { options } from '../../utils/cities';

class BranchList extends Component {

    startInterval;

    state = { 
        
        city: ''
    
    };
    
    setTodayWeatherInfo = city => {

        this.props.location(city);
        
        this.props.additionalTodayWeatherInfo(city);

        if(this.startInterval) clearInterval(this.startInterval);

        this.startInterval = setInterval(() => {

            this.props.additionalTodayWeatherInfo(city);

        }, 300000);

    }

    componentDidMount() {

        const { city } = this.state;

        if (!city && !sessionStorage.branch_city) {

            this.setState({ city: options[0].value });

        } else if (sessionStorage.branch_city) {

            this.setState({ city: sessionStorage.branch_city });
        
        }

        
        this.setTodayWeatherInfo(city || options[0].value);

    }

    shouldComponentUpdate(nextProps, nextState) {
        
        return this.state !== nextState ? true : false;

    }

    render() {

        if(!this.state.city)
            return <div/>;

        return (

            <div>
                <nav className="navbar navbar-expand-sm bg-warning">  

                    <div className="text-center w-100">
                        <h4>Welcome to Korean Restaurant in { `${this.state.city}` }</h4>
                    </div>

                    <div className="mx-auto text-center w-50">

                        <SelectCity 

                            setCity = { (city) => {
                            
                                this.setState({ city });
                                this.setTodayWeatherInfo(city);

                            }}
                            
                        />
                        
                    </div>

                </nav>

            </div>
        
        );

    }

}

export default connect (null, { location, additionalTodayWeatherInfo })(BranchList);