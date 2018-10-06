import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import DisplayDetailButtons from './Display_detail_buttons';
import DisplayOthers from './Display_others';
import { setCurrentMenu } from '../../utils/setRecommendation';
import { fetchRecommendedMenus } from '../../actions';

class RecommendedMenu extends Component {

    state = {

        selectedMenu: null,
        toDescription: null

    }

    componentDidMount() {

        if(!this.props) return;

        this.setState({

            selectedMenu: setCurrentMenu(this.props)

        });
        
    }

    componentWillReceiveProps(nextProps) {

        this.setState({

            selectedMenu: setCurrentMenu(nextProps)

        });

        this.props.fetchRecommendedMenus(setCurrentMenu(nextProps));
        // console.log(setCurrentMenu(nextProps));

    }
    
    render () {

        return (
            
            <div>
                    
                <div className="row justify-content-center mt-3 wow zoomIn border border-danger" 
                    data-wow-delay="2.5s">

                    { _.map(this.state.selectedMenu, menu => {

                        const { name, id, price, file } = menu;

                        return(

                            <div key = { id } className ="col border border-warning rounded mx-2 pb-5">
        
                                <div className ="mb-2 bg-warning"> { name } </div>

                                <DisplayDetailButtons 

                                    menuItems = { { name, price } }
                                    clickedMenu = {(nameSent) => {
                                    
                                        this.setState({ toDescription: nameSent });
        
                                    }}
                                    descriptionName = { this.state.toDescription }    
                                />

                                <DisplayOthers
                                    
                                    menuItems = { {name, file, price } }
                                    
                                />
                            
                            </div>
                                
                        );
                            
                    }) }

                </div>

            </div>
 
        );

    }

}

export default connect(null, { fetchRecommendedMenus })(RecommendedMenu);