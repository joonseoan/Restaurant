import React from 'react';
import { options } from '../../utils/cities';
import _ from 'lodash';

const SelectCity = props => {
    
    const handleOnClick = e => {

        const { setCity,  refreshStatus } = props;
        
        refreshStatus();
                
        const { value } = e.target;
        
        sessionStorage.setItem('branch_city', value);

        setCity(value);
        
    
        //window.location.reload();
    }

    return(

        <div>
            <div className="dropdown">

                <button className="col-sm btn btn-success dropdown-toggle d-block" type="button" data-toggle="dropdown">
                    Branch Restaurants
                </button>

                <div className="col-sm dropdown-menu border border-danger ml-1">
                    
                    { options.map(cities =>(

                        <button

                            key = { cities.value } 
                            className="dropdown-item"
                            onClick={ handleOnClick } 
                            value={ cities.value }>
                            
                            { cities.value }
                        
                        </button>

                    )) }    

                </div>
            </div>
        </div>

    );
        
}

export default SelectCity;