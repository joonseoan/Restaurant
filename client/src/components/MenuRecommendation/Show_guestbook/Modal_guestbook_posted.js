import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import _ from "lodash";

import { timeInfo } from "../../../utils/uIControl";

import {
  setGuestbook,
  fetchGuesbookLists,
  deleteLoginUserGuestbook
} from "../../../actions";

class ModalGuestbookPosted extends Component {
  state = {
    authenticated: false,
    id: ""
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.id !== nextProps.postStateControl) {
      return {
        id: nextProps.postStateControl
      };
    }

    return null;
  }

  deleteButton = () => {
    if (window.sessionStorage.id) {
      return (
        <button onClick={this.deletePost} className="btn btn-sm btn-danger">
          Delete this post
        </button>
      );
    } else {
      return <div />;
    }
  };

  deletePost = async e => {
    const { id } = this.state;
    const response = await this.props.deleteLoginUserGuestbook(id);
    const { data } = response.payload;
    const { userGuestbooks } = this.props;

    try {
      if (data) {
        const newUserGuestbooks = _.filter(
          userGuestbooks,
          guestbook => guestbook._id !== data.post._id
        );

        this.props.setGuestbook(newUserGuestbooks);
        this.props.postManage(false);
        this.props.displayModal();
      }
    } catch (e) {
      console.log("Unexpected error occurred.");
    }
  };

  render() {
    const { showPost, guestbooks, userGuestbooks } = this.props;

    let books;
    if (!this.state.authenticated) {
      books = guestbooks;
    } else {
      this.books = userGuestbooks;
    }

    if (!books || !this.state.id || books.length === 0) return <div />;

    const post = _.filter(books, guestbook => guestbook._id === this.state.id);

    if (post.length === 0) return <div />;

    const { food, title, comments, visitedAt } = post[0];

    return (
      <Modal
        show={showPost}
        style={{ fontFamily: "ubuntu", fontSize: "24px" }}
        className="font-italic"
      >
        <Modal.Header>
          <div className="float-left text-left d-inline">{title}</div>
          <div
            className="btn btn-sm btn-danger float-right d-inline"
            onClick={() => {
              this.props.postManage(false);
              this.props.displayModal();
            }}
          >
            x
          </div>
        </Modal.Header>

        <Modal.Body>
          <div>
            {" "}
            <div>I ate {food}. </div>
            {comments}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="float-left d-inline">{this.deleteButton()}</div>
          <div className="text-right d-inline">
            @{timeInfo(Number(visitedAt))}
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps({ postStateControl }) {
  return {
    postStateControl
  };
}

export default connect(
  mapStateToProps,
  {
    setGuestbook,
    fetchGuesbookLists,
    deleteLoginUserGuestbook
  }
)(ModalGuestbookPosted);
