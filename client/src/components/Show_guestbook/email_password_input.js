import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Modal } from "react-bootstrap";

import { userGuestbookLogin, setGuestbook } from "../../actions";
import GuestbookList from "./geustbook_list";

class EmailPasswordInput extends Component {
  state = {
    data: [],
    showModal: false,
    message: ""
  };

  componentDidUpdate(prevProps, prevState) {
    // if(prevProps.showModal !== this.props.showModal) {
    //   if (this.props.showModa) {
    //     this.setState({ showP })
    //   }
    // }
  }

  renderInputField(fields) {
    const {
      meta: { touched, error }
    } = fields;

    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input
          type={fields.input.name === "email" ? "email" : "password"}
          className="form-control"
          {...fields.input}
        />

        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit = async values => {
    const response = await this.props.userGuestbookLogin(values);
    const { data } = response.payload;

    // console.log(data);

    try {
      if (data) {
        if (data === "no_email") {
          this.setState({ message: "The email is not availalbe." });

          // return;
        } else if (data === "no_password") {
          this.setState({ message: "The password is wrong." });

          return;
        }

        if (data.length > 0) {
          //          console.log("data: ", data);
          // setGuestbook(data);
          this.props.closeModal();
          this.setState({ data });
          this.setState({ showModal: true });

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
        <Modal className="text-center" show={this.props.showModal}>
          <Modal.Header className="bg-success">
            <div>
              <h3 className="heading heading-correct-pronounciation">
                <em>FIND YOUR POST</em>
              </h3>
              Enter Your email and password
            </div>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <div>
                <label style={{ fontSize: "1.2em" }}>
                  Your email:
                  <Field name="email" component={this.renderInputField} />
                </label>
              </div>
              <div>
                <label style={{ fontSize: "1.2em" }}>
                  Your password:
                  <Field name="password" component={this.renderInputField} />
                </label>
              </div>

              {<div> {this.state.message} </div>}

              <div>
                <Link
                  to="/guestbookAllPosted"
                  className="btn btn-sm btn-primary"
                >
                  BACK TO CUSTOMER REVIEW
                </Link>
                <Link to="/" className="btn btn-sm btn-success ml-5">
                  BACK TO MAIN MENU
                </Link>
                <Field
                  className="btn btn-sm btn-danger ml-5"
                  name="submit"
                  component="button"
                  type="submit"
                >
                  SUBMIT
                </Field>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        <GuestbookList
          showModal={this.state.showModal}
          guestData={this.state.data}
        />
      </div>
    );
  }
}

function validate(values) {
  let err = {};

  if (!values.email) {
    err.email = "Please enter your email. It must be an email format.";
  } else {
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

    if (!emailPattern.test(values.email)) {
      err.email = "You enterned a wrong email. Please, enter again.";
    }
  }

  if (!values.password) {
    err.password =
      "Please enter your password. It must be more than 8 letters.";
  } else {
    if (values.password.length < 8) {
      err.password = "Your password must be more than 8 letters.";
    }
  }

  return err;
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
