import React, { Component } from "react";
import { connect } from "react-redux";
import ThankYou from "./Thank_you";

class Background extends Component {
  _isMounted = false;

  // state = {
  //   showThankYou: false
  // };

  componentWillMount() {
    this._isMounted = true;
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.props.finishCreditPay &&
  //     prevProps.finishCreditPay !== this.props.finishCreditPay &&
  //     this.props.finishCreditPay.data === "success"
  //   ) {
  //     this.setState({ showThankYou: true });
  //   }
  // }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    //   const showThankYou =
    //     this.props.location.state === "credit" ? this.state.showThankYou : true;
    // console.log(this.props);
    const { showThankYou, how } = this.props.thankYou;
    console.log("how: ", how);

    return (
      <div className="container">
        <ThankYou
          thankYou={this._isMounted ? this.props.thankYou : false}
          // fromWhere={this.props.location.state}
        />
      </div>
    );
  }
}

function mapStateToProps({ finishCreditPay }) {
  return { finishCreditPay };
}

export default connect(mapStateToProps)(Background);
