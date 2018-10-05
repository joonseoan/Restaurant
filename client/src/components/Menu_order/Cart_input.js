import React, { Component } from 'react';
import _ from 'lodash';

import { removeSpace, initUI } from '../../utils/uIControl';

class CartInput extends Component {

    state = {

        visibility: 'visible',
        disabled: false,
        // display: 'none',
        number: 0

    }

    menuOnChange = event => {
 
        const { name, value, checked } = event.target;

        const { items, toCheckItems, orderButton } = this.props.controlFunction.dataControl;
        
        const { checkedColor } = this.props.controlFunction.menuColorControl;

        const { number } = this.state;

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

        const newItems = [ ...items, { name, value, checked, number } ];
        
        toCheckItems(newItems); 

        //document.querySelector(`div.${removeSpace(name)}Button`).style.display = `${!checked ? 'none' : 'block'}`;

    }

    render() {

      if(!this.props) return <div/>;

        const { name, price } = this.props.controlFunction.menuColorControl.menuItems;
        
        return(

            <div className='icons'>
                            
                <i className="fa fa-cart-arrow-down text-danger float-right"
                    id = { removeSpace(name) }
                    style={{ fontSize: '24px', visibility: `${ this.state.visibility }`}} 
                    disabled={ this.state.disabled }>
                
                    <input type = "checkbox" 
                        name = { removeSpace(name) } 
                        className = { `${removeSpace(name)} ml-1` }
                        value = { price }  
                        onChange = { this.menuOnChange }
                    />
                </i>

            </div>
            
        );
    }

}

export default CartInput;