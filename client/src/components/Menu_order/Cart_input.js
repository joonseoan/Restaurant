import React, { Component } from 'react';
import _ from 'lodash';

import { removeSpace, initUI } from '../../utils/uIControl';

class CartInput extends Component {

    menuOnChange = event => {

        const { name, value, checked } = event.target;
        
        const { items, toCheckItems, orderButton } = this.props.controlFunction.dataControl;
        
        orderButton('none');
        
        if (items.length > 0) {

            const cleanCart = _.each(items, orders => {

                if (orders.number === 0) {

                    const index = items.indexOf(orders);

                    return items.splice(index, 1); 
    
                }

            });

           toCheckItems(cleanCart);

        }

        const newItems = [ ...items, { name, value, checked, number:0 } ];
        
        toCheckItems(newItems); 

    }

    render() {

      if(!this.props) return <div/>;

        const { name, price } = this.props.controlFunction.menuColorControl.menuItems;
        const { items } = this.props.controlFunction.dataControl;

        let visibility = 'visible';
        let disabled = false;
        let checked = false;

        _.each(items, item => {

            if(item.name === removeSpace(name)) {

                visibility = 'hidden';
                disabled = true;
                checked = false;

            }

        });        

        return(

            <div className='icons'>
                            
                <i className="fa fa-cart-arrow-down text-danger float-right"
                    id = { removeSpace(name) }
                    style={{ fontSize: '24px', visibility: `${ visibility }`}} 
                >
                
                    <input type = "checkbox" 
                        name = { removeSpace(name) } 
                        className = { `${removeSpace(name)} ml-1` }
                        value = { price }  
                        onChange = { this.menuOnChange }
                        disabled = { disabled }
                        checked = { checked }
                    />
                </i>

            </div>
            
        );
        
    }

}

export default CartInput;