import React, { Component } from "react";

import RecommendedMenu from "./Recommended_menu";
import { regexFilter, setWeather } from "../../utils/mainWeather";

export default class SetCurrentRecommendation extends Component {
  state = {
    indexValue: null
  };

  componentDidMount() {
    if (!this.props.mainWeather) return;

    const getWeather = regexFilter(this.props.mainWeather);

    this.setState({ indexValue: setWeather(getWeather) });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { temperature, mainWeather } = this.props;

  //   if (
  //     nextProps.temperature === temperature &&
  //     nextProps.mainWeather === mainWeather &&
  //     (this.state.indexValue === nextState.indexValue || !this.state.indexValue)
  //   ) {
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    if (!this.props) return <div />;

    const { inputMenus, temperature } = this.props;

    return (
      <RecommendedMenu
        menu={inputMenus}
        temp={temperature}
        value={this.state.indexValue}
        menuOrdered={this.props.menuOrdered}
      />
    );
  }
}
