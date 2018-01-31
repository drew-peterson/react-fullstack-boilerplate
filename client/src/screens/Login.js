import React, { Component } from "react";
import styled from "styled-components";

class Login extends Component {
  render() {
    return (
      <Container>
        <LoginTitle>Login</LoginTitle>
        <ButtonContainer>
          <Button
            facebook
            href="/auth/facebook"
            className="waves-effect btn deep-purple darken-3"
          >
            Facebook
          </Button>
          <Button
            google
            href="/auth/google"
            className="waves-effect btn blue darken-2"
          >
            Google
          </Button>
        </ButtonContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 15px;
  text-align: center;
`;

const LoginTitle = styled.h1`
  color: ${props => props.theme.dark};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const Button = styled.a`
  margin-left: ${props => (props.google ? "15px" : 0)};
`;

export default Login;
