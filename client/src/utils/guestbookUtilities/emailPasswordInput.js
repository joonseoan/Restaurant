import React from "react";
import { Field, reduxForm } from "redux-form";

export function renderInputField(className, fields, touched, error) {
  const contents = (
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
  return contents;
}

export function header() {
  const contents = (
    <div>
      <h3 className="heading heading-correct-pronounciation font-weight-bold">
        <em>FIND YOUR POST</em>
      </h3>
      Enter Your email and password
    </div>
  );
  return contents;
}

export function body(handleSubmit, sendSubmit, renderInputField, message) {
  const contents = (
    <div>
      <form className="mb-5" onSubmit={handleSubmit(sendSubmit)}>
        <div className="form-group">
          <Field
            className="form-control"
            name="email"
            component={renderInputField}
            showTitle="YOUR EMAIL ADDRESS:"
          />

          <Field
            className="form-control"
            name="password"
            component={renderInputField}
            showTitle="YOUR PASSWORD:"
          />
        </div>
        {<div className="mb-4 blink text-warning font-italic"> {message} </div>}
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
    </div>
  );

  return contents;
}

export function getValidate(values, err) {
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
