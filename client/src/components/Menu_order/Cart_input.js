import React, { Component } from 'react';
import _ from 'lodash';

import { removeSpace, initUI } from '../../utils/uIControl';
// import {} from '../../utils/uIControl';


class CartInput extends Component {

    /* 
        allMenuContents = () => {


        const menuPrices = (item) => {

            const class_name_3 = `${removeSpace(item.name)}Button`;

            const class_name_4 = `${removeSpace(item.name)} mx-50 my-50`;

            const buttonDisplay = () => {
                
                const buttons = [ 1, 2, 3, 4 ];

                const eachButton = buttons.map(button => {
        
                    return (<span key = { button } 

                        className="btn btn-sm mr-1 mb-1"
                        style={{ backgroundColor:'#ff4444', color:'white' }}
                        onClick = { this.numberOnChange } 
                        id = { removeSpace(item.name) }>
                    
                        { button }
                    
                    </span>);
                                
                });
    
                return (
                    
                    <div className="btn-group">
                        
                        <span 
                            className="btn btn-sm mr-1 mb-1 btn-primary"
                            onClick = { this.numberOnChange } 
                            id = { removeSpace(item.name) }>0</span>
                        
                        { eachButton }

                        <span 
                            className="btn btn-sm mr-1 mb-1"
                            style = {{ backgroundColor:'#CC0000', color:'white'}}
                            onClick = { this.numberOnChange } 
                            id = { removeSpace(item.name) }>+</span>
                
                    </div>
                    
                );
                
            }

            return (
             
                <div id={ item.name } key = { item.name } className = { class_name_1 } >

                    <div>
        
                        <p className='blink text-danger font-italic font-weight-bold d-inline' id = {removeSpace(item.name)}
                            style={{ visibility : 'hidden' }}> 

                            Special for you!

                        </p>        
                        <div className = { class_name_3 } id="number-input" style={{display: 'none'}}>

                            <div className="mt-3">
                                Number of Orders: <label className = { removeSpace(item.name) }>0</label>
                            </div>
                            <div className="mt-3">
                                { buttonDisplay() }
                            </div>
                                
                        </div>
    
                    </div>

                    <div className="mr-2 pl-2">

                        <div key = { item.name } className = { class_name_4 } id = "all-pictures" width = '120'>
                            
                            <button className="btn btn-sm btn-info mt-3" 
                                data-toggle="modal" 
                                data-target="#allMenu"
                                onClick={ this.handleDescription }
                                value = { item.name }
                            >
                                        
                                Check Detail
                                            
                            </button>
                
                            <div className="modal" id="allMenu">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title"></h5>
                                            <button className="close btn btn-danger" data-dismiss="modal">&times;</button>
                                        </div>
                
                                        <div className="modal-body">
                                               
                                            <RecommendationDescriptions
                                                foodName = { this.state.toDescription }
                                            />
                
                                        </div>
                                            
                                        <div className="modal-footer">
                                            <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                
                                    </div>
                                </div>
                            </div>                
                         
                           
                        </div>

                        
                
                    </div>

                </div>
                    
            );
    
        }
    
    }
    
    
    */

    /* 
      menuItems = { this.props.menuItems }
        currentItems = { this.props.currentItems }
        checkingItems = { this.props.checkingItems  } 
        orderButton = { this.props.orderButton }

    
    */

    state = {

        visibility: 'visible',
        disabled: false,
        display: 'none'

    }

    menuOnChange = event => {
 
        const { name, value, checked } = event.target;

        // const { currentItems, checkingItems, orderButton } = this.props;

        // const { currentItems, bgColor } = currentItems;

        console.log(this.props.currentItems);

        // please change this one to state
        // const label = document.querySelector(`label.${removeSpace(name)}`);
        // let number = Number(label.innerHTML);

        // orderButton('none');

        // if (currentItems.length > 0) {

        //     const cleanCart = _.each(currentItems, orders => {

        //         if (orders.number === 0) {

        //             initUI();

        //             const index = currentItems.indexOf(orders);

        //             return currentItems.splice(index, 1); 
    
        //         }

        //     });

        //     checkingItems(cleanCart);

            
        //     // this.setState({
    
        //     //     name_price: this.state.name_price.forEach(menu => {

        //     //         if(menu.number === 0) {

        //     //             const index = this.state.name_price.indexOf(menu);
    
        //     //             this.state.name_price.splice(index, 1);

        //     //         }

        //     //     })
    
        //     // });

        // }

        // // number!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // const newItems = [ ...currentItems, { name, value, checked } ];

        // checkingItems(newItems); 

        // console.log(currentItems);


        // // this.setState({  
            
        // //     name_price: [ ...this.state.name_price, { name, value, number, checked } ]

        // // });

        // // document.querySelector(`i#${name}`).style.visibility = 'hidden';

        // // document.querySelector(`input.${name}`).disabled = true;

        // const color = !checked ? '' : '#FAFAD2';

        // // document.querySelectorAll(`div.${removeSpace(name)}BgColor`)[0]
        //      //   .style.backgroundColor = color;

        // bgColor(color)

        // document.querySelector(`div.${removeSpace(name)}Button`).style.display = `${!checked ? 'none' : 'block'}`;

    }

    render() {

        if(!this.props) return <div/>;

        const { name, price } = this.props.menuItems;
        
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