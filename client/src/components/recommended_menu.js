import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import WOW from 'wow.js';

import MenuList from '../containers/menu_list';

function soup (temp, value, soup) {

    if (temp > 18) {

       value = value + 0;

    } else if (temp > 17 && temp <= 18) {

        value = value + 1;

    } else if (temp > 16 && temp <= 17) {

        value = value + 2;

    } else if (temp > 15 && temp <= 16) {

        value = value + 3;

    } else {

        value = value + 4;

    }

    if (value <= 9 && value > 7) {

        return soup[3];
    
    } else if (value <= 7 && value > 5) {

        return soup[0];
    
    } else if (value <= 5 && value > 3) {

        return soup[2];

    } else {

        return soup[1];

    }

}

function main(temp, value, main) {

    if (temp > 18) {

        value = value + 0;
 
     } else if (temp > 16 && temp <= 18) {
 
         value = value + 1;
 
     } else if (temp > 14 && temp <= 16) {
 
         value = value + 2;
 
     } else if (temp > 12 && temp <= 14) {
 
         value = value + 3;
 
     } else {
 
         value = value + 4;
 
     }
     
     if (value <= 9 && value > 7) {

        return main[0];
    
    } else if (value <= 7 && value > 5) {

        return main[2];
    
    } else if (value <= 5 && value > 3) {

        return main[1];

    } else {

        return main[3];

    }

}

function side(temp, value, side) {

    if (temp > 18) {

        value = value + 0;
 
     } else if (temp > 15 && temp <= 18) {
 
         value = value + 1;
 
     } else if (temp > 12 && temp <= 15) {
 
         value = value + 2;
 
     } else if (temp > 9 && temp <= 12) {
 
         value = value + 3;
 
     } else {
 
         value = value + 4;
 
     }

    //  console.log('sideValue', value)   //  console.log('sideValue', value)
    if (value <= 9 && value > 7) {

        return side[3];
    
    } else if (value <= 7 && value > 5) {

        return side[0];
    
    } else if (value <= 5 && value > 3) {

        return side[2];

    } else {

        return side[1];

    }

}

function drink(temp, value, drink) {
 
    if (temp > 22) {

        value = value + 0;
 
     } else if (temp > 15 && temp <= 22) {
 
         value = value + 1;
 
     } else if (temp > 8 && temp <= 15) {
 
         value = value + 2;
 
     } else if (temp > -1 && temp <= 8) {
 
         value = value + 3;
 
     } else {
 
         value = value + 4;
 
     }

    if (value <= 9 && value > 7) {

        return drink[0];
    
    } else if (value <= 7 && value > 5) {

        return drink[1];

    } else {

        return drink[2];

    }

}

export default class RecommendedMenu extends Component {

    state = {

        selectedSoup : null,
        selectedMain : null,
        selectedSide : null,
        selectedDrink : null

    }

    setCurrentMenu (inputData) {

        if (inputData === undefined || !inputData) 
            inputData = this.props;

            const { menu, temp, value } = inputData;
    
            const selectedSoup = soup(temp, value, menu.soup);
            const selectedMain = main(temp, value, menu.main);
            const selectedSide = side(temp, value, menu.side);
            const selectedDrink = drink(temp, value, menu.drink);

            this.setState({

                selectedSoup,
                selectedMain,
                selectedSide,
                selectedDrink

            });

    }

    componentDidMount() {

        console.log('this.props(recommended menu): ', this.props);



        this.setCurrentMenu();

        if (typeof window !== 'undefined') { const wow = new WOW(); wow.init(); }
        
    }

    componentWillReceiveProps(nextProps) {

        this.setCurrentMenu(nextProps);

    }

    makeFileList(files) {

        const src = `../images/${ files.file }`;

        const ids = `#${files.name}`;

        return (

            <div key={ files.id } className="col ml-2 mr-2 mt-3 border border-warning rounded pb-5 wow zoomIn" data-wow-delay="2.5s"> 

                <div className ="mb-2" key = { files.id }>

                    <div className ="mb-2 bg-warning"> { files.name }</div>
                
                    <Link to = {`/description/${ files.name }`}>

                        <div className="btn btn-sm btn-info mt-3">
                    
                            Check Detail
                        
                        </div>

                        <img 
                            style = {{width:'220px', height:'150px'}}
                            className="img img-fluid img-thumbnail mt-3" 
                            alt="Responsive img" 
                            src = { src }                     
                        />

                    </Link>
                
                </div>
                
                <div className="text-info mb-1"> Price: ${ files.price } </div>

                <div>

                    <a href={ ids } 
                    className="orderStart font-weight-bold"
                    >
                        <span data-text="S">S</span>
                        <span data-text="T">T</span>
                        <span data-text="A">A</span>
                        <span data-text="R">R</span>
                        <span data-text="T" className="pr-2">T</span>
                        <span data-text="O">O</span>
                        <span data-text="R">R</span>
                        <span data-text="D">D</span>
                        <span data-text="E">E</span>
                        <span data-text="R">R</span>
                    </a>

                </div>

            </div>);

    }
    

    render () {

        if(!this.state.selectedSoup || !this.state.selectedMain 
            || !this.state.selectedSide || !this.state.selectedDrink)
        return <div>Loading...</div>;

        const selectedMenu = _.map(this.state);
      
        return (
            
            <div>
                <div>
                
                    <div className="row justify-content-center border border-success">                    
                            
                            { selectedMenu.map(this.makeFileList) } 

                    </div>  
                    
                    <Link className="btn btn-info btn-sm mt-3" to = '/guestbookAllPosted'>

                       REVIEW CUSTOMER's BEST CHOICE
        
                    </Link>
                
                </div>

                <MenuList recomMenu = { selectedMenu } />

            </div>

                
        );

    }

}