import React, { Component } from 'react';

import CartInput from './Cart_input';

class Main extends Component {

    render() {

        if(!this.props) return <div/>;

        console.log(this.props)

        const { name, price, description, file } = this.props.menuItems;

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
                    
                        // menuItems = { this.props.menuItems }
                        // currentItems = { this.props.currentItems }
                        // checkingItems = { this.props.checkingItems  } 
                        // orderButton = { this.props.orderButton }

                    />

                            
                </label>

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