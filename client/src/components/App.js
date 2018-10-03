import WOW from 'wow.js';

import React, { Component } from 'react';
import BranchList from './Branch/Branch_list';
import LocationCoordinate from './Weather/Location_coordinate';
import RecommendationMenu from './MenuRecommendation/Recommendation_menu';
import MenuAndOrder from './Menu_order/Menu_and_order';

class App extends Component {

    componentDidMount = () => {

      sessionStorage.clear();

      if (typeof window !== 'undefined') { const wow = new WOW(); wow.init(); }

    }

    render () {

        return (
        
        <div>
            
            <div className="mt-5">  
                <BranchList />
            </div>

            <div>
                <LocationCoordinate className="mt-5"/>
            </div>

            <div className="mb-5">
                <RecommendationMenu />
            </div>

            <div className="mt-5">
                <MenuAndOrder className="mt-5" />
            </div>

        </div>
        
        );

    }

}

export default App;