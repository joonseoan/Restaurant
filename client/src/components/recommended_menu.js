import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import WOW from 'wow.js';

import MenuList from '../containers/menu_list';
import { soup, main, side, drink } from '../utils/recommendation_engine';

import RecommendDescription from './current_recommendations/Recommendation_descriptions';

export default class RecommendedMenu extends Component {

    state = {

        selectedSoup : null,
        selectedMain : null,
        selectedSide : null,
        selectedDrink : null,
        toDescription: null

    }

    setCurrentMenu (inputData) {

        if (!inputData) 
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

        this.setCurrentMenu();

       //  if (typeof window !== 'undefined') { const wow = new WOW(); wow.init(); }
        
    }

    componentWillReceiveProps(nextProps) {

        this.setCurrentMenu(nextProps);

    }

    handleDescription = e => {

        console.log(e.target.value)
     
        this.setState({ toDescription: e.target.value });

    }

    // makeFileList(files) {

    //     const src = `../images/${ files.file }`;

    //     const ids = `#${files.name}`;

    //     return (

    //         <div key={ files.id } className="col ml-2 mr-2 mt-3 border border-warning rounded pb-5 wow zoomIn" data-wow-delay="2.5s"> 

    //         <div className ="mb-2" key = { files.id }>
            
    //         <div className ="mb-2 bg-warning"> { files.name }</div>
            
    //         {/* 
            
    //             <button className="btn btn-primary" data-toggle="modal" data-target="#mymodal">Launch Modal</button>
    //         */}
            
            
            
    //         <button className="btn btn-sm btn-info mt-3" 
    //             data-toggle="modal" 
    //             data-target="#mymodal"
            
    //             value = { files.name }
                
    //             //value = { files.name }    
    //             >
            
    //              Check Detail
            
    //         </button>
            
            


    //         <div className="modal" id="mymodal">
    //         <div className="modal-dialog">
    //         <div className="modal-content">
    //             <div className="modal-header">
    //             <h5 className="modal-title">Modal Title</h5>
    //             <button className="close btn btn-danger" data-dismiss="modal">&times;</button>
    //             </div>
    //             <div className="modal-body">
                
    //           {/* 
    //             <RecommendDescription foodName = {files.name }/>
    //          */} 
                
                
    //             </div>
    //             <div className="modal-footer">
    //             <button className="btn btn-secondary" data-dismiss="modal">Close</button>
    //             </div>
    //             </div>
    //             </div>
    //             </div>
                
    //             {/* 
    //         */}









                    
    //             {/* 
    //                 <Link className="btn btn-sm btn-info mt-3" to = {`/description/${ files.name }`}>
    
    //                     Food
                    
    //                 </Link>
                        
    //             */}    
                    




    //                 <img 
    //                     style = {{width:'220px', height:'150px'}}
    //                     className="img img-fluid img-thumbnail mt-3" 
    //                     alt="Responsive img" 
    //                     src = { src }                     
    //                 />

                 
                
    //             </div>
                
    //             <div className="text-info mb-1"> Price: ${ files.price } </div>

    //             <div id="nav-main">

    //                 <a href={ ids } 
    //                 className="orderStart font-weight-bold"
    //                 >
    //                     <span data-text="S">S</span>
    //                     <span data-text="T">T</span>
    //                     <span data-text="A">A</span>
    //                     <span data-text="R">R</span>
    //                     <span data-text="T" className="pr-2">T</span>
    //                     <span data-text="O">O</span>
    //                     <span data-text="R">R</span>
    //                     <span data-text="D">D</span>
    //                     <span data-text="E">E</span>
    //                     <span data-text="R">R</span>
    //                 </a>

    //             </div>

    //         </div>);

    // }

    recommendationDisplay = selectedMenu => {

        return selectedMenu.map(files => {

            const src = `../images/${ files.file }`;

            const ids = `#${files.name}`;

            return (

                <div key={ files.id } className="col ml-2 mr-2 mt-3 border border-warning rounded pb-5 wow zoomIn" data-wow-delay="2.5s"> 
    
                <div className ="mb-2" key = { files.id }>
                
                <div className ="mb-2 bg-warning"> { files.name } </div>
                
                {/* 
                
                    <button className="btn btn-primary" data-toggle="modal" data-target="#mymodal">Launch Modal</button>
                */}
                
                
                
                <button className="btn btn-sm btn-info mt-3" 
                    data-toggle="modal" 
                    data-target="#mymodal"
                    onClick={ this.handleDescription }
                    value = { files.name }
                >
                
                     Check Detail
                
                </button>
                
                
    
    
                <div className="modal" id="mymodal">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title">Modal Title</h5>
                    <button className="close btn btn-danger" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                    
                   
                    <RecommendDescription 
                        foodName = { this.state.toDescription }
                        menu = { this.props.menu }
                    />
                  
                    
                    
                    </div>
                    <div className="modal-footer">
                    <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                    </div>
                    </div>
                    
                    {/* 
                */}
    
    
    
    
    
    
    
    
    
                        
                    {/* 
                        <Link className="btn btn-sm btn-info mt-3" to = {`/description/${ files.name }`}>
        
                            Food
                        
                        </Link>
                            
                    */}    
                        
    
    
    
    
                        <img 
                            style = {{width:'220px', height:'150px'}}
                            className="img img-fluid img-thumbnail mt-3" 
                            alt="Responsive img" 
                            src = { src }                     
                        />
    
                     
                    
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
    

        });
        
    }
    
    render () {

        const { selectedSoup, selectedMain, selectedSide, selectedDrink } = this.state;

        if(!selectedSoup || !selectedMain 
            || !selectedSide || !selectedDrink)
        return <div/>;

        const selectedMenu = _.concat(selectedSoup, selectedMain, selectedSide, selectedDrink);
        
        return (
            
            <div>
                <div>
                
                    <div className="row justify-content-center border border-success">                    
                            
                          { /* selectedMenu.map(this.makeFileList) */ } 

                            { this.recommendationDisplay(selectedMenu) }

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