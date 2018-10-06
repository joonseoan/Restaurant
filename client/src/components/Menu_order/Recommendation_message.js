import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { removeSpace, initUI } from '../../utils/uIControl';

class RecommendationMessage extends Component {

    shouldComponentUpdate(nextProps) {

        if(this.props.recommendedMenus === nextProps.recommendedMenus) return false
        
        return true;

    }

    render() {

        const { recommendedMenus, menuNames } = this.props;

        let visibility = 'hidden';

        _.each( recommendedMenus, menu => {

            if(menu.name === menuNames) {

                visibility = 'visible';
            }    

        });

        return(
            
            <div>
                <p className='blink text-danger font-italic font-weight-bold d-inline'
                    id = {removeSpace(menuNames)} style={{ visibility : `${ visibility }` }} > 

                    Special for you!

                </p> 
            </div>
            
        );

    }

}

function mapStateToProps ({ recommendedMenus }) {

    return({ recommendedMenus });

}

export default connect(mapStateToProps)(RecommendationMessage);