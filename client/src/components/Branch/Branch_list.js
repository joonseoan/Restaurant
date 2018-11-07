import React, { Component } from "react";
import { connect } from "react-redux";

import { setLocation, additionalTodayWeatherInfo } from "../../actions";
import SelectCity from "./SelectCity";
import { options } from "../../utils/cities";

class BranchList extends Component {
  startInterval;

  state = {
    city: "",
    _isMounted: false
  };

  setTodayWeatherInfo = city => {
    // if (this.state._isMounted) {
    this.props.setLocation(city);
    this.props.additionalTodayWeatherInfo(city);
    //}

    if (this.startInterval) clearInterval(this.startInterval);
    this.startInterval = setInterval(() => {
      this.props.additionalTodayWeatherInfo(city);
    }, 300000);
  };

  componentDidMount() {
    const city = sessionStorage.branch_city || options[0].value;

    this.setState({
      city,
      _isMounted: true
    });

    this.setTodayWeatherInfo(city);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.city !== nextState.city ? true : false;
  }

  componentWillUnmount() {
    this.setState({ _isMounted: false });
    clearInterval(this.startInterval);
    this.startInterval = false;
  }

  render() {
    //if (!this.state.city) return <div />;
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-warning">
          <div className="text-center w-100">
            <h4>Welcome to Korean Restaurant in {`${this.state.city}`}</h4>
          </div>
          <div className="mx-auto text-center w-50">
            <SelectCity
              setCity={city => {
                this.setState({ city: city });
                this.setTodayWeatherInfo(city);
              }}
              refreshStatus={this.props.refreshStatus}
            />
          </div>
        </nav>
      </div>
    );
  }
}

export default connect(
  null,
  { additionalTodayWeatherInfo, setLocation } //
)(BranchList);
