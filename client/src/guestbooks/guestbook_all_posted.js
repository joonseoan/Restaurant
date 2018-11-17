import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { fetchGuesbookLists } from "../actions/index";
import Display from "./guestbook_display";

class GuestbookAllPosted extends Component {
  state = { showLogin: false };
  componentDidMount() {
    this.props.fetchGuesbookLists();
  }

  handleFindPost = () => {
    console.log(this.props, "this.props");
    const {
      push,
      location: { state }
    } = this.props.history;

    push("/emailPasswordInput", true);
    // this.setState({ showLogin: true });
  };

  render() {
    if (!this.props.guestbooks) return <div />;

    const guestbooks = _.filter(
      this.props.guestbooks,
      guestbook => guestbook.like
    );

    return (
      /*
        <Modal className="text-center" show={props.thankyou}>
        <Modal.Body>
          <h3 className="text-info">Thank you for joining our survey</h3>
          <p className="blink font-weight-bold font-italic">
            We will do our best to improve the food and service quality.
          </p>
          <div>
            <div className="mt-3">
              <Link className="btn btn-success ml-5" to="/">
                BACK TO MAIN MENU
              </Link>
              <Link className="btn btn-primary ml-5" to="/guestbookAllPosted">
                FIND GUESTBOOK LIST
              </Link>
            </div>
          </div>
        </Modal.Body>
      */

      <div
        className="container jumbotron text-center"
        style={{ fontFamily: "ubuntu" }}
      >
        <hr className="border border-secondary" />
        <div>
          <h1 className="heading heading-correct-pronounciation">
            <em>Customer's Best Choices</em>
          </h1>
          Please, click a title to view customer's recommendation.
        </div>
        <hr className="border border-secondary" />

        <Display guestbooks={guestbooks} />

        <button
          className="btn btn-sm btn-outline-primary border-primary rounded mr-5"
          onClick={e => {
            this.props.history.goBack(); // push("/to");
          }}
        >
          BACK TO MAIN MENU
          <i className="fa fa-arrow-left ml-2" />
        </button>

        <button
          className="btn btn-sm btn-outline-danger border-danger rounded"
          // to="/emailPasswordInput"
          onClick={this.handleFindPost}
        >
          FIND YOUR POST
          <i className="fa fa-hand-point-right" />
        </button>
      </div>
    );
  }
}

function mapStateToProps({ guestbooks }) {
  return { guestbooks };
}

export default connect(
  mapStateToProps,
  { fetchGuesbookLists }
)(GuestbookAllPosted);
