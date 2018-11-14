import React, { Component } from "react";

export default class DateTimeDisplay extends Component {
  startInverval;

  _isMounted = true;

  state = {
    date: new Date()
  };

  // componentDidMount() {
  //   this._isMounted = true;
  //   // if (this._isMounted) {
  //   //   this.startInverval = setInterval(() => {
  //   //     const dateTime = new Date();
  //   //     this.setState({ date: new Date(dateTime) });
  //   //   }, 1000);
  //   // }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this._isMounted) {
      const a = this.state.date;
      const b = prevState.date;
      console.log(a.getTime().valueOf());
      console.log(b.getTime().valueOf());

      if (prevState.date.getTime() !== this.state.date.getTime()) {
        if (prevProps.city !== this.props.city) {
          clearInterval(this.startInverval);
        }

        this.startInverval = setInterval(() => {
          const dateTime = new Date();
          const vancouverTime = dateTime.getTime() - 10800000;

          this.props.city !== "Vancouver"
            ? this.setState({ date: new Date(dateTime) })
            : this.setState({ date: new Date(vancouverTime) });
        }, 1000);
      }
    }

    // clearInterval(this.startInverval);

    //   const { city } = nextProps;
    // if (this._isMounted) {
    //   this.startInverval = setInterval(() => {
    //     const dateTime = new Date();
    //     const vancouverTime = dateTime.getTime() - 10800000;

    //     city !== "Vancouver"
    //       ? this.setState({ date: dateTime })
    //       : this.setState({ date: new Date(vancouverTime) });
    //   }, 1000);
    // }
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.startInterval);
    this.startInterval = false;
  }

  render() {
    // console.log(this.state.date.getTime());

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
