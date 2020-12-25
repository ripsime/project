import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

// Components
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
// Actions
import * as dashboardActions from './dashboardActions';
import * as sensorActions from '../shared/sensorActions';
// Services
import {
	getLayoutService,
	updateLayoutService,
	addItemService,
	deleteLayoutService,
	addSocketListenerService,
} from './dashboardService';

import {
	getSensorsService
} from '../shared/sensorService'

import AddItemPopup from '../../components/addItemPopup/AddItemPopup';

import "./dashboard.less";

class Dashboard extends Component {
	state = {
		isAddItemPopUp: false,
		socketListenersAdded: false,
	}

	componentDidMount() {
		getLayoutService(this.props.get_layout);
		getSensorsService(this.props.get_sensors);
	}

	componentDidUpdate() {
		if (this.props.loading) {
			getLayoutService(this.props.get_layout);
			getSensorsService(this.props.get_sensors);
		}
		else if (!this.state.socketListenersAdded && this.props.layout.length) {
			_.map(this.props.layout, (el) => addSocketListenerService(this.props.add_socket_listener, el.sensor, el.metric, this.props.get_chart_data));
			this.setState({ socketListenersAdded: true });
		}
	}

	updateLayout = (layout) => {
		updateLayoutService(this.props.update_layout, layout);
	};

	deleteLayout = (_id) => {
		deleteLayoutService(this.props.delete_layout, _id);
	};

	openAddItemPopup = () => {
		this.setState({ isAddItemPopUp: true })
	};

	additem = (data) => {
		this.setState({ isAddItemPopUp: false })
		addItemService(this.props.add_item, data);
		addSocketListenerService(this.props.add_socket_listener, data.sensor, data.metric);
	};

	cancelAddItem = () => {
		this.setState({ isAddItemPopUp: false })
	};

	render() {
		return (
			<React.Fragment>
				<div className="title">Dashboard</div>
				<button onClick={this.openAddItemPopup} className="addButton">
					<i className="fa fa-plus"></i>
					Add Item
				</button>
				<Modal>
					{this.state.isAddItemPopUp &&
						<AddItemPopup
							sensors={this.props.sensors}
							addItem={this.additem}
							cancelAddItem={this.cancelAddItem}
						/>
					}
				</Modal>
				<div>
					<Layout
						layout={this.props.layout}
						data={this.props.data}
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
		data: state.dashboard.data,
		sensors: state.dashboard.sensors,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, dashboardActions, sensorActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
