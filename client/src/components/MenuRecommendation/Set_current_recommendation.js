import React, { Component } from 'react';

import RecommendedMenu from './Recommended_menu';
import { regexFilter, setWeather } from '../../utils/mainWeather';

export default class SetCurrentRecommendation extends Component {

    state = {

        indexValue: null
    
    }

    componentDidMount() {

        if(!this.props.mainWeather) return;

        const getWeather = regexFilter(this.props.mainWeather);

        const index = setWeather(getWeather);

        this.setState({ indexValue: index });

    }

    shouldComponentUpdate(nextProps, nextState) {

        const { temperature } = this.props;
        
        if(nextProps.temperature === temperature && 
            this.state.indexValue === nextState.indexValue) {

            return false;

        } 
        
        return true;

    }
    
    render() {

        if(!this.props) return <div/>;

        const { inputMenus, temperature } = this.props;
    
        return(
                
            <RecommendedMenu 
                menu = { inputMenus } 
                temp = { temperature }
                value = { this.state.indexValue }
            />
                            
        );

    }

}