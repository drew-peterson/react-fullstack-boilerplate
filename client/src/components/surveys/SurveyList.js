import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import SurveyListCard from './SurveyListCard';
import { TransitionGroup } from 'react-transition-group';

class SurveyList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: {
				date: false,
				title: '',
				body: ''
			},
			showFilter: true
		};
	}

	componentDidMount() {
		this.props.fetchSurveys(); // have to fetch all to update w/ webhook
	}

	updateFilter(event) {
		const { filter } = this.state;
		const target = event.target;
		const value =
			target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			filter: { ...filter, [name]: value }
		});
	}

	filterCb(data) {
		const { filter } = this.state;
		let a = true;
		let b = true;
		let c = true;
		if (filter.date) {
			a = data.dateSent;
		}
		if (filter.title) {
			b = data.title.includes(filter.title);
		}

		if (filter.body) {
			c = data.body.includes(filter.body);
		}
		return a && b && c;
	}

	renderSurveys() {
		const { surveys } = this.props;

		return _.chain(surveys)
			.filter(survey => this.filterCb(survey))
			.map(survey => {
				return (
					<SurveyListCard
						key={survey._id}
						survey={survey}
						{...this.props}
					/>
				);
			})
			.reverse()
			.value();
	}

	renderToggleBtn() {
		return (
			<button
				className="btn btn-flat blue white-text"
				onClick={() =>
					this.setState({
						showFilter: !this.state.showFilter
					})
				}
			>
				toggle filter
			</button>
		);
	}
	renderFilterform() {
		return (
			<form className="row valign-wrapper">
				<p className="col m4">
					<label>
						Title:
						<input
							name="title"
							type="text"
							value={this.state.filter.title}
							onChange={this.updateFilter.bind(this)}
						/>
					</label>
				</p>
				<p className="col m4">
					<label>
						Body:
						<input
							name="body"
							type="text"
							value={this.state.filter.body}
							onChange={this.updateFilter.bind(this)}
						/>
					</label>
				</p>
				<p className="col m4">
					<input
						id="date"
						type="checkbox"
						name="date"
						className="filled-in"
						checked={this.state.filter.date}
						onChange={this.updateFilter.bind(this)}
					/>
					<label htmlFor="date" className="filled-in-box">
						Exclude Draft
					</label>
				</p>
			</form>
		);
	}

	render() {
		// console.log('render....', this.state.filter);
		// for lists of transitions wrap in transition group....
		return (
			<div>
				{this.state.showFilter && this.renderFilterform()}
				{this.renderToggleBtn()}
				<TransitionGroup className="row">
					{this.renderSurveys()}
				</TransitionGroup>
			</div>
		);
	}
}

function mapStateToProps({ surveys }) {
	return { surveys: surveys.surveysById };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyList));
