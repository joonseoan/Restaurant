import React, { Component } from 'react';

import { removeSpace } from '../../utils/uIControl';


class CartInput extends Component {

    allMenuContents = () => {

        // const path = './images/';

        const menuPrices = (item) => {

            // const class_name_1 = `${removeSpace(item.name)}BgColor border 
            //     border-danger 
            //     justify-content-center 
            //     col
            //     ml-2
            //     mr-2`;

            const class_name_2 = `${removeSpace(item.name)} ml-1`;

            const class_name_3 = `${removeSpace(item.name)}Button`;

            const class_name_4 = `${removeSpace(item.name)} mx-50 my-50`;

            // const style = {

            //     width: '200px',
            //     height: '150px'
            // }

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
                    {/* 
                        <div className='icons'>
                        
                            <i className="fa fa-cart-arrow-down text-danger float-right"
                                id = { removeSpace(item.name) }
                                style={{ fontSize: '24px'}} >
                            
                                <input type = "checkbox" 
                                name = { removeSpace(item.name) } 
                                className = { class_name_2 }
                                value = { item.price }  
                                onChange = { this.menuOnChange }
                                />
                            </i>  

                        </div>
                                    
                     */}
                    
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

    render() {

        return(

            <div className='icons'>
                            
                <i className="fa fa-cart-arrow-down text-danger float-right"
                    id = { removeSpace(item.name) }
                    style={{ fontSize: '24px'}} >
                
                    <input type = "checkbox" 
                    name = { removeSpace(item.name) } 
                    className = { class_name_2 }
                    value = { item.price }  
                    onChange = { this.menuOnChange }
                    />
                </i>

            </div>
            
        );
    }

}

export default CartInput;