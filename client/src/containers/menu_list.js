import React, { Component } from 'react';

import { connect } from 'react-redux';

import _ from 'lodash';

import { Link, Redirect } from 'react-router-dom';

import Bill from '../components/bill/bill';


function removeSpace(name) {

    return name.replace(/\s/g, "");

}

class MenuList extends Component {
        
    state = {

        name_price: [],
        showModal : false
        
    };


    displayRecommendation = (menus) => {

        const { recomMenu } = menus;

        if(!recomMenu) return;
        
        const nameList = recomMenu.map(menu => menu.name);

        nameList.forEach(names => {

            document.querySelector(`p#${removeSpace(names)}`).style.visibility = 'visible';
            document.querySelector(`p#${removeSpace(names)}`).style.color = 'red';

        });       

    }

    componentDidMount = () => {

        this.displayRecommendation(this.props);

    }

    componentWillReceiveProps(nextProps) {

        this.displayRecommendation(nextProps);

    }
    
    menuOnChange = (event) => {

        const { name, value, checked } = event.target;

        const label = document.querySelector(`label.${removeSpace(name)}`);

        let number = Number(label.innerHTML);

        document.querySelector('#order').style.display = 'none';

        if (this.state.name_price.length > 0) {

            this.state.name_price.forEach(orders => {
            
                if (orders.number === 0) {
    
                    document.querySelector(`input[name="${removeSpace(orders.name)}"]`).checked = false;
    
                    document.querySelector(`div.${removeSpace(orders.name)}BgColor`).style.backgroundColor = '';
    
                    document.querySelector(`div.${removeSpace(orders.name)}Button`).style.display = 'none';
    
                    document.querySelector(`i#${orders.name}`).style.visibility= 'visible';
    
                    document.querySelector(`input.${orders.name}`).disabled= false;
    
                }
    
            });

            this.setState({
    
                name_price: this.state.name_price.forEach(menu => {

                    if(menu.number === 0) {

                        const index = this.state.name_price.indexOf(menu);
    
                        this.state.name_price.splice(index, 1);

                    }

                })
    
            });

        }

        this.setState({  
            
            name_price: [ ...this.state.name_price, { name, value, number, checked }]

        });

        document.querySelector(`i#${name}`).style.visibility = 'hidden';

        document.querySelector(`input.${name}`).disabled = true;

        const color = !checked ? '' : '#FAFAD2';

        document.querySelectorAll(`div.${removeSpace(name)}BgColor`)[0]
                .style.backgroundColor = color;

        document.querySelector(`div.${removeSpace(name)}Button`).style.display = `${!checked ? 'none' : 'block'}`;

    }
    
    numberOnChange = (event) => {

        const CurrentMenuName = event.target.id;
        
        let buttonValues = event.target.innerHTML;

        const label = document.querySelector(`label.${CurrentMenuName}`);

        let labelValues = Number(label.innerHTML);
        
        const spans = document.querySelectorAll(`span#${CurrentMenuName}`);
        
        const buttons = [ 1, 2, 3, 4 ];

        if (buttonValues !== '+') {

            buttonValues = Number(buttonValues);

            const disPlayButtons = buttons.filter( buttonNumber => buttonNumber !== buttonValues);
                
            _.each(disPlayButtons, button => {

                spans[button].style.visibility = 'visible';
              
            });

            spans[buttonValues].style.visibility = 'hidden';

            if(buttonValues === 0) {

                this.state.name_price.forEach(menu => {

                    if (menu.name === CurrentMenuName) {
    
                        const index = this.state.name_price.indexOf(menu);
    
                        this.state.name_price.splice(index, 1);
    
                    }
    
                });
    
                document.querySelector(`input[name="${removeSpace(CurrentMenuName)}"]`).checked = false;

                document.querySelector(`div.${removeSpace(CurrentMenuName)}BgColor`).style.backgroundColor = '';

                document.querySelector(`div.${removeSpace(CurrentMenuName)}Button`).style.display = 'none';

                document.querySelector(`i#${CurrentMenuName}`).style.visibility= 'visible';

                document.querySelector(`input.${CurrentMenuName}`).disabled= false;
            }

        } else {

            labelValues++;
            
            buttonValues = labelValues;
            
            if(buttonValues > 4) {

                _.each(buttons, button => {

                    spans[button].style.visibility = 'visible';
    
                });

            }

        }

        spans[0].style.visibility ='visible';
        
        const displayNumber = document.createTextNode(buttonValues);

        if (label.firstChild) label.removeChild(label.firstChild);
        
        label.appendChild(displayNumber);

        _.each(this.state.name_price, find => {

            const alias = removeSpace(find.name);

            if (alias === CurrentMenuName) {
                
                find.number = buttonValues;

            }

        });

        if(this.state.name_price.length > 0) {

            let count;

            this.state.name_price.forEach(order => {
                
                count =+ order.number;

            });

            if(count > 0) {

                document.querySelector('#order').style.display = 'block';

             }

        } else {

            document.querySelector('#order').style.display = 'none';

        }
        
    }

    allMenuContents = () => {

        const path = './images/';

        let firstRow = [];
        let secondRow = [];
        let thirdRow = [];
        let forthRow = [];

        _.map(this.props.menu, menuType => {
            
            firstRow.push(menuType[0]);
            secondRow.push(menuType[1]);
            thirdRow.push(menuType[2]);
            forthRow.push(menuType[3]);

        });

        const menuPrices = (item) => {

            const class_name_1 = `${removeSpace(item.name)}BgColor border 
                border-danger 
                justify-content-center 
                col
                ml-2
                mr-2`;

            const class_name_2 = `${removeSpace(item.name)} ml-1`;

            const class_name_3 = `${removeSpace(item.name)}Button`;

            const class_name_4 = `${removeSpace(item.name)} mx-50 my-50`;

            const style = {

                width: '200px',
                height: '150px'
            }

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
                    
                    <div>
                        
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
                               
                       <label className="d-block clearfix mt-2">
                         
                            <span className="float-left text-muted d-block" 
                                style={{fontSize: '13px'}}>
                                <b>{ item.name }</b> 
                                (${ item.price }):</span>

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
                            
                            <div><h3>{this.state.order}</h3></div>
                                       
                        </label>

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
                            <Link to = { `/description/${item.name}`} key = { item.id }>

                                <div className="mt-3 mr-3 btn btn-sm btn-info ml-3">

                                        <span>
                                            Check Detail
                                        </span>                                   
                                    
                                </div>
                                    
                                <img
                                    style={ style } 
                                    className="img img-fluid img-thumbnail mt-3" 
                                    src = { path + item.file }
                                    alt = { item.name } 
                                />
                            </Link>
                        </div>

                        <div className="mt-3">

                            <p className="text-justify text-center">{ item.description }</p> 
                        
                        </div>
                
                    </div>

                </div>
                    
            );
    
        }

        return (

            <div>
                <div className="row text-center mb-2">

                    { firstRow.map(menuPrices) }
            
                </div>

                <div className="row text-center mb-2">
            
                    { secondRow.map(menuPrices) }
                
                </div>

                <div className="row text-center mb-2">
            
                    { thirdRow.map(menuPrices) }
            
                </div>

                <div className="row text-center mb-2">
            
                    { forthRow.map(menuPrices) }
            
                </div>
            </div>

        );
    
    }

    handleOpenModal = () => {

       this.setState ({ 

            showModal : true,
            newPage : false,
            name_price: this.state.name_price.filter(menu => (menu.number !== 0))

        }); 

        this.state.name_price.forEach(orders => {
            
            if (orders.number === 0) {

                document.querySelector(`input[name="${removeSpace(orders.name)}"]`).checked = false;

                document.querySelector(`div.${removeSpace(orders.name)}BgColor`).style.backgroundColor = '';

                document.querySelector(`div.${removeSpace(orders.name)}Button`).style.display = 'none';

                document.querySelector(`i#${orders.name}`).style.visibility= 'visible';

                document.querySelector(`input.${orders.name}`).disabled= false;

            }

        });

        document.querySelector('#order').style.display = 'none';
       
    }

    handleCloseModal = () => {

        this.setState ({ 
            
            showModal : false
        
        });

        document.querySelector('#order').style.display = 'block';

    }

    render () {

        if(!this.props) return <div/>; 
        if(!this.props.recomMenu)  return<div/>;
        
        console.log('this.props.recoMenu: ', this.props.recomMenu);

        if(this.state.newPage) 
            return <Redirect to = 'thankyouAndGuestbook' menuChecked = { this.state.name_price } />;

        return (

            <div className="container mt-5 mb-5">

                <h4 className="text-center">
                    Menu & Order
                </h4>
                
                <div className="mt-5">
                    
                    <form onSubmit = { this.submitValue }> 

                        <div>
                        
                            { this.allMenuContents() }

                        </div>

                        <div className = "btn btn-danger mt-3 mx-auto fixed-bottom w-50" 
                            onClick = { this.handleOpenModal }
                            style = {{ display: 'none'}}
                            id = 'order'
                        >
                    
                            Place an Order
                    
                        </div>
                
                    </form> 
                    
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

function mapStateToProps ({ menu }) {

    return { menu };

}

export default connect (mapStateToProps)(MenuList);
