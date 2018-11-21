import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import ModalGuestbookAllPosted from "./Modal_ guestbook_all_posted";
import ModalGuestbookList from "./Modal_geustbook_list";
import GuestbookPosted from "../../../utils/guestbookUtilities/guestbook_posted";
// import ModalGuestbookPosted from "./Modal_guestbook_posted";

import {
  modalControl,
  fetchGuesbookLists
  //showPostControl
} from "../../../actions";

class ReviewButton extends Component {
  state = {
    showModal: false,
    showPost: false,
    userGuestbooks: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.userGuestbooks.length !== nextProps.userGuestbooks.length) {
      return {
        userGuestbooks: nextProps.userGuestbooks
      };
    }

    return null;
  }

  // componentDidMount() {
  //   this.props.showPostControl({
  //     showPost: this.state.showPost,
  //     setShowPost: control => {
  //       this.setState({ showPost: control });
  //     }
  //   });
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showModal !== this.state.showModal) {
      this.props.fetchGuesbookLists();
    }
  }

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
            postManage={control => {
              this.setState({ showPost: control });
            }}
            guestbooks={this.props.guestbooks}
          />
        ) : (
          <ModalGuestbookList
            showModal={this.state.showModal}
            deleteModal={() => {
              this.setState({ showModal: false });
            }}
            displayModal={() => {
              this.setState({ showModal: true });
            }}
            postManage={control => {
              this.setState({ showPost: control });
            }}
            userGuestbooks={this.state.userGuestbooks}
          />
        )}
        <GuestbookPosted
          showPost={this.state.showPost}
          postManage={control => {
            this.setState({ showPost: control });
          }}
          guestbooks={this.props.guestbooks}
          userGuestbooks={this.props.userGuestbooks}
          displayModal={() => {
            this.setState({ showModal: true });
          }}
          path="/"
        />
      </div>
    );
  }
}

function mapStateToProps({ guestbooks, userGuestbooks }) {
  return { guestbooks, userGuestbooks };
}

export default connect(
  mapStateToProps,
  { modalControl, fetchGuesbookLists } //  showPostControl
)(ReviewButton);
