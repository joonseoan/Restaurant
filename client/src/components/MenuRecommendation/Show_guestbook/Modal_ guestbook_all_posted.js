import React, { Component } from "react";
import _ from "lodash";
import { Modal } from "react-bootstrap";

import ModalEmailPasswordInput from "./Modal_email_password_input";
import {
  modalGuestbookAllPosted,
  commonGroup
} from "../../../utils/guestbookUtilities/guestbookAllPosted";

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

    const path = "/";

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
            <Modal.Header>{commonGroup()}</Modal.Header>
            <Modal.Body>
              {/* css should be changed */}
              {modalGuestbookAllPosted(
                guestbooks,
                this.props.postManage,
                path,
                this.props.deleteModal
              )}
            </Modal.Body>

            <Modal.Footer>
              <div className="row mx-auto text-center">
                <div className="col">
                  <button
                    className="btn btn-sm btn-outline-primary border-primary rounded"
                    onClick={this.handleCloseModal}
                  >
                    BACK TO MAIN MENU
                    <i className="fa fa-arrow-left ml-2" />
                  </button>
                </div>

                <div className="col">
                  <button
                    className="btn btn-sm btn-outline-danger border-danger rounded"
                    onClick={this.handleFindPost}
                  >
                    FIND YOUR POST
                    <i className="fa fa-list-ol ml-2 mt-1" />
                  </button>
                </div>
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
        />
      </div>
    );
  }
}

export default ModalGuestbookAllPosted;
