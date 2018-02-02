import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { Input } from "../common";
import * as actions from "../../actions";

class SignupForm extends Component {
  onFormSubmit(values) {
    const { history, localSignup } = this.props;
    localSignup(values, history);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
        <div className="row">
          <Field
            className="col s12 m6"
            component={Input}
            name="firstName"
            placeholder="First Name"
            required
          />
          <Field
            className="col s12 m6"
            component={Input}
            name="lastName"
            placeholder="Last Name"
            required
          />
        </div>
        <Field
          className="col s12"
          component={Input}
          type="email"
          name="email"
          placeholder="Email"
        />
        <Field
          className="col s12"
          component={Input}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button className="btn" type="submit" name="action">
          Submit
          <i className="material-icons right">send</i>
        </button>
      </Form>
    );
  }
}

const Form = styled.form`
  margin-top: 40px;
`;

SignupForm = reduxForm({
  form: "signupForm"
})(SignupForm);

export default connect(null, actions)(withRouter(SignupForm));
