import React from "react";
import { connect } from "react-redux";
// import { removeSpace, insertSpaces } from "../utils/uIControl";
// import { Link } from "react-router-dom";
import { display } from "../utils/guestbookUtilities/guestbook_display";
import { postControl } from "../actions";

const Display = props => {
  let countNumber = 1;
  const { guestbooks, postManage, postControl, path } = props;
  return display(countNumber, guestbooks, postManage, postControl, path, null);
};

// function mapStateToProps({ showPostController }) {
//   return {
//     showPostController
//   };
// }

export default connect(
  // mapStateToProps,
  null,
  { postControl }
)(Display);
