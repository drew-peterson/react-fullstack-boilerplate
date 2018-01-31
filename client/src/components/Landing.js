import React from 'react';
import styled from 'styled-components';

const Landing = () => {
	const Landing = styled.div`
		text-align: center;
		color: ${props => props.theme.main};
		background-color: ${props => props.theme.dark};
	`;

	return (
		<Landing>
			<h1>Emaily!</h1>
			collect feedback from your users
		</Landing>
	);
};

export default Landing;
