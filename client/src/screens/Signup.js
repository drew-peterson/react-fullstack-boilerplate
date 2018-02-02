import React, { Component } from "react";
import styled from "styled-components";

import SignupForm from "../components/auth/SignupForm";

class Signup extends Component {
  render() {
    return (
      <Container>
        <Title>Oauth Signup</Title>
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

        <hr style={{ marginTop: "20px", marginBottom: "20px" }} />

        <div className="row">
          <div className="col s12 m8 offset-m2">
            <div className="card blue-grey darken-1 ">
              <div className="card-content white-text">
                <span className="card-title">Signup</span>
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 15px;
  text-align: center;
`;

const Title = styled.h1`
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

export default Signup;
