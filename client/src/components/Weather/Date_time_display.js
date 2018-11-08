import React, { Component } from "react";

export default class DateTimeDisplay extends Component {
  startInverval;

  _isMounted = false;

  state = {
    date: new Date()
  };

  componentDidMount() {
    this._isMounted = true;

    this.startInverval = setInterval(() => {
      const dateTime = new Date();
      this.setState({ date: new Date(dateTime) });
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    clearInterval(this.startInverval);

    const { city } = nextProps;
    if (this._isMounted) {
      this.startInverval = setInterval(() => {
        const dateTime = new Date();
        const vancouverTime = dateTime.getTime() - 10800000;

        city !== "Vancouver"
          ? this.setState({ date: dateTime })
          : this.setState({ date: new Date(vancouverTime) });
      }, 1000);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.startInterval);
    this.startInterval = false;
  }

  render() {
    const hours =
      this.state.date.getHours() > 12
        ? this.state.date.getHours() - 12
        : this.state.date.getHours();
    const minutes =
      this.state.date.getMinutes() < 10
        ? `0${this.state.date.getMinutes()}`
        : this.state.date.getMinutes();
    const seconds =
      this.state.date.getSeconds() < 10
        ? `0${this.state.date.getSeconds()}`
        : this.state.date.getSeconds();

    return (
      <div
        className="text-right my-3 font-weight-bold"
        style={{ fontFamily: "Ubuntu" }}
      >
        Date : {this.state.date.toDateString()}, Time :{" "}
        {hours < 10 ? `0${hours}` : hours}: {minutes}: {seconds}
      </div>
    );
  }
}
