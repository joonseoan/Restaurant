import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { fetchGuesbookLists } from "../actions/index";
import { removeSpace, insertSpaces } from "../utils/uIControl";

class GuestbookAllPosted extends Component {
  componentDidMount() {
    this.props.fetchGuesbookLists();
  }

  renderGuestBooks() {
    let dislikeEvaluation = [];
    let countNumber = 1;
    const guestbooks = _.map(this.props.guestbooks, guestbook => guestbook);

    return guestbooks.reverse().map(guestbook => {
      console.log(this.props);

      if (guestbook && guestbook.like && countNumber < 11) {
        return (
          <li
            className={`list-group-item bg-${
              countNumber % 2 === 0 ? "light" : ""
            }`}
            key={guestbook._id}
            style={{
              paddingBottom: "0px",
              marginBottom: "0px"
            }}
          >
            <div
              className="text-left font-weight-bold mt-3"
              style={{ fontSize: "18px" }}
            >
              <Link to={`/guestbookPosted/${guestbook._id}`}>
                <span className="text-primary"> {guestbook.title} </span>
                <span>
                  {" "}
                  <img
                    className="img img-fluid thumbnail rounded float-left border mr-3"
                    src={`./images/${removeSpace(guestbook.food)}.PNG`}
                    alt={guestbook.food}
                    style={{ width: "50px", height: "50px" }}
                  />
                  <span className="float-right">
                    <span
                      className="mr-2 text-danger blink"
                      style={{ fontSize: "11px" }}
                    >
                      {insertSpaces(guestbook.food)}
                    </span>
                    <i className="fa fa-thumbs-up bg-primary text-white border border-muted rounded" />
                  </span>
                </span>
              </Link>
            </div>
            <div className="text-left text-muted mt-2">
              <span>
                {" "}
                {countNumber++}. Customer: {guestbook.email.substring(0, 3)}
                xxx@Owl Korean Restaurant in{" "}
                <strong className="text-success">{guestbook.city}</strong>
              </span>
              <span> {guestbook.visitedAt}</span>
            </div>
          </li>
        );
      } else {
        dislikeEvaluation.push(guestbook);

        return <div key={guestbook._id} />;
      }
    });
  }

  render() {
    return (
      <div
        className="container jumbotron text-center"
        style={{ fontFamily: "ubuntu" }}
      >
        <hr className="border border-secondary" />
        <div>
          <h1 className="heading heading-correct-pronounciation">
            <em>Customer's Best Choices</em>
          </h1>
          Please, click a title to view customer's recommendation.
        </div>
        <hr className="border border-secondary" />
        <ul className="list-group list-group-flush">
          {this.renderGuestBooks()}
        </ul>

        <div>
          <Link
            className="btn btn-sm btn-outline-primary border-primary rounded mr-5"
            to="/"
          >
            Back to main page
            <i className="fa fa-arrow-left ml-2" />
          </Link>

          <Link
            className="btn btn-sm btn-outline-danger border-danger rounded"
            to="/emailPasswordInput"
          >
            Delete your post
            <i className="fa fa-eraser ml-2" />
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ guestbooks }) {
  return { guestbooks };
}

export default connect(
  mapStateToProps,
  { fetchGuesbookLists }
)(GuestbookAllPosted);
