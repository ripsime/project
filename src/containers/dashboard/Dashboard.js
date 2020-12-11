import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Components
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
// Actions
import * as dashboardActions from './dashboardActions';
// Services
import {
	getLayoutService,
	updateLayoutService,
	addItemService,
	deleteLayoutService,
	getSensorsService,
} from './dashboardService';

import AddItemPopup from '../../components/addItemPopup/AddItemPopup';

class Dashboard extends Component {
	state = {
		isAddItemPopUp: false
	}
	componentDidMount() {
		getLayoutService(this.props.get_layout);
		getSensorsService(this.props.get_sensors);
	}

	componentDidUpdate() {
		if (this.props.loading) {
			console.log("updating")
			getLayoutService(this.props.get_layout);
		}
	}

	updateLayout = (layout) => {
		updateLayoutService(this.props.update_layout, layout);
	};

	deleteLayout = (_id) => {
		deleteLayoutService(this.props.delete_layout, _id);
		//TODO
		getLayoutService(this.props.get_layout);
	};

	openAddItemPopup = () => {
		this.setState({ isAddItemPopUp: true })
	};

	additem = (data) => {
		this.setState({ isAddItemPopUp: false })
		addItemService(this.props.add_item, data);
	};

	cancelAddItem = () => {
		this.setState({ isAddItemPopUp: false })
	};

	render() {
		return (
			<React.Fragment>
				<div>Dashboard</div>
				<button onClick={this.openAddItemPopup}>Add Item</button>
				<Modal>
					{this.state.isAddItemPopUp &&
						<AddItemPopup
							addItem={this.additem}
							cancelAddItem={this.cancelAddItem}
						/>
					}
				</Modal>
				<div>
					<Layout
						layout={this.props.layout}
						updateLayout={this.updateLayout}
						deleteLayout={this.deleteLayout}
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
