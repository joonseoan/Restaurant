import React, { Component } from 'react';
import _ from 'lodash';

import { removeSpace, initUI } from '../../utils/uIControl';

class Orders extends Component {

        /* 
        allMenuContents = () => {

        const menuPrices = (item) => {

            const class_name_4 = `${removeSpace(item.name)} mx-50 my-50`;

            return (
             
                <div id={ item.name } key = { item.name } className = { class_name_1 } >

                    <div>
        
                        <p className='blink text-danger font-italic font-weight-bold d-inline' id = {removeSpace(item.name)}
                            style={{ visibility : 'hidden' }}> 

                            Special for you!

                        </p>        
    
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

    buttons = [1, 2, 3, 4];

    state = {

        number: 0

    }

    numberOnChange = e => {
        
        const { items } = this.props.cartAndButton.items;

        const CurrentMenuName = e.target.id;

        let buttonValues;

        if (e.target.value !== '+') {

            buttonValues = Number(e.target.value);
    
            this.setState({ 
                
                number: buttonValues
    
            });
    
            if(buttonValues === 0) {

                items.forEach(menu => {

                    if (menu.name === CurrentMenuName) {
    
                        const index = items.indexOf(menu);
    
                        items.splice(index, 1);
    
                    }
    
                });

                initUI(CurrentMenuName);

            }

        } else {

            buttonValues = this.state.number + 1;

            this.setState({ 
                
                number: buttonValues
    
            });

        }

        // if(this.state.name_price.length > 0) {

        //     let count;

        //     this.state.name_price.forEach(order => {
                
        //         count =+ order.number;

        //     });

        //     if(count > 0) {

        //         document.querySelector('#order').style.display = 'block';

        //      }

        // } else {

        //     document.querySelector('#order').style.display = 'none';

        // }



        _.each(items, item => {

            if(CurrentMenuName === item.name) {
                
                item['number'] = buttonValues;

            }

        });
        
    }

    buttonDisplay = () => {

        const { name } = this.props.cartAndButton;
        
         return this.buttons.map(button => {
             
            const visibility = Number(button) === this.state.number ? 'hidden' : 'visible';

            return (<button key = { button }

                className="btn btn-sm mr-1 mb-1"
                style={{ backgroundColor:'#ff4444', color:'white', visibility: `${ visibility }` }}
                value = { button }
                onClick = { this.numberOnChange } 
                id = { removeSpace(name) }>
            
                { button }
            
            </button>);
                        
        });

    }

    shouldComponentUpdate(nextState) {

        if(this.state.number === nextState.number) return false
        
        return true;

    }

    render() {

        if(!this.props) return <div/>;

        const { name, items: { items } } = this.props.cartAndButton;
        
        const className = `${removeSpace(name)}Button`;

        let display = 'none';

        _.each(items, item => {

            if(removeSpace(name) === item.name) display = 'block';
            
        });
        
        return(

            <div>

                <div className = { className } id="number-input" style={{ display: `${ display }` }}>

                    <div className="mt-3">

                        Number of Orders: <label className = { removeSpace(name) }>{ this.state.number}</label>
                    
                    </div>

                    <div className="btn-group mt-3">

                        <button 
                            className="btn btn-sm mr-1 mb-1 btn-primary"
                            onClick = { this.numberOnChange }
                            value = {0} 
                            id = { removeSpace(name) }>0</button>

                        { this.buttonDisplay() }

                        <button 
                            className="btn btn-sm mr-1 mb-1"
                            style = {{ backgroundColor:'#CC0000', color:'white'}}
                            //value = {'+'}
                            onClick = { this.numberOnChange }
                            value = {'+'} 
                            id = { removeSpace(name) }>+</button>

                    </div>

                </div>

            </div>
                    
        );

    }

}

export default Orders;