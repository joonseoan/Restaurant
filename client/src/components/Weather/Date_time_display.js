import React, { Component } from "react";

export default class DateTimeDisplay extends Component {
  startInverval;

  state = {
    date: new Date()
  };

  componentDidMount() {
    this.startInverval = setInterval(() => {
      const dateTime = new Date();
      this.setState({ date: new Date(dateTime) });
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    clearInterval(this.startInverval);

    const { city } = nextProps;

    this.startInverval = setInterval(() => {
      const dateTime = new Date();
      const vancouverTime = dateTime.getTime() - 10800000;

      city !== "Vancouver"
        ? this.setState({ date: dateTime })
        : this.setState({ date: new Date(vancouverTime) });
    }, 1000);
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
      <div className="blockquote text-right container">
        Date : {this.state.date.toDateString()}, Time :{" "}
        {hours < 10 ? `0${hours}` : hours}: {minutes}: {seconds}
      </div>
    );
  }
}
