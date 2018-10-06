import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import MenuList from './Menu_list';
import Bill from '../Bill/Bill';

class MenuAndOrder extends Component {

    state = {
        
        showModal: false,
        name_price: [],
        orderButton: 'none'

    };

    componentDidUpdate(prevProps, prevState) {

        console.log(this.props.refreshUI, this.props.hideOrderButton)

        if(this.props.refreshUI === []) {

///            if(this.props.refreshUI !==  prevProps.name_price) {
        
                this.setState({ 
                    
                    name_price: this.props.refreshUI,
                    orderButton: this.props.hideOrderButton
    
                });

                this.props.setRefreshUI();
        
            }
   //     }


    }

    handleOpenModal = () => {

        this.setState ({ 
 
             showModal : true,
             newPage : false,
             orderButton: 'none',
             name_price: this.state.name_price.filter(menu => (menu.number !== 0))
 
         }); 

          // need to test it if it is necessary
          // initUI(this.state.name_price);
            
    }

    handleCloseModal = () => {
 
         this.setState ({ 
             
             showModal : false,
             orderButton: 'block'
         
         });
  
    }

    shouldComponentUpdate(nextState) {

        if(this.state.showModal === nextState.showModal) return false;
        if(this.state.name_price === nextState.name_price) return false;
        if(this.state.orderButton === nextState.orderButton) return false;
        
        return true;

    }
 
    render() {

        if(!this.props) return <div/>; 
        // if(!this.props.recomMenu)  return<div/>;

        if(this.state.newPage) 
            return <Redirect to = 'thankyouAndGuestbook' menuChecked = { this.state.name_price } />;

        const data = {

            items: this.state.name_price,
            toCheckItems: (menus) => { this.setState({ name_price: menus }) },
            orderButton: (control) => { this.setState({ orderButton: control }); }

        }

        return(

            <div className="container mt-5 mb-5">

                <h4 className="text-center">
                    Menu & Order
                </h4>
                
                <div className="mt-5">

                    <div>
                    
                        <MenuList 
                            controlData = { data }
                            refreshAction = { this.props.refreshAction }
                            setRefresh = { this.props.setRefresh }
                        /> 

                    </div>
                {/* `${this.state.orderButton}` */}
                    <div className = "btn btn-danger mt-3 mx-auto fixed-bottom w-50" 
                        onClick = { this.handleOpenModal }
                        style = { { display: `${this.state.orderButton}` }  }
                        id = "order"
                    >
                
                        Place an Order
                
                    </div>
            
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