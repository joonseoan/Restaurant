    import React, { Component } from 'react';

    import BranchList from '../containers/branch_list';
    import RecommendationMenu from '../containers/recommendation_menu';
    import MenuList from '../containers/menu_list';
    import { scrollspy } from '../utils/scrollspy';

    class App extends Component {

        componentDidMount = () => {

            sessionStorage.clear();

        }

        render () {

            return (
            
            <div>
            {/* 
                { scrollspy() }
            */}
                
                <div className="mt-5">  
                    <BranchList />
                </div>

                <div className="mb-5">
                    <RecommendationMenu />
                </div>
                <div className="mt-5">
                    <MenuList className="mt-5" />
                </div>

            </div>
            
            );

        }

    }

export default App;