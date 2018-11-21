import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { handleToken, handleTotalAmount } from "../../actions";

class CreditCard extends Component {
  handleOnClick = () => {
    this.props.handleTotalAmount(this.props.totalPayment);
    this.props.storeMenuOrders();
  };

  render() {
    return (
      <StripeCheckout
        name="KOREAN RESTAURANT"
        description="TEST CARD#: 4242 4242 4242 4242"
        amount={this.props.totalPayment * 100}
        token={token => {
          this.props.handleToken(token);
        }}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <Link
          className="btn btn-sm btn-warning font-weight-bold text-secondary"
          onClick={this.handleOnClick}
          to={{ pathname: "background", state: "credit" }}
        >
          CREDIT CARD
          <i className="ml-2 fa fa-cc-visa" />
        </Link>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  { handleToken, handleTotalAmount }
)(CreditCard);
