import React, { Component } from "react";
import _ from "lodash";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";

import ModalGuestbookDisplay from "./Modal_guestbook_display";
import ModalEmailPasswordInput from "./Modal_email_password_input";
import { sortGuestbooks } from "../../../utils/uIControl";

class ModalGuestbookAllPosted extends Component {
  state = {
    showEmailPasswordInput: false
  };

  handleFindPost = () => {
    this.props.deleteModal();
    this.setState({ showEmailPasswordInput: true });
  };

  handleCloseModal = () => {
    this.props.deleteModal();
  };

  render() {
    if (!this.props.guestbooks) return <div />;

    const guestbooks = _.filter(
      this.props.guestbooks,
      guestbook => guestbook.like
    );

    // const guestbookStored = guestbooks.sort(
    //   (date1, date2) => date2.visitedAt - date1.visitedAt
    // );

    return (
      <div>
        <Modal
          show={this.props.showModal}
          bsSize="lg"
          aria-labelledby="contained-modal-title-lg"
        >
          <div
            className="jumbotron text-center"
            style={{ fontFamily: "ubuntu" }}
          >
            <Modal.Header>
              <div>
                <h1 className="heading heading-correct-pronounciation">
                  <em>Customer's Best Choices</em>
                </h1>
                Please, click a title to view customer's recommendation.
              </div>
            </Modal.Header>

            <div>
              <ModalGuestbookDisplay guestbooks={sortGuestbooks(guestbooks)} />
            </div>

            <Modal.Footer>
              <div className="mx-auto">
                <button
                  className="btn btn-sm btn-outline-primary border-primary rounded mr-5"
                  onClick={this.handleCloseModal}
                >
                  BACK TO MAIN MENU
                  <i className="fa fa-arrow-left ml-2" />
                </button>
                <button
                  className="btn btn-sm btn-outline-danger border-danger rounded"
                  onClick={this.handleFindPost}
                >
                  FIND YOUR POST
                  <i className="fa fa-list-ol ml-2 mt-1" />
                </button>
              </div>
            </Modal.Footer>
          </div>
        </Modal>
        <ModalEmailPasswordInput
          showModal={this.state.showEmailPasswordInput}
          closeModal={() => {
            this.setState({ showEmailPasswordInput: false });
          }}
          displayModal={this.props.displayModal}
          // showCustomerReview={() => {
          //   this.setState({ showModal: true });
          // }}
        />
      </div>
    );
  }
}

function mapStateToProps({ guestbooks }) {
  return { guestbooks };
}

export default connect(mapStateToProps)(ModalGuestbookAllPosted);
