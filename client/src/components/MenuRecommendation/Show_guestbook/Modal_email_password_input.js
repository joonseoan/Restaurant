import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
//import { Link } from "react-router-dom";
import _ from "lodash";
import { Modal } from "react-bootstrap";

import { userGuestbookLogin, setGuestbook } from "../../../actions";

class ModalEmailPasswordInput extends Component {
  state = {
    // data: [],
    showModal: false,
    message: ""
  };

  renderInputField(fields) {
    const {
      meta: { touched, error }
    } = fields;

    const className = `${touched && error ? "text-warning blink" : ""}`;

    return (
      <div className="mb-5 mx-5">
        <div className={className} style={{ fontSize: "18px" }}>
          {fields.showTitle}
        </div>
        <input
          type={fields.input.name === "email" ? "email" : "password"}
          className="form-control mx-auto"
          style={{ width: "70%" }}
          {...fields.input}
        />

        <div className="text-danger" style={{ fontSize: "12px" }}>
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  backToCustomerReview = () => {
    this.props.closeModal();
    this.props.displayModal();
  };

  onSubmit = async values => {
    const response = await this.props.userGuestbookLogin(values);
    const { data } = response.payload;

    // console.log(data);

    try {
      if (data) {
        if (data === "no_email") {
          this.setState({ message: "The email is not availalbe." });
          return;
        } else if (data === "no_password") {
          this.setState({ message: "The password is wrong." });

          return;
        }

        if (data.length >= 0) {
          this.props.setGuestbook(data);
          window.sessionStorage.id = data[0]._id;
          this.props.closeModal();
          this.props.modalControl.open();
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
      <div>
        <Modal show={this.props.showModal} style={{ top: "10%" }}>
          <Modal.Header className="bg-success">
            <div>
              <h3 className="heading heading-correct-pronounciation font-weight-bold">
                <em>FIND YOUR POST</em>
              </h3>
              Enter Your email and password
            </div>
          </Modal.Header>
          <Modal.Body className="text-center" style={{ fontFamily: "ubuntu" }}>
            <form className="mb-5" onSubmit={handleSubmit(this.onSubmit)}>
              <div className="form-group">
                <Field
                  className="form-control"
                  name="email"
                  component={this.renderInputField}
                  showTitle="YOUR EMAIL ADDRESS:"
                />

                <Field
                  className="form-control"
                  name="password"
                  component={this.renderInputField}
                  showTitle="YOUR PASSWORD:"
                />
              </div>

              {
                <div className="mb-4 blink text-warning font-italic">
                  {" "}
                  {this.state.message}{" "}
                </div>
              }

              <div>
                <Field
                  className="btn-sm btn-danger"
                  name="submit"
                  component="button"
                  type="submit"
                >
                  GET YOUR POSTS
                  <i className="fa fa-get-pocket mt-1 ml-2" />
                </Field>
              </div>
            </form>
            <p className="mb-2">
              *** You can signup once you join our food and service survey
            </p>
            <hr />
            <button
              className="btn-sm btn-outline-success float-left"
              onClick={() => {
                this.props.closeModal();
              }}
            >
              BACK TO MAIN MENU
              <i className="fa fa-th-list mt-1 ml-2" />
            </button>

            <button
              className="btn-sm btn-outline-primary float-right"
              onClick={this.backToCustomerReview}
            >
              BACK TO CUST. REVIEW
              <i className="fa fa-list-ul mt-1 ml-2" />
            </button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

function validate(values) {
  let err = {};

  if (!values.email) {
    err.email = "Please enter your email address.";
  } else {
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

    if (!emailPattern.test(values.email)) {
      err.email = "You enterned a wrong email format.";
    }
  }

  if (!values.password) {
    err.password = "Please enter your password.";
  } else {
    if (values.password.length < 8) {
      err.password = "Your password must be more than 8 letters.";
    }
  }

  return err;
}

function mapStateToProps({ modalControl }) {
  return { modalControl };
}

export default reduxForm({
  form: "emailPasswordGuestbook",
  validate
  // destroyOnUnmount : false
})(
  connect(
    mapStateToProps,
    { userGuestbookLogin, setGuestbook }
  )(ModalEmailPasswordInput)
);
