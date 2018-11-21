import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import {
  createGuestbook,
  fetchGuesbookLists,
  setGuestbook
} from "../actions/index";
import { insertSpaces } from "../utils/uIControl";
import Tradition from "./tradition";
import ThankYou from "./thankyou";

class GuestbookNewCreated extends Component {
  state = {
    visibility: "hidden",
    showThankYou: false
  };

  iconSize = {
    fontSize: "24px"
  };

  inputDesign = {
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid #000000",
    boxShadow: "none",
    outline: "none",
    borderRadius: "0%"
  };

  // field values are delivered in a defining order down below.
  renderInputField(fields) {
    const {
      meta: { touched, error }
    } = fields;

    const className = `${touched && error ? "blink text-warning" : ""}`;

    let placeholders;
    if (fields.input.name === "servComments") {
      placeholders = "Please detail your complaints here.";
    } else if (fields.input.name === "email") {
      placeholders = "Example: example@example.com";
    } else {
      placeholders = "";
    }

    let type;
    if (fields.input.name === "password" || fields.input.name === "password2") {
      type = "password";
    } else if (fields.input.name === "email") {
      type = "email";
    } else {
      type = "text";
    }

    let icons;

    if (fields.input.name === "email") {
      icons = "envelope";
    } else if (
      fields.input.name === "password" ||
      fields.input.name === "password2"
    ) {
      icons = "lock";
    } else if (fields.input.name === "telephone") {
      icons = "phone";
    } else if (fields.input.name === "title") {
      icons = "file";
    } else if (fields.input.name === "comments") {
      icons = "pencil";
    } else if (fields.input.name === "servComments") {
      icons = "angry";
    } else {
      icons = "";
    }

    const iconSize = {
      fontSize: "24px"
    };

    const inputDesign = {
      backgroundColor: "transparent",
      border: "none",
      borderBottom: "1px solid #000000",
      boxShadow: "none",
      outline: "none",
      borderRadius: "0%",
      visibility: fields.input.name === "servComments" ? fields.options : null
    };

    if (fields.input.name === "comments") {
      return (
        <div className="mb-5">
          <i
            className={`fa fa-${icons} prefix text-primary mr-3`}
            style={iconSize}
          />
          <label className={`font-weight-bold ${className}`}>
            {fields.showTitle}. Give us your valuable feedback. (Required)
          </label>
          <textarea
            className="form-control"
            {...fields.input} // each property only
            rows="3"
            style={inputDesign}
            placeholder="Please write your comments for foods here."
          />
          <div className="text-danger">{touched ? error : ""}</div>
        </div>
      );
    }

    return (
      <div className="mb-5">
        {fields.input.name !== "servComments" ? (
          <i
            className={`fa fa-${icons} prefix text-primary mr-3 survey-icons`}
            style={iconSize}
          />
        ) : null}
        {!fields.showTitle ? null : (
          <label className={`font-weight-bold ${className}`}>
            {fields.showTitle}
            {fields.input.name === "telephone" ||
            fields.input.name === "servComments"
              ? ""
              : " (Required)"}
          </label>
        )}
        <input
          className="form-control survey-inputs"
          style={inputDesign}
          type={type}
          placeholder={placeholders}
          {...fields.input} // each property only
        />

        <div className="text-danger">{touched ? error : ""}</div>
      </div>
    );
  }

  orderedManuList(fields) {
    let {
      meta: { touched, error },
      options,
      input
    } = fields;

    const className = `${touched && error ? "blink text-warning" : ""}`;

    return (
      <div className="mb-5">
        <i
          className={`fa fa-shopping-cart prefix text-primary mr-3`}
          style={{ fontSize: "24px" }}
        />
        <label className={className}>{fields.showTitle}</label>
        <div className="border-bottom border-dark">
          <ul className="row list-unstyled">
            {options.map(option => {
              input.value = option.name;
              return (
                <div key={option.name}>
                  <li className="col mt-3 mr-2">
                    <label
                      key={option.name}
                      className="font-weight-normal ml-3"
                    >
                      {insertSpaces(option.name)}
                    </label>
                    <input
                      className="ml-2"
                      type="radio"
                      {...fields.input}
                      style={{
                        verticalAlign: "middle",
                        position: "relative",
                        bottom: "1px"
                      }}
                    />
                  </li>
                </div>
              );
            })}
          </ul>
        </div>

        <div className="text-danger font-weight-normal">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  renderLikeDislike(fields) {
    let {
      meta: { touched, error },
      options,
      input
    } = fields;

    const className = `${touched && error ? "blink text-warning" : ""}`;

    return (
      <div className="mb-5">
        <i
          className={`fa fa-thumbs-up prefix text-primary mr-3`}
          style={{ fontSize: "24px" }}
        />
        <label className={className}>{fields.showTitle}</label>

        <div className="border-bottom border-dark mt-3">
          {options.map(option => {
            input.value = option;
            return (
              <label key={option} className="font-weight-normal ml-5">
                I {option} this menu
                <input
                  className="ml-2"
                  type="radio"
                  {...fields.input}
                  style={{
                    verticalAlign: "middle",
                    position: "relative",
                    bottom: "1px"
                  }}
                />
              </label>
            );
          })}
        </div>
        <div className="text-danger">{touched ? error : ""}</div>
      </div>
    );
  }

  inputClick = e => {
    e.target.checked === true
      ? this.setState({ visibility: "visible" })
      : this.setState({ visibility: "hidden" });
  };

  onSubmit = values => {
    if (values.likeDislike) {
      if (values.likeDislike === "like") {
        values.like = true;
      } else {
        values.dislike = true;
      }
      // dislike guestbook will be used for the business part later on....
      delete values.likeDislike;
    }

    values.city = this.props.additionalTodayWeather.name;
    this.props.createGuestbook(values);
    this.props.fetchGuesbookLists();

    this.setState({ showThankYou: true });

    window.sessionStorage.id = ''
  };

  render() {
    const { handleSubmit } = this.props;

    const names_titles = [
      { name: "email", title: "Your Email" },
      { name: "password", title: "Your Password" },
      { name: "password2", title: "Confirm Your Password" },
      { name: "telephone", title: "Your Telephone Number (Optional)" }
    ];

    return (
      <div className="container" style={{ fontFamily: "ubuntu" }}>
        <h1 className="font-weight-bold text-center">Customer Survey</h1>
        <form className="mt-5" onSubmit={handleSubmit(this.onSubmit)}>
          <div className="row form-group">
            <div>
              <Tradition />
              <div className="col card">
                <div className="card-title border-bottom border-secondary">
                  <h3 className="font-weight-bold text-danger">
                    Let's get in touch!
                  </h3>
                </div>
                <div className="card-body">
                  {_.map(names_titles, name_title => {
                    return (
                      <Field
                        key={name_title.name}
                        name={name_title.name}
                        component={this.renderInputField}
                        showTitle={name_title.title}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col card mt-2">
              <div className="card-title border-bottom border-secondary">
                <h3 className="font-weight-bold text-danger">
                  What about our foods and services?
                </h3>
              </div>
              <div className="card-body">
                <label>
                  <Field
                    name="food"
                    component={this.orderedManuList}
                    options={this.props.orderedMenu}
                    showTitle="Select the one you ordred (Required)"
                  />
                </label>
                <Field
                  name="likeDislike"
                  component={this.renderLikeDislike}
                  options={["like", "dislike"]}
                  showTitle="Are you satisfied with your meal? (Required)"
                />
                <Field
                  name="title" // inside of input
                  component={this.renderInputField}
                  showTitle="Title" // separate value from input
                />
                <Field
                  name="comments"
                  component={this.renderInputField}
                  showTitle="Comments"
                />
                <label>
                  <i
                    className="fa fa-exclamation-circle prefix text-primary d-inline mr-3"
                    style={{ fontSize: "24px" }}
                  />
                  I don't like your service (Optional)
                  <input
                    className="ml-2"
                    style={{
                      verticalAlign: "middle",
                      position: "relative",
                      bottom: "1px"
                    }}
                    name="servDislike"
                    type="checkbox"
                    defaultChecked={false}
                    onClick={this.inputClick}
                  />
                </label>
                <Field
                  name="servComments"
                  component={this.renderInputField}
                  options={this.state.visibility}
                />
              </div>
              <div className="mx-auto mb-5">
                <Field
                  className="btn btn-sm btn-danger mr-4"
                  name="submit"
                  component="button"
                  type="submit"
                >
                  SEND
                  <i className="fa fa-share-square ml-2" />
                </Field>
                <Link className="btn btn-sm btn-primary" to="/">
                  CANCEL
                  <i className="fa fa-undo ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </form>
        <ThankYou thankyou={this.state.showThankYou} />
      </div>
    );
  }
}

function validate(values) {
  const err = {};

  if (!values.likeDislike) {
    err.likeDislike = "Please enter your preference.";
  }

  if (!values.food) {
    err.food = "Please select a food you ordered.";
  }

  if (!values.title) {
    err.title = "Please enter a title here.";
  }

  if (!values.comments) {
    err.comments = "Please tell us about your foods";
  }

  if (!values.email) {
    err.email = "Please enter your email address.";
  } else {
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

    if (!emailPattern.test(values.email)) {
      err.email = "It must be a full email format.";
    }
  }

  if (!values.password) {
    err.password = "Please enter your 8-character password.";
  } else {
    if (values.password.length < 8) {
      err.password = "Your password must be more than 8 characters.";
    }
  }

  if (!values.password2) {
    err.password2 = "Please enter same password as above";
  } else {
    if (values.password !== values.password2) {
      err.password2 = "Your password must be same as above";
    }
  }

  if (values.telephone) {
    const telephonePattern = /^\(?[0-9]{3}\)?-?[0-9]{3}-?[0-9]{4}$/;

    if (!telephonePattern.test(values.telephone)) {
      err.telephone = "You entered a wrong format of telephone number.";
    }
  }

  return err;
}

const mapStateToProps = ({
  orderedMenu,
  additionalTodayWeather,
  userGuestbooks
}) => {
  return { orderedMenu, additionalTodayWeather, userGuestbooks };
};

export default reduxForm({
  // naming the form of this component
  form: "CreateNewGuestbook",
  validate
  //destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    { createGuestbook, fetchGuesbookLists, setGuestbook }
  )(GuestbookNewCreated)
);
