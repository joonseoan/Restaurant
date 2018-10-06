import React, { Component } from 'react';
import _ from 'lodash';

import CartInput from './Cart_input';
import Orders from './Orders';
import RecommendationMessage from './Recommendation_message';

class Main extends Component {

    render() {

        if(!this.props) return <div/>;

        const { name, price, description, file } = this.props.menuColorControl.menuItems;

        const data = { 
                
            name,
            items: this.props.dataControl
                    
        }

        const style = {

            width: '200px',
            height: '150px'

        }

        const path = './images/';

        return(

            <div>

                <label className="d-block clearfix mt-2">
                                
                    <span className="float-left text-muted d-block" 
                        style={{fontSize: '13px'}}>
                        <b>{ name }</b> 
                        (${ price }):
                    </span>

                    <CartInput 
                    
                        controlFunction = { this.props }
                    
                    />
        
                </label>

                <RecommendationMessage menuNames = { name }/>

                <Orders

                    cartAndButton = { data }
                    refreshAction = { this.props.refreshAction }
                    setRefresh = { this.props.setRefresh }

                />

                <img
                    style={ style } 
                    className="img img-fluid img-thumbnail mt-3" 
                    src = { path + file }
                    alt = { name } 
                />

                <div className="mt-3">

                    <p className="text-justify text-center">{ description }</p> 
                
                </div>

            </div>

        );
    }

}

export default Main;