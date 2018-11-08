import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";

import { handleToken, handleTotalAmount } from "../../actions";

class CreditCard extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.finishCreditPay &&
      prevProps.finishCreditPay !== this.props.finishCreditPay &&
      this.props.finishCreditPay.data === "success"
    ) {
      this.props.thankYouControl();
    }
  }

  handleOnClick = e => {
    alert(
      "In a while of the test mode, the credit card number is '4242 4242 4242 4242'."
    );
    this.props.handleTotalAmount(this.props.totalPayment);
    this.props.storeMenuOrders();
  };

  render() {
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
          disabled={this.props.disable}
        >
          CREDIT CARD
          <i className="ml-2 fa fa-cc-visa" />
        </button>
      </StripeCheckout>
    );
  }
}

function mapStateToProps({ finishCreditPay }) {
  return { finishCreditPay };
}

export default connect(
  mapStateToProps,
  { handleToken, handleTotalAmount }
)(CreditCard);
