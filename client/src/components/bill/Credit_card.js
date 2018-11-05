import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
// import stripe_key from "./key";

import { handleToken } from "../../actions";

class CreditCard extends Component {
  render() {
    return (
      <StripeCheckout
        name="KOREAN RESTAURANT"
        description="PAY FOR YOUR FOODS"
        amount={this.props.totalPayment * 100}
        // Give token data to the server
        // It is a variable to get 'token' object from stripe api server

        // Invocation of this.props.handleToken(token) occurrs at Stripe Server
        // Then, the server run this function
        //	and then it executes action creator!!!
        //	The, action creator gets payload.data and delivers them to redux.

        token={token => this.props.handleToken(token)}
        // stripeKey={process.env.REACT_APP_STRIPE_KEY}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        {/* <button className = 'btn' message_number = { this.message() }>*/}

        <button className="btn btn-sm btn-warning font-weight-bold text-secondary">
          CREDIT CARD
          <i className="ml-2 fa fa-cc-visa" />
        </button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  { handleToken }
)(CreditCard);
