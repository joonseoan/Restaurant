import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import {
  setGuestbook,
  fetchGuesbookLists,
  deleteLoginUserGuestbook
} from "../../../actions";

import { guestbookPosted } from "../../../utils/guestbookUtilities/guestbook_posted";

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
          DELETE THIS POST
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

    return guestbookPosted(
      showPost,
      food,
      title,
      comments,
      visitedAt,
      this.props.postManage,
      this.props.displayModal,
      this.deleteButton
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
