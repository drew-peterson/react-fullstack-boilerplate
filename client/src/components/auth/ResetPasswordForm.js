import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Input } from '../common';
import * as actions from '../../actions';

class ResetPasswordForm extends Component {
  onFormSubmit({ password }) {
    const { history, resetPassword, match: { params: { token } } } = this.props;
    resetPassword(password, token, history);
  }

  render() {
    const { handleSubmit, errors, submitting, pristine, invalid } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
        <Field
          component={Input}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Field
          component={Input}
          type="password"
          name="passwordCheck"
          placeholder="Type password again"
          required
        />
        <button
          className="btn"
          type="submit"
          name="action"
          disabled={pristine || submitting || invalid}
        >
          Reset Password
        </button>

        {errors && (
          <ErrorsText className="red-text center-align">
            {errors.err}
          </ErrorsText>
        )}
      </Form>
    );
  }
}

const Form = styled.form`
  max-width: 60%;
  background-color: ${props => props.theme.light};
  padding: 20px;
  margin: 0 auto;
  text-align: center;
  border-radius: 10px;
  color: white;
`;

const ErrorsText = styled.p`
  margin-top: 20px !important;
  font-size: 20px;
`;

const validate = values => {
  const errors = {};
  if (values.password !== values.passwordCheck) {
    errors.passwordCheck = 'Passwords much match!';
  }
  return errors;
};

ResetPasswordForm = reduxForm({
  form: 'resetPassword',
  validate
})(ResetPasswordForm);

function mapStateToProps({ errors }) {
  return { errors };
}
export default connect(mapStateToProps, actions)(withRouter(ResetPasswordForm));
