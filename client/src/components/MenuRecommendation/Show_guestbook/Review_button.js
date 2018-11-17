import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import ModalGuestbookAllPosted from "./Modal_ guestbook_all_posted";
import ModalGuestbookList from "./Modal_geustbook_list";
import { modalControl, fetchGuesbookLists } from "../../../actions";

class ReviewButton extends Component {
  state = {
    showModal: false
  };

  handleOpenModal = () => {
    this.props.fetchGuesbookLists();

    this.setState({ showModal: true });
    const modalControl = {
      open: () => {
        this.setState({ showModal: true });
      },
      close: () => {
        this.setState({ showModal: false });
      }
    };
    this.props.modalControl(modalControl);
  };

  render() {
    //if (!this.props.allGuestbooks) return <div />;

    //sessionStorage.id = "";

    let guestbookStored = [];
    //    if (this.props.guestbook.length > 0) {
    const guestbooks = _.filter(
      this.props.guestbooks,
      guestbook => guestbook.like
    );

    guestbookStored = guestbooks.sort((date1, date2) => {
      Number(date2.visitedAt) - Number(date1.visitedAt);
    });
    //  }

    const name = !window.sessionStorage.id
      ? "REVIEW CUSTOMER'S BEST CHOICE"
      : "YOUR POSTS";

    return (
      <div>
        <button
          className="btn btn-info btn-sm mt-5 font-weight-bold"
          onClick={this.handleOpenModal}
        >
          {name}
          <i className="fa fa-list-alt ml-2 mt-2" />{" "}
        </button>
        {!window.sessionStorage.id ? (
          <ModalGuestbookAllPosted
            showModal={this.state.showModal}
            deleteModal={() => {
              this.setState({ showModal: false });
            }}
            displayModal={() => {
              this.setState({ showModal: true });
            }}
          />
        ) : (
          <ModalGuestbookList
            showModal={this.state.showModal}
            deleteModal={() => {
              this.setState({ showModal: false });
            }}
            guestbooks={guestbookStored}
          />
        )}
      </div>
    );
  }
}

export default connect(
  null,
  { modalControl, fetchGuesbookLists }
)(ReviewButton);
