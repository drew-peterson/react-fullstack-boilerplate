import React from 'react';
import { Transition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// border: ${({ dateSent }) => {
// 	!dateSent ? '2px solid blue' : null;
// }};
const SurveyListCard = styled.div`
	margin-top: 15px;
	opacity: 0;
	transition: 500ms all ease-in-out;
	border: ${props => (!props.dateSent ? '2px solid blue' : '')};
	${({ status }) => {
		switch (status) {
			case 'entering':
				return { opacity: 0, transform: 'translateX(50%)' };
			case 'entered':
				return { opacity: 1, transform: 'translateX(0)' };
			case 'exiting':
				return { opacity: 0, transform: 'translateX(-50%)' };
			default:
				return;
		}
	}};
`;

export default props => {
	// have to pass all props to transition...
	// status is the state of hte transition passed to card
	const { survey, deleteSurvey } = props;
	return (
		<Transition
			{...props}
			timeout={{
				enter: 0,
				exit: 500
			}}
		>
			{status => (
				<SurveyListCard
					className="col s12 m6"
					status={status}
					dateSent={survey.dateSent}
				>
					<div className="card">
						<div className="card-image">
							<img
								className="responsive-img"
								src="https://media1.britannica.com/eb-media/72/143172-049-0FB95AC0.jpg"
								alt=""
							/>
							<span className="card-title">{survey.title}</span>
						</div>
						<div className="card-content valign-wrapper">
							<p className="col m3">{survey.body}</p>
							<p className="col m3 offset-m6">
								Sent on:<br />
								{new Date(survey.dateSent).toLocaleDateString()}
							</p>
						</div>
						{!survey.dateSent && (
							<div className="card-content valign-wrapper">
								<Link to={`/surveys/new?sId=${survey._id}`}>
									Edit draft
								</Link>
							</div>
						)}

						<div className="card-action valign-wrapper">
							<span className="col m3">Yes: {survey.yes}</span>
							<span className="col m3">No: {survey.no}</span>

							<button
								className="white-text red col m3 btn btn-flat offset-m3"
								onClick={() => deleteSurvey(survey._id)}
							>
								Delete
							</button>
						</div>
					</div>
				</SurveyListCard>
			)}
		</Transition>
	);
};
