import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import {
  commonGroup,
  modalGuestbookDisplay
} from "../../../utils/guestbookUtilities/guestbook_list";

class ModalGuestbookList extends Component {
  handleLogout = () => {
    sessionStorage.id = "";
    window.location.reload();
  };

  render() {
    return (
      <div>
        <Modal
          className="text-center"
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
              {modalGuestbookDisplay(
                this.props.userGuestbooks,
                this.props.deleteModal,
                this.props.postManage
              )}
            </Modal.Body>
            <Modal.Footer>
              <div className="mx-auto">
                <button
                  className="btn btn-sm btn-outline-primary border-primary rounded mr-5"
                  onClick={() => {
                    this.props.deleteModal();
                  }}
                >
                  MAIN MENU
                  <i className="fa fa-arrow-left ml-2" />
                </button>
                <button
                  className="btn btn-sm btn-outline-danger border-danger rounded"
                  onClick={this.handleLogout}
                >
                  LOGOUT
                  <i className="fa fa-sign-out-alt" />
                </button>
              </div>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalGuestbookList;
