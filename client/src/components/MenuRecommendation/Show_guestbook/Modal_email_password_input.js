import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Modal } from "react-bootstrap";

import { userGuestbookLogin, setGuestbook } from "../../../actions";
import {
  renderInputField,
  header,
  body,
  getValidate
} from "../../../utils/guestbookUtilities/emailPasswordInput";

class ModalEmailPasswordInput extends Component {
  state = {
    showModal: false,
    message: ""
  };

  renderInputField(fields) {
    const {
      meta: { touched, error }
    } = fields;

    const className = `${touched && error ? "text-warning blink" : ""}`;

    return renderInputField(className, fields, touched, error);
  }

  backToCustomerReview = () => {
    this.props.closeModal();
    this.props.displayModal();
  };

  onSubmit = async values => {
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
          <Modal.Header className="bg-success text-center">
            {header()}
          </Modal.Header>
          <Modal.Body className="text-center" style={{ fontFamily: "ubuntu" }}>
            {body(
              handleSubmit,
              this.onSubmit,
              this.renderInputField,
              this.state.message
            )}
            <div className="row">
              <button
                className="col btn-sm btn-outline-success float-left ml-2 mr-2"
                onClick={() => {
                  this.props.closeModal();
                }}
              >
                BACK TO MAIN MENU
                <i className="fa fa-th-list mt-1 ml-2" />
              </button>

              <button
                className="col btn-sm btn-outline-primary float-right mr-2 ml-2"
                onClick={this.backToCustomerReview}
              >
                BACK TO CUST. REVIEW
                <i className="fa fa-list-ul mt-1 ml-2" />
              </button>
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
