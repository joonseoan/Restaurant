import React, { Component } from "react";
import { connect } from "react-redux";

import { setLocation, additionalTodayWeatherInfo } from "../../actions";
import SelectCity from "./SelectCity";
import { options } from "../../utils/cities";

class BranchList extends Component {
  startInterval;

  _isMounted = false;

  state = {
    city: ""
  };

  // setTodayWeatherInfo = city => {
  //   //    if (this.state._isMounted === true) {
  //   this.props.setLocation(city);
  //   this.props.additionalTodayWeatherInfo(city);

  //   if (this.startInterval) clearInterval(this.startInterval);
  //   this.startInterval = setInterval(() => {
  //     this.props.additionalTodayWeatherInfo(city);
  //   }, 300000);
  //   //  }
  // };

  componentDidMount() {
    const city = sessionStorage.branch_city || options[0].value;

    this._isMounted = true;
    this.setState({
      city
    });

    // this.setTodayWeatherInfo(city);
  }

  componentDidUpdate(prevProps, prevState) {
    const { city } = this.state;

    if (prevState.city !== city && this._isMounted) {
      this.props.setLocation(city);
      this.props.additionalTodayWeatherInfo(city);

      if (this.startInterval) clearInterval(this.startInterval);
      this.startInterval = setInterval(() => {
        this.props.additionalTodayWeatherInfo(city);
      }, 300000);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.city !== nextState.city ? true : false;
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.startInterval);
    this.startInterval = false;
  }

  render() {
    //if (!this.state.city) return <div />;
    return (
      <div>
        <nav className="navbar navbar-expand-sm justify-content-center neon-background">
          <div className="wow swing">
            <h2 className="headline blink">
              Welcome to Korean Restaurant in {`${this.state.city}`}
            </h2>
          </div>
          <div>
            <SelectCity
              setCity={city => {
                this.setState({ city: city });
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
