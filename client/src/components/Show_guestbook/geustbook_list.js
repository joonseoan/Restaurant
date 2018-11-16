import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

import Display from "./guestbook_display";

class GuestbookList extends Component {
  handleLogout = () => {
    sessionStorage.id = "";
    window.reload();
  };

  render() {
    if (!this.props.userGuestBooks || this.props.userGuestBooks === 0) return;
    //console.log("props.userGuestBooks: ", this.props);

    return (
      <div>
        <Modal
          className="text-center"
          show={this.props.showModal}
          {...this.props}
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
            <Modal.Body>
              <Display guestbooks={this.props.guestData} />
            </Modal.Body>
            <Modal.Footer>
              <Link
                className="btn btn-sm btn-outline-primary border-primary rounded mr-5"
                to="/"
              >
                BACK TO MAIN MENU
                <i className="fa fa-arrow-left ml-2" />
              </Link>
              <Link
                className="btn btn-sm btn-outline-danger border-danger rounded"
                onClick={this.handleLogout}
                to="/guestbookAllPosted"
              >
                LOGOUT
                <i className="fa fa-eraser ml-2" />
              </Link>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ userGuestBooks }) {
  return { userGuestBooks };
}

export default connect(mapStateToProps)(GuestbookList);
