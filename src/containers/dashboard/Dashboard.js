import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Components
import Layout from '../../components/layout/Layout';
// Actions
import * as dashboardActions from './dashboardActions';
// Services
import {
	getLayoutService,
	updateLayoutService,
	addItemService,
} from './dashboardService';

class Dashboard extends Component {
	componentDidMount() {
		getLayoutService(this.props.get_layout);
	}

	componentDidUpdate() {
		if (this.props.loading) {
			console.log("updating")
			getLayoutService(this.props.get_layout);
		}
	}

	updateLayout = () => {
		console.log("this.props: ", this.props)
		updateLayoutService(this.props.update_layout, this.props.layout );
	};

	deleteLayout = () => {
		setLayoutService(this.props.delete_layout);
	};

	addItem = () => {
		addItemService(this.props.add_item);
	};

	render() {
		return (
			<React.Fragment>
				<div>Dashboard</div>				
				<div>
					<button onClick={this.addItem}>Add Item</button>
					<Layout
						layout={this.props.layout}
						updateLayout={this.updateLayout}
					/>
				</div>
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
