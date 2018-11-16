import React, { Component } from "react";
import _ from "lodash";
import { Modal } from "react-bootstrap";

import Display from "./guestbook_display";
import EmailPasswordInput from "./email_password_input";

class ModalGuestbookAllPosted extends Component {
  state = {
    showModal: false,
    showEmailPasswordInput: false
  };

  handleFindPost = () => {
    this.setState({
      showModal: false
    });
    this.setState({ showEmailPasswordInput: true });
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    if (!this.props.guestbooks) return <div />;

    const guestbooks = _.filter(
      this.props.guestbooks,
      guestbook => guestbook.like
    );

    const guestbookStored = guestbooks.sort((date1, date2) => {
      date2.visitedAt - date1.visitedAt;
    });

    return (
      <div>
        <button
          className="btn btn-info btn-sm mt-5 font-weight-bold"
          onClick={this.handleOpenModal}
        >
          REVIEW CUSTOMER'S BEST CHOICE
          <i className="fa fa-clipboard ml-3 align-middle" />
        </button>

        <Modal
          className="text-center"
          show={this.state.showModal}
          {...this.props}
          bsSize="large"
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
            <Modal.Body>
              <Display guestbooks={guestbookStored.reverse()} />
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-sm btn-outline-primary border-primary rounded mr-5"
                onClick={this.handleCloseModal}
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
                <i className="fa fa-eraser ml-2" />
              </button>
            </Modal.Footer>
          </div>
        </Modal>
        <EmailPasswordInput
          showModal={this.state.showEmailPasswordInput}
          closeModal={() => {
            this.setState({ showEmailPasswordInput: false });
          }}
        />
      </div>
    );
  }
}

export default ModalGuestbookAllPosted;
