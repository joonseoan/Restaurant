import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import MenuList from './Menu_list';
import Bill from '../Bill/Bill';
import { initUI } from '../../utils/uIControl';

class MenuAndOrder extends Component {

    state = {
        
        //name_price: [],
        name_price: [{name: 'Gamja Soup', price: 19.99, number: 3 }],
        showModal : false,
        
    };
    
    handleOpenModal = () => {

        this.setState ({ 
 
             showModal : true,
             newPage : false,
             name_price: this.state.name_price.filter(menu => (menu.number !== 0))
 
         }); 

          // need to test it if it is necessary

          // initUI(this.state.name_price);
            
    }
 
    handleCloseModal = () => {
 
         this.setState ({ 
             
             showModal : false
         
         });
  
    }
 
    render() {

        if(!this.props) return <div/>; 
        // if(!this.props.recomMenu)  return<div/>;

        if(this.state.newPage) 
            return <Redirect to = 'thankyouAndGuestbook' menuChecked = { this.state.name_price } />;

        const display = { display: !this.state.showModal ? 'block' : 'none' }

        return(

            <div className="container mt-5 mb-5">

                <h4 className="text-center">
                    Menu & Order
                </h4>
                
                <div className="mt-5">
                    
                    {/* 
                        <form onSubmit = { this.submitValue }> 
                     */}

                    <div>
                    
                        <MenuList />
                    
                    </div>

                    <div className = "btn btn-danger mt-3 mx-auto fixed-bottom w-50" 
                        onClick = { this.handleOpenModal }
                        style = { display }
                        id = 'order'
                    >
                
                        Place an Order
                
                    </div>
                {/* 
                    </form> 
                 */}
                    
                </div>
            
                <Bill openStatus = { this.state.showModal } menuChecked = { this.state.name_price } 
                    newPageStatus = {() => { this.setState ({ newPage : true })}}>

                    <div className = "btn btn-primary" onClick = { this.handleCloseModal } >
                        Back to Menu
                    </div>

                </Bill>

            </div>       
            
        );

    }

}

export default MenuAndOrder;