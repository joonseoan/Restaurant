import { connect } from "react-redux";
import { display } from "../utils/guestbookUtilities/guestbook_display";
import { postControl } from "../actions";

const Display = props => {
  let countNumber = 1;
  const { guestbooks, postManage, postControl, path } = props;
  return display(countNumber, guestbooks, postManage, postControl, path, null);
};

export default connect(
  null,
  { postControl }
)(Display);
