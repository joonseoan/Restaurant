import React, { Component } from "react";
import moment from "moment";

export default class DateTimeDisplay extends Component {
  startInterval;

  _isMounted = true;

  state = {
    date: new Date()
  };

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.startInterval = setInterval(() => {
        const dateTime = new Date();
        const vancouverTime = dateTime.getTime() - 10800000;

        this.props.city !== "Vancouver"
          ? this.setState({ date: dateTime })
          : this.setState({ date: new Date(vancouverTime) });
      }, 1000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.city !== this.props.city) {
      clearInterval(this.startInterval);

      if (this._isMounted) {
        this.startInverval = setInterval(() => {
          const dateTime = new Date();
          const vancouverTime = dateTime.getTime() - 10800000;

          this.props.city !== "Vancouver"
            ? this.setState({ date: dateTime })
            : this.setState({ date: new Date(vancouverTime) });
        }, 1000);
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.startInterval);
    this.startInterval = false;
  }

  render() {
    const currentTime = moment(this.state.date.getTime());

    return (
      <div
        className="text-right my-3 font-weight-bold"
        style={{ fontFamily: "Ubuntu" }}
      >
        {currentTime.format("hh:mm:ss a in MMM Do YYYY")}
      </div>
    );
  }
}
