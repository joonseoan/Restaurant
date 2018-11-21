import React, { Component } from "react";
import { connect } from "react-redux";
import { postControl } from "../../../actions";
import { display } from "../../../utils/guestbookUtilities/guestbook_display";

class ModalGuestbookDisplay extends Component {
  state = {
    guestbook_id: "",
    showPost: false
  };

  render() {
    if (!this.props.guestbooks || this.props.guestbooks.length === 0)
      return <div />;

    let countNumber = 1;

    return display(
      countNumber,
      this.props.guestbooks,
      this.props.postManage,
      this.props.postControl,
      this.props.path,
      this.props.deleteModal
    );
  }
}

export default connect(
  null,
  { postControl }
)(ModalGuestbookDisplay);
