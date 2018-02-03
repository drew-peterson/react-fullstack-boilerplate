import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Landing = props => {
  const { auth } = props;

  const renderLoggedInContent = () => {
    if (auth) {
      return (
        <div>
          <WelcomeTitle>
            Welcome back: {auth.firstName} {auth.lastName}
          </WelcomeTitle>
        </div>
      );
    }
  };

  return (
    <Container>
      <h1>Landing Page here</h1>
      {renderLoggedInContent()}
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  color: ${props => props.theme.main};
  background-color: ${props => props.theme.white};
  padding: 15px;
`;

const WelcomeTitle = styled.h2`
  font-size: 1.2rem;
  margin-top: 10px;
`;

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Landing);
