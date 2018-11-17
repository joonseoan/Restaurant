import React from "react";
import { removeSpace, insertSpaces } from "../utils/uIControl";
import { Link } from "react-router-dom";
import _ from "lodash";
import moment from "moment";

const Display = ({ guestbooks }) => {
  //  console.log("guestbooks: ", guestbooks);

  let countNumber = 1;
  const guestbookStored = guestbooks.sort((date1, date2) => {
    date1.visitedAt - date2.visitedAt;
  });

  const timeInfo = timeStamp => {
    const visitTime = moment(Number(timeStamp));
    return visitTime.format("h:mm a in MMM Do YYYY");
  };

  return (
    <ul className="list-group list-group-flush">
      {guestbookStored.reverse().map(guestbook => {
        if (countNumber > 10) return;
        return (
          <li
            key={guestbook._id}
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
              <span>, {timeInfo(guestbook.visitedAt)}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Display;