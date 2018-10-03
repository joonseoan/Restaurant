import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Redirect } from 'react-router-dom';

import RecommendationDescriptions from '../Current_recommendations/Recommendation_descriptions';
import { removeSpace } from '../../utils/uIControl';
import Main from './Main';


class MenuList extends Component {
    
    // menuOnChange = (event) => {


    // }
    
    // numberOnChange = (event) => {

    //     const CurrentMenuName = event.target.id;
        
    //     let buttonValues = event.target.innerHTML;

    //     const label = document.querySelector(`label.${CurrentMenuName}`);

    //     let labelValues = Number(label.innerHTML);
        
    //     const spans = document.querySelectorAll(`span#${CurrentMenuName}`);
        
    //     const buttons = [ 1, 2, 3, 4 ];

    //     if (buttonValues !== '+') {

    //         buttonValues = Number(buttonValues);

    //         const disPlayButtons = buttons.filter( buttonNumber => buttonNumber !== buttonValues);
                
    //         _.each(disPlayButtons, button => {

    //             spans[button].style.visibility = 'visible';
              
    //         });

    //         spans[buttonValues].style.visibility = 'hidden';

    //         if(buttonValues === 0) {

    //             this.state.name_price.forEach(menu => {

    //                 if (menu.name === CurrentMenuName) {
    
    //                     const index = this.state.name_price.indexOf(menu);
    
    //                     this.state.name_price.splice(index, 1);
    
    //                 }
    
    //             });
    
    //             document.querySelector(`input[name="${removeSpace(CurrentMenuName)}"]`).checked = false;

    //             document.querySelector(`div.${removeSpace(CurrentMenuName)}BgColor`).style.backgroundColor = '';

    //             document.querySelector(`div.${removeSpace(CurrentMenuName)}Button`).style.display = 'none';

    //             document.querySelector(`i#${CurrentMenuName}`).style.visibility= 'visible';

    //             document.querySelector(`input.${CurrentMenuName}`).disabled= false;
    //         }

    //     } else {

    //         labelValues++;
            
    //         buttonValues = labelValues;
            
    //         if(buttonValues > 4) {

    //             _.each(buttons, button => {

    //                 spans[button].style.visibility = 'visible';
    
    //             });

    //         }

    //     }

    //     spans[0].style.visibility ='visible';
        
    //     const displayNumber = document.createTextNode(buttonValues);

    //     if (label.firstChild) label.removeChild(label.firstChild);
        
    //     label.appendChild(displayNumber);

    //     _.each(this.state.name_price, find => {

    //         const alias = removeSpace(find.name);

    //         if (alias === CurrentMenuName) {
                
    //             find.number = buttonValues;

    //         }

    //     });

    //     if(this.state.name_price.length > 0) {

    //         let count;

    //         this.state.name_price.forEach(order => {
                
    //             count =+ order.number;

    //         });

    //         if(count > 0) {

    //             document.querySelector('#order').style.display = 'block';

    //          }

    //     } else {

    //         document.querySelector('#order').style.display = 'none';

    //     }
        
    // }

    // handleDescription = e => {
     
    //     this.setState({ toDescription: e.target.value });

    //     e.preventDefault();

    // }

    state = {

        bgColor: ""

    }

    shouldComponentUpdate(nextProps) {
        
        if(this.props.totalMenu === nextProps.totalMenu) return false;
        
        return true;

    }

    menuBoard = (menu) => {
 
       return _.map(menu, menuItems => {

            const { id, name } = menuItems;

            const className = `col ${removeSpace(name)}BgColor border 
               border-danger justify-content-center ml-2 mr-2 round`;

            return(

                <div key = { id } id = { name } className={ className }
                    style = {{ backgroundColor: `${ this.state.bgColor }`}}>
                                                    
                    <Main 
                        
                        menuItems = { menuItems } 
                        checkedColor = { (color) => { this.setState({ bgColor: color}); }}    
                    />


                </div>

            );

        })

    }

    render () {

        if(!this.props) return<div/>;

        const { firstRow, secondRow, thirdRow, forthRow } = this.props;
        
        return (

                <div className="row justify-content-center mb-2 mt-3 border border-success">

                    { this.menuBoard(firstRow) }
                    
                    <div className="w-100" style={{border: "1px solid #333"}}></div>  
                    
                    { this.menuBoard(secondRow) }
                    
                    <div className="w-100" style={{border: "1px solid #333"}}></div> 

                    { this.menuBoard(thirdRow) }
                    
                    <div className="w-100" style={{border: "1px solid #333"}}></div> 

                    { this.menuBoard(forthRow) }

                </div>       
        
        );

    }

} 

function mapStateToProps ({ menu }) {
    
    let firstRow = [];
    let secondRow = [];
    let thirdRow = [];
    let forthRow = [];
    
    _.each(menu, menuType => {

        firstRow = [ ...firstRow, menuType[0] ];
        secondRow = [ ...secondRow, menuType[1] ];
        thirdRow = [ ...thirdRow, menuType[2] ];
        forthRow = [ ...forthRow, menuType[3] ];
        
    });

    return { 

        firstRow,
        secondRow,
        thirdRow,
        forthRow
     
    };

}

export default connect(mapStateToProps)(MenuList);