import React, { Component } from 'react';
import { connect } from 'react-redux';

import Select from 'react-select-me';
import 'react-select-me/lib/ReactSelectMe.css';

import { location, additionalTodayWeatherInfo } from '../actions';
import DateTimeDisplay from '../components/Date_time_display';
// import LocationCoordinate from './location_coordinate';

const options = [ 
    
    { value: 'Toronto', label: 'Toronto' },
    { value: 'Vancouver', label: 'Vancouver' },
    { value: 'Ottawa', label: 'Ottawa' }

];

let startInterval;

let branch_city;

class BranchList extends Component {

    state = { 
        
        value: ''
    
    };
    
    setTodayWeatherInfo(branch_city) {

        this.setState({ value : branch_city});

        this.props.location(branch_city);
        
        this.props.additionalTodayWeatherInfo(branch_city);

        if(startInterval) clearInterval(startInterval);

        startInterval = setInterval(() => {

            this.props.additionalTodayWeatherInfo(branch_city);

        }, 300000);

    }

    
    componentDidMount() {

        if (!branch_city) {

            branch_city = options[0].value;

           // window.localStorage.setItem('branch_city', branch_city);

        }

       //  branch_city = window.localStorage.branch_city

        this.setTodayWeatherInfo(branch_city);

    }

    onInputChange = () => {
        
       // window.localStorage.setItem('branch_city', value.value);

       // branch_city = window.localStorage.branch_city;
        
        this.setTodayWeatherInfo(branch_city);

    }

    render() {

        if(!this.state.value)
        return (<div>Loading...</div>);

        return (

            <div>
                <nav className="navbar navbar-expand-sm bg-warning">    
                    
                    <div className="text-center w-100">
                        <h4>Welcome to Korean Restaurant in {`${this.state.value}`}</h4>
                    </div>

                    <div className="d-block-inline w-50">
                    
                        <form className="form-group pt-3 pr-5">
                        
                            <Select className="form-control" 

                                options = { options }
                                value = { this.state.value }
                                onChange = { this.onInputChange }

                            />
                    
                        </form>

                    </div>
                </nav>

                 {/* 
                    <div className="mt-5">
    
                        <LocationCoordinate />
                  
                    </div>
                */}

                <div>
                
                    <DateTimeDisplay branch_city = { this.state.value } />

                </div>

            </div>
        
        );

    }

}

export default connect (null, { location, additionalTodayWeatherInfo } )(BranchList);