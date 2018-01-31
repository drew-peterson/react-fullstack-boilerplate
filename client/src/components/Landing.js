import React from "react";
import styled from "styled-components";

const Landing = () => {
  const Landing = styled.div`
    text-align: center;
    color: ${props => props.theme.main};
    background-color: ${props => props.theme.white};
  `;

  return (
    <Landing>
      <h1>Landing Page here</h1>
    </Landing>
  );
};

export default Landing;
