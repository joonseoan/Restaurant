import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

import { userGuestbookLogin, setGuestbook } from "../actions/index";
import {
  renderInputField,
  header,
  body,
  getValidate
} from "../utils/guestbookUtilities/emailPasswordInput";

class EmailPasswordInput extends Component {
  state = {
    message: ""
  };

  renderInputField(fields) {
    const {
      meta: { touched, error }
    } = fields;

    const className = `${touched && error ? "text-warning blink" : ""}`;

    return renderInputField(className, fields, touched, error);
  }

  sendSubmit = async values => {
    const response = await this.props.userGuestbookLogin(values);
    const { data } = response.payload;

    try {
      if (data) {
        if (data === "no_email") {
          this.setState({ message: "The email is not availalbe." });

          return;
        } else if (data === "no_password") {
          this.setState({ message: "The password is wrong." });

          return;
        }

        if (data.length > 0) {
          const {
            history: { push },
            setGuestbook
          } = this.props;

          sessionStorage.id = data[0]._id;
          setGuestbook(data);
          push("/guestbookList");

          return;
        }
      }
    } catch (e) {
      this.setState({ message: "Unexpected error occurred." });
    }
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="card center-align">
        <Modal
          className="text-center"
          show={this.props.location.state}
          style={{ top: "5%" }}
        >
          <Modal.Header className="bg-success">{header()}</Modal.Header>
          <Modal.Body>
            {body(
              handleSubmit,
              this.sendSubmit,
              this.renderInputField,
              this.state.message
            )}

            <div className="row">
              <div className="col">
                <Link to="/" className="btn-sm btn-outline-success float-left">
                  BACK TO MAIN MENU
                  <i className="fa fa-th-list mt-1 ml-2" />
                </Link>
              </div>
              <div className="col">
                <Link
                  to="/guestbookAllPosted"
                  className="btn-sm btn-outline-primary float-right"
                >
                  BACK TO CUST. REVIEW
                  <i className="fa fa-list-ul mt-1 ml-2" />
                </Link>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

function validate(values) {
  let err = {};
  return getValidate(values, err);
}

export default reduxForm({
  form: "emailPasswordGuestbook",
  validate
  // destroyOnUnmount : false
})(
  connect(
    null,
    { userGuestbookLogin, setGuestbook }
  )(EmailPasswordInput)
);
