import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Input } from '../common';
import * as actions from '../../actions';

class ResetPasswordForm extends Component {
  onFormSubmit(values) {
    console.log('values', values);
  }

  render() {
    const { handleSubmit, errors } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
        <Field
          component={Input}
          type="password"
          name="password"
          placeholder="Password"
        />
        <Field
          component={Input}
          type="password"
          name="passwordCheck"
          placeholder="Type password again"
        />
        <button className="btn" type="submit" name="action">
          Reset Password
        </button>

        {errors && (
          <ErrorsText className="red-text center-align">
            {errors.localLogin}
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

ResetPasswordForm = reduxForm({
  form: 'resetPassword'
})(ResetPasswordForm);

function mapStateToProps({ errors }) {
  return { errors };
}
export default connect(mapStateToProps, actions)(withRouter(ResetPasswordForm));
