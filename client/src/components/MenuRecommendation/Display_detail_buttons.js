import React from 'react';

import RecommendDescriptions from '../Current_recommendations/Recommendation_descriptions';

const DisplayDetailButtons = props => {

    // if(!props.menuSource) return<div/>;

    const { name, price, id } = props.menuItems;

    const handleDescription = e => {
     
        props.clickedMenu(e.target.value);

    }

    // const src = `../images/${ source.file }`;

    // const ids = `#${source.name}`;

    return (

        <div>

            <button className="btn btn-sm btn-info mt-3" 
                data-toggle="modal" 
                data-target="#recoDescription"
                onClick={ handleDescription }
                value = { name }
            >
                                            
                Check Detail
                            
            </button>
                    
            <div className="modal" id="recoDescription">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">{ name } (${ price })</h3>
                            <button className="close btn btn-danger" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                                        
                            <RecommendDescriptions 
                                foodName = { props.descriptionName }
                            />

                        </div>
                            
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    );
        
}

export default DisplayDetailButtons;











                
//                         <img 
//                             style = {{width:'220px', height:'150px'}}
//                             className="img img-fluid img-thumbnail mt-3" 
//                             alt="Responsive img" 
//                             src = { src }                     
//                         />

//                     </div>
                    
//                     <div className="text-info mb-1"> Price: ${ files.price } </div>
    
//                     <div>
    
//                         <a href={ ids } 
//                             className="orderStart font-weight-bold"
//                         >
//                             <span data-text="S">S</span>
//                             <span data-text="T">T</span>
//                             <span data-text="A">A</span>
//                             <span data-text="R">R</span>
//                             <span data-text="T" className="pr-2">T</span>
//                             <span data-text="O">O</span>
//                             <span data-text="R">R</span>
//                             <span data-text="D">D</span>
//                             <span data-text="E">E</span>
//                             <span data-text="R">R</span>
//                         </a>