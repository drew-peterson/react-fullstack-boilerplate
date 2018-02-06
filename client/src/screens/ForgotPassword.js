import React, { Component } from 'react';
import styled from 'styled-components';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

class ForgotPassword extends Component {
  render() {
    return (
      <Container>
        <h2>Forgot Password</h2>
        <ForgotPasswordForm />
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

export default ForgotPassword;
