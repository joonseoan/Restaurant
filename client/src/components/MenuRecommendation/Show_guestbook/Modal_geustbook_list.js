import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";

import ModalGuestbookDisplay from "./Modal_guestbook_display";
import { sortGuestbooks } from "../../../utils/uIControl";

class ModalGuestbookList extends Component {
  handleLogout = () => {
    sessionStorage.id = "";
    window.location.reload();
  };

  render() {
    //if (!this.props.userGuestbooks.length === 0) return <div />;

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
            <Modal.Header>
              <div>
                <h1 className="heading heading-correct-pronounciation">
                  <em>Your Posts</em>
                </h1>
                Please, click a title to view customer's recommendation.
              </div>
            </Modal.Header>
            <div>
              {this.props.userGuestbooks.length === 0 ? (
                <h3>Your posts are not available.</h3>
              ) : (
                <ModalGuestbookDisplay
                  guestbooks={sortGuestbooks(this.props.userGuestbooks)}
                />
              )}
            </div>
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

function mapStateToProps({ userGuestbooks }) {
  return { userGuestbooks };
}

export default connect(mapStateToProps)(ModalGuestbookList);
