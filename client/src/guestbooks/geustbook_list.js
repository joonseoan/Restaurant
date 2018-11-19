import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Display from "./guestbook_display";

import {
  commonGroup,
  guestbookDisplay
} from "../utils/guestbookUtilities/guestbook_list";

const GuestbookList = props => {
  const handleLogout = () => {
    sessionStorage.id = "";
    window.location.reload();
  };

  return (
    <div
      className="container jumbotron text-center"
      style={{ fontFamily: "ubuntu" }}
    >
      <hr className="border border-secondary" />
      {commonGroup()}
      <hr className="border border-secondary" />

      {guestbookDisplay(props.userGuestbooks)}
      {/* 
          <Display guestbooks={props.userGuestbooks} />
         */}

      <Link
        className="btn btn-sm btn-outline-primary border-primary rounded mr-5"
        to="/"
      >
        BACK TO MAIN MENU
        <i className="fa fa-arrow-left ml-2" />
      </Link>
      <Link
        className="btn btn-sm btn-outline-danger border-danger rounded"
        onClick={handleLogout}
        to="/guestbookAllPosted"
      >
        LOGOUT
        <i className="fa fa-eraser ml-2" />
      </Link>
    </div>
  );
};

function mapStateToProps({ userGuestbooks }) {
  return { userGuestbooks };
}

export default connect(mapStateToProps)(GuestbookList);
