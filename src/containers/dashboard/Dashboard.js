import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Components
import Layout from '../../components/Layout';
// Actions
import * as dashboardActions from './dashboardActions';
// Services
import {
	getLayoutService,
	setLayoutService,
	addItemService,
} from './dashboardService';

class Dashboard extends Component {
	componentDidMount() {
		getLayoutService(this.props.get_layout);
	}

	componentDidUpdate() {
		if (this.props.loading) {
			getLayoutService(this.props.get_layout);
		}
	}

	setLayout = () => {
		setLayoutService(this.props.set_layout);
	};

	addItem = () => {
		addItemService(this.props.add_item);
	};

	render() {
		return (
			<React.Fragment>
				<div>Dashboard</div>
				<Layout
					layout={this.props.layout}
					addItem={this.addItem}
					setLayout={this.setLayout}
				/>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		layout: state.dashboard.layout,
		loading: state.dashboard.loading,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(dashboardActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
