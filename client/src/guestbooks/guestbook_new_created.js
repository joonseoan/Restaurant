import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { RadioButtonGroup, Checkbox } from 'redux-form-material-ui';

import { createGuestbook } from "../actions/index";

class GuestbookNewCreated extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibility: "hidden"
    };
  }

  // field values are delivered in a defining order down below.
  renderInputField(fields) {
    const {
      meta: { touched, error }
    } = fields;

    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    const placeholders =
      fields.input.name === "servComments"
        ? "Please detail your complaints here."
        : "";

    return (
      <div className={className} style={{ marginBottom: "40px" }}>
        <p>
          <strong>
            {fields.showTitle}

            {fields.input.name === "telephone" ||
            fields.input.name === "servComments"
              ? ""
              : " (Required)"}
          </strong>
        </p>

        <label>
          <input
            type={
              fields.input.name === "password" ||
              fields.input.name === "password2"
                ? "password"
                : "text"
            }
            width="300"
            height="500"
            placeholder={placeholders}
            {...fields.input} // each property only
          />
        </label>

        <div>{touched ? error : ""}</div>
      </div>
    );
  }

  renderInputEmail(field) {
    const {
      meta: { touched, error }
    } = field;

    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div>
        <p>{field.showTitle} (Required)</p>

        <label>
          <input
            type="email"
            {...field.input} // each property only
            placeholder="Example: example@example.com"
          />
        </label>

        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  renderCommentField(field) {
    const {
      meta: { touched, error }
    } = field;

    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <p>
          <strong>Comments. Give us your valuable feedback. (Required)</strong>
        </p>

        <label htmlFor="textarea1">
          <textarea
            {...field.input} // each property only
            cols="50"
            rows="10"
            placeholder="Please write your comments for foods or services here."
          />
        </label>

        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  orderedManuList(fields) {
    let {
      meta: { touched, error },
      options,
      input
    } = fields;

    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        {options.map(option => {
          input.value = option.name;

          return (
            <label key={option.name}>
              <p>{option.name}</p>

              <input className="button-css" type="radio" {...fields.input} />
            </label>
          );
        })}

        <div>{touched ? error : ""}</div>
      </div>
    );
  }

  renderLikeDislike(fields) {
    let {
      meta: { touched, error },
      options,
      input
    } = fields;

    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    let count = 0;

    return (
      <div className={className}>
        {options.map(option => {
          input.value = option;

          let color = count === 0 ? "blue" : "red";

          count++;

          return (
            <label key={option}>
              I {option} this menu
              <input type="radio" {...fields.input} />
            </label>
          );
        })}

        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    if (values.likeDislike) {
      if (values.likeDislike === "like") {
        values.like = true;
      } else {
        values.dislike = true;
      }

      delete values.likeDislike;
    }

    values.city = this.props.additionalTodayWeather.name;

    this.props.createGuestbook(values, () => {
      const {
        history: { push }
      } = this.props;

      push("/guestbookAllPosted");
    });
  }

  inputClick(event) {
    event.target.checked === true
      ? this.setState({ visibility: "visible" })
      : this.setState({ visibility: "hidden" });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="card container">
        <h3>Customer Survey</h3>

        <form
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
          style={{ marginTop: "50px" }}
        >
          <strong>Select the one you ordred (Required)</strong>
          <Field
            name="food"
            component={this.orderedManuList}
            options={this.props.orderedMenu}
          />
          Are you satisfied with your meal? (Required)
          <Field
            name="likeDislike"
            component={this.renderLikeDislike}
            options={["like", "dislike"]}
          />
          <Field
            name="title" // inside of input
            component={this.renderInputField}
            showTitle="Title" // separate value from input
          />
          <Field name="comments" component={this.renderCommentField} />
          <Field
            name="email"
            component={this.renderInputEmail}
            showTitle="Your Email"
          />
          <Field
            name="password"
            component={this.renderInputField}
            showTitle="Your Password"
          />
          <Field
            name="password2"
            component={this.renderInputField}
            showTitle="Confirm Your Password"
          />
          <div>
            <label style={{ fontSize: "1em", color: "black" }}>
              I don't like your service. (Optional)
              <Field
                name="servDislike"
                component="input"
                type="checkbox"
                value="true"
                onClick={this.inputClick.bind(this)}
              />
            </label>
          </div>
          <div>
            <label style={{ visibility: this.state.visibility }}>
              <Field name="servComments" component={this.renderInputField} />
            </label>

            <Field
              name="telephone"
              component={this.renderInputField}
              showTitle="Your Telephone Number (Optional)"
            />
          </div>
          <h5>Thank you for joining survey!</h5>
          <Field name="submit" component="button" type="submit">
            Submit
          </Field>
          <Link to="/">Cancel</Link>
        </form>
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
    err.title = "Please enter title here.";
  }

  if (!values.comments) {
    err.comments = "Please enter title here.";
  }

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

  if (!values.password2) {
    err.password2 = "Please enter same password as above to confirm.";
  } else {
    if (values.password !== values.password2) {
      err.password2 = "Your password must be same as above with 8 letters.";
    }
  }

  if (values.telephone) {
    const telephonePattern = /^\(?[0-9]{3}\)?-?[0-9]{3}-?[0-9]{4}$/;

    if (!telephonePattern.test(values.telephone)) {
      err.telephone =
        "You entered a wrong telephone number. Please, enter again.";
    }
  }

  return err;
}

const mapStateToProps = ({ orderedMenu, additionalTodayWeather }) => {
  return { orderedMenu, additionalTodayWeather };
};

export default reduxForm({
  // naming the form of this component
  form: "CreateNewGuestbook",
  validate
  // destroyOnUnmount : false
})(
  connect(
    mapStateToProps,
    { createGuestbook }
  )(GuestbookNewCreated)
);
