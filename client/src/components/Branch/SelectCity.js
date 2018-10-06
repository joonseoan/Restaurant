import React from 'react';
import { options } from '../../utils/cities';
import { connect } from 'react-redux';
import _ from 'lodash';
import { initUI } from '../../utils/uIControl';

const SelectCity = props => {
    
    
    const handleOnClick = e => {

        const { value } = e.target;
        
        const { setCity, 
            refreshMenu: { refreshData, refreshUI } } = props;
            
        sessionStorage.setItem('branch_city', value);

        

        
        
        // console.log(refreshButton);
        
        if(refreshData && refreshUI ) {
            
            // console.log(refreshButton);
            
            // refreshButton();
            
            // _.each(refreshUI, item => {
                
                //     initUI(item.name);
                
                // });
                refreshData();
                
                
                
            
                
                // this.forceUpdate();
                
                
                
                
            }
            
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

function mapsPropsToState ({ refreshMenu, refreshButton }) {

    return ({ refreshMenu, refreshButton  });

}

export default connect(mapsPropsToState)(SelectCity);