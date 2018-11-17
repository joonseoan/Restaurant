import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Display from "./guestbook_display";

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
      <div>
        <h1 className="heading heading-correct-pronounciation">
          <em>Your Posts</em>
        </h1>
        Please, click a title to view customer's recommendation.
      </div>
      <hr className="border border-secondary" />

      <Display guestbooks={props.userGuestBooks} />

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

function mapStateToProps({ userGuestBooks }) {
  return { userGuestBooks };
}

export default connect(mapStateToProps)(GuestbookList);
