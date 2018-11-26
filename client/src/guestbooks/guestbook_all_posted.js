import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { fetchGuesbookLists } from "../actions/index";
import {
  guestbookAllPosted,
  commonGroup
} from "../utils/guestbookUtilities/guestbookAllPosted";

import GuestbookPosted from "../utils/guestbookUtilities/guestbook_posted";

class GuestbookAllPosted extends Component {
  state = { showLogin: false, showPost: false };
  componentDidMount() {
    this.props.fetchGuesbookLists();
  }

  handleFindPost = () => {
    const { push } = this.props.history;

    push("/emailPasswordInput", true);
  };

  render() {
    if (!this.props.guestbooks) return <div />;

    const guestbooks = _.filter(
      this.props.guestbooks,
      guestbook => guestbook.like
    );

    const postManage = control => {
      this.setState({ showPost: control });
    };

    const { path } = this.props.match;
    return (
      <div>
        <div
          className="container jumbotron text-center"
          style={{ fontFamily: "ubuntu" }}
        >
          <hr className="border border-secondary" />
          {commonGroup()}
          <hr className="border border-secondary" />
          {guestbookAllPosted(guestbooks, postManage, path)}

          <div className="row mx-auto">
            <div className="col">
              <Link
                className="btn btn-sm btn-outline-primary border-primary rounded"
                to="/"
              >
                BACK TO MAIN MENU
                <i className="fa fa-arrow-left ml-2" />
              </Link>
            </div>
            <div className="col">
              <button
                className="btn btn-sm btn-outline-danger border-danger rounded"
                onClick={this.handleFindPost}
              >
                FIND YOUR POST
                <i className="fa fa-list-ol ml-2 mt-1" />
              </button>
            </div>
          </div>
        </div>
        <GuestbookPosted
          guestbooks={this.props.guestbooks}
          showPost={this.state.showPost}
          postManage={postManage}
          path={path}
        />
      </div>
    );
    // return (
    //   <div
    //     className="container jumbotron text-center"
    //     style={{ fontFamily: "ubuntu" }}
    //   >
    //     <hr className="border border-secondary" />
    //     <div>
    //       <h1 className="heading heading-correct-pronounciation">
    //         <em>Customer's Best Choices</em>
    //       </h1>
    //       Please, click a title to view customer's recommendation.
    //     </div>
    //     <hr className="border border-secondary" />

    //     <Display guestbooks={guestbooks} />

    //     <Link
    //       className="btn btn-sm btn-outline-primary border-primary rounded mr-5"
    //       to="/"
    //     >
    //       BACK TO MAIN MENU
    //       <i className="fa fa-arrow-left ml-2" />
    //     </Link>

    //     <button
    //       className="btn btn-sm btn-outline-danger border-danger rounded"
    //       // to="/emailPasswordInput"
    //       onClick={this.handleFindPost}
    //     >
    //       FIND YOUR POST
    //       <i className="fa fa-list-ol ml-2 mt-1" />
    //     </button>
    //   </div>
    // );
  }
}

function mapStateToProps({ guestbooks }) {
  return { guestbooks };
}

export default connect(
  mapStateToProps,
  { fetchGuesbookLists }
)(GuestbookAllPosted);
