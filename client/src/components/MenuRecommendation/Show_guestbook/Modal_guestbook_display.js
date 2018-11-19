import React, { Component } from "react";
import _ from "lodash";
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
      this.props.deleteModal,
      this.props.postManage,
      this.props.postControl,
      "/"
    );
    // return (
    //   <ul className="list-group list-group-flush">
    //     {this.props.guestbooks.map(guestbook => {
    //       if (countNumber > 10) return;
    //       return (
    //         <div key={guestbook._id}>
    //           <li
    //             className={`list-group-item bg-${
    //               countNumber % 2 === 0 ? "light" : ""
    //             }`}
    //             key={guestbook._id}
    //             style={{
    //               paddingBottom: "0px",
    //               marginBottom: "0px"
    //             }}
    //           >
    //             <div
    //               className="text-left font-weight-bold mt-3"
    //               style={{ fontSize: "18px" }}
    //             >
    //               <Link
    //                 to="/"
    //                 onClick={() => {
    //                   this.props.deleteModal();
    //                   this.props.postManage(true);
    //                   this.props.postControl(guestbook._id);
    //                 }}
    //               >
    //                 <span className="text-primary"> {guestbook.title} </span>
    //                 <span>
    //                   <img
    //                     className="img img-fluid thumbnail rounded float-left border mr-3"
    //                     src={`./images/${removeSpace(guestbook.food)}.PNG`}
    //                     alt={guestbook.food}
    //                     style={{ width: "50px", height: "50px" }}
    //                   />
    //                   <span className="float-right">
    //                     <span
    //                       className="mr-2 text-danger blink"
    //                       style={{ fontSize: "11px" }}
    //                     >
    //                       {insertSpaces(guestbook.food)}
    //                     </span>
    //                     <i className="fa fa-thumbs-up bg-primary text-white border border-muted rounded" />
    //                   </span>
    //                 </span>
    //               </Link>
    //             </div>
    //             <div className="text-left text-muted mt-2">
    //               <span>
    //                 {" "}
    //                 {countNumber++}. Customer: {guestbook.email.substring(0, 3)}
    //                 xxx@Owl Korean Restaurant in{" "}
    //                 <strong className="text-success">{guestbook.city}</strong>
    //               </span>
    //               <span>, {timeInfo(guestbook.visitedAt)}</span>
    //             </div>
    //           </li>
    //         </div>
    //       );
    //     })}
    //   </ul>
    // );
  }
}

export default connect(
  null,
  { postControl }
)(ModalGuestbookDisplay);
