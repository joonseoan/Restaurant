import React from 'react';

import RecommendDescriptions from '../Current_recommendations/Recommendation_descriptions';

const DisplayDetailButtons = props => {

    const { name, price } = props.menuItems;

    const handleDescription = e => {
     
        props.clickedMenu(e.target.value);

    }

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