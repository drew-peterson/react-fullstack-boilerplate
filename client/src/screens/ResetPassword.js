import React, { Component } from 'react';
import styled from 'styled-components';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';

class ResetPassword extends Component {
  render() {
    return (
      <Container>
        <h2>Reset Password</h2>
        <ResetPasswordForm />
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

export default ResetPassword;
