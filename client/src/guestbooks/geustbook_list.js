import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import GuestbookPosted from "../utils/guestbookUtilities/guestbook_posted";

import {
  commonGroup,
  guestbookList
} from "../utils/guestbookUtilities/guestbook_list";

class GuestbookList extends Component {
  state = { showPost: false };

  handleLogout = () => {
    window.sessionStorage.id = "";
  };

  render() {
    const {
      match: { path },
      userGuestbooks
    } = this.props;

    const postManage = control => {
      this.setState({ showPost: control });
    };

    return (
      <div>
        <div
          className="container jumbotron text-center"
          style={{ fontFamily: "ubuntu" }}
        >
          <hr className="border border-secondary" />
          {commonGroup()}
          <hr className="border border-secondary" />

          {guestbookList(userGuestbooks, postManage, path)}

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
        </div>
        <GuestbookPosted
          userGuestbooks={userGuestbooks}
          showPost={this.state.showPost}
          postManage={postManage}
          path={path}
        />
      </div>
    );
  }
}

function mapStateToProps({ userGuestbooks }) {
  return { userGuestbooks };
}

export default connect(mapStateToProps)(GuestbookList);
