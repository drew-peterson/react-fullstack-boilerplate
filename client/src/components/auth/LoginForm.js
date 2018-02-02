import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import * as actions from "../../actions";
import { Input } from "../common";

class LoginForm extends Component {
  async onFormSubmit(values) {
    const { history, localLogin } = this.props;

    localLogin(values, history);
  }

  render() {
    const { handleSubmit, errors } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
        <Field
          component={Input}
          type="email"
          name="email"
          placeholder="Email"
        />
        <Field
          component={Input}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button className="btn" type="submit" name="action">
          Login
          <i className="material-icons right">send</i>
        </button>

        {errors && <ErrorsText className="red-text center-align">{errors.localLogin}</ErrorsText>}
      </Form>
    );
  }
}

const Form = styled.form`
  margin-top: 40px;
`;

const ErrorsText = styled.p`
  margin-top: 20px !important;
  font-size: 20px;
`

function mapStateToProps({errors}){
  return {errors}
}

LoginForm = reduxForm({
  form: "loginForm"
})(LoginForm);


export default connect(mapStateToProps, actions)(withRouter(LoginForm));
