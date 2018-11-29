import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Modal } from "react-bootstrap";

import { setGuestbook, deleteLoginUserGuestbook } from "../../actions";
import { timeInfo, insertSpaces } from "../uIControl";

class GuestbookPosted extends Component {
  state = {
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
        <button onClick={this.deletePost} className="btn-sm btn-danger">
          DELETE THIS POST
          <i className="fa fa-eraser ml-2" />
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
     // console.log("Unexpected error occurred.");
    }
  };

  render() {
    const { showPost, guestbooks, userGuestbooks, path } = this.props;
    const books = window.sessionStorage.id ? userGuestbooks : guestbooks;

    if (!books || !this.state.id || books.length === 0) return <div />;

    const post = _.filter(books, guestbook => guestbook._id === this.state.id);

    if (post.length === 0) return <div />;

    const { food, title, comments, visitedAt, city } = post[0];

    return (
      <Modal
        show={showPost}
        style={{ fontFamily: "ubuntu", fontSize: "20px", top: "20%" }}
      >
        <Modal.Header className="bg-light text-uppercase">
          <div className="float-left mt-2 mr-auto d-inline">{title}</div>
          <i
            className="fa fa-times-circle text-secondary display-4 ml-auto d-inline exit"
            onClick={() => {
              this.props.postManage(false);
              if (path === "/") this.props.displayModal();
            }}
          />
        </Modal.Header>
        <Modal.Title>
          <div className="text-right mr-3 mt-3" style={{ fontSize: "20px" }}>
            I ate{" "}
            <span className="text-primary font-weight-bold">
              {insertSpaces(food)}
            </span>{" "}
            at {city}.
          </div>
        </Modal.Title>

        <Modal.Body>
          <div>
            {" "}
            <p className="font-normal ml-3 mr-3" style={{ fontSize: "16px" }}>
              {comments}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-info">
          <div className="d-inline mr-auto">{this.deleteButton()}</div>
          <div className="text-right d-inline" style={{ fontSize: "16px" }}>
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
    deleteLoginUserGuestbook
  }
)(GuestbookPosted);
