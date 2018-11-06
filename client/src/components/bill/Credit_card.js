import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
// import stripe_key from "./key";
import { Redirect } from "react-router-dom";

import { handleToken, handleTotalAmount } from "../../actions";

class CreditCard extends Component {
  //state ={ isPaySuccess: ''}

  // componentDidMount(prevProps, prevState) {
  //   if (
  //     this.props.finishCreditPay &&
  //     prevProps.finishCreditPay !== this.props.finishCreditPay
  //   )
  //     console.log("finishPay", this.props.finishCreditPay);
  // }

  handleOnClick = e => {
    this.props.handleTotalAmount(this.props.totalPayment);
    this.props.storeMenuOrders();
    // if (this.props.finishCreditPay === "success") {
    //   this.props.newPageStatus();
    // }
  };
  render() {
    console.log(this.props.finishCreditPay, "newPageStatus");
    return (
      <StripeCheckout
        name="KOREAN RESTAURANT"
        description="PAY FOR YOUR FOODS"
        amount={this.props.totalPayment * 100}
        token={token => {
          this.props.handleToken(token);
        }}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button
          type="submit"
          className="btn btn-sm btn-warning font-weight-bold text-secondary"
          onClick={this.handleOnClick}
        >
          CREDIT CARD
          <i className="ml-2 fa fa-cc-visa" />
        </button>
      </StripeCheckout>
    );
  }
}

// function mapStateToProps({ finishCreditPay }) {
//   return { finishCreditPay };
// }

export default connect(
  null,
  //mapStateToProps,
  { handleToken, handleTotalAmount }
)(CreditCard);
