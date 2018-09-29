import React, { Component } from 'react';
import { connect } from 'react-redux';

import Select from 'react-select-me';
import 'react-select-me/lib/ReactSelectMe.css';

import { location, additionalTodayWeatherInfo } from '../actions';
import DateTimeDisplay from '../components/Date_time_display';
import LocationCoordinate from './location_coordinate';
import { options } from '../utils/cities';


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

        // branch_city = window.localStorage.branch_city;
        
        console.log(e.target.value);
        this.setTodayWeatherInfo(e.target.value);

    }

    // freshup = e => {

    //     console.log('eeeeeeeeeeeeee', e);
    //    // e.persist();
    //      // e.preventDefault();
    //      // e.reset();

        

    // }

    render() {

        //console.log(Select);

        if(!this.state.value)
        return (<div>Loading...</div>);

        return (

            <div>
                <nav className="navbar navbar-expand-sm bg-warning">    
                    
                    <div className="text-center w-100">
                        <h4>Welcome to Korean Restaurant in {`${this.state.value}`}</h4>
                    </div>

                    <div className="d-block-inline w-50">

                    <label>Bracn Restaurant</label>
                    {/* onSubmit={ this.freshup } */}
                    
                     <form className="pt-3 pr-5">   

                          
                        <button onClick={ this.handleOnClick } value="Toronto">Toronto</button>

                        <button onClick={ this.handleOnClick } type="submit" value="Vancouver">Vancouver</button>
                        <br></br><br></br>


                        {/*  
                            <button type="submit" value = "Toronto">Toronto</button>
    
                            <button type = "submit" value="Vancouver">Vancouver</button>
                        */}
                                    {/*
                                        <select
                                            className="form-control"
                                            // option = { options }
                                           // value = { this.state.value }
                                          //  onChange = { this.onInputChange }
    
                                        >
                                        <option value = "Toronto">Toronto</option>
                                        <option value = "Vancouver">Vancouver</option>
    
                                        
                                                options.map(city => (
     
                                                    <option key = {city.value} 
                                                            value = {city.value}>
    
                                                        { city.value }
    
                                                    </option>
                                                
                                                )) 
                                                
    
                                        </select>
                                    */}
                               

                            {/*

                                <Select className="form-control" 
    
                                    options = { options }
                                    value = { this.state.value }
                                    onChange = { this.onInputChange }
    
                                />
                            */}
                    
                       </form>  

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