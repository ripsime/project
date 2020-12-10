import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import PROPERTY from "../../../property";
import _ from 'lodash';

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
} from './dashboardService';

import AddItemPopup from '../../components/addItemPopup/AddItemPopup';

import "./dashboard.less";

class Dashboard extends Component {
	state={
		isAddItemPopUp:false,
		data: {},
		socketListenersAdded: false,
	}
	componentDidMount() {
		getLayoutService(this.props.get_layout);
	}

	componentDidUpdate() {
		if (this.props.loading) {
			getLayoutService(this.props.get_layout);
		}

		if(!this.state.socketListenersAdded){
			_.map(this.props.layout, (el) => this.addSocketListener(el.sensor, el.metric));
			this.setState({socketListenersAdded: true})
		}
	}

	updateLayout = (layout) => {
		updateLayoutService(this.props.update_layout, layout);
	};

	deleteLayout = (_id) => {
		deleteLayoutService(this.props.delete_layout, _id);
	};

	openAddItemPopup = () => {
		this.setState({isAddItemPopUp:true})
	};	

	addSocketListener = (sensor, metric) => {
		const socket = socketIOClient(`http://${PROPERTY.host}:${PROPERTY.port}`);
		
		var key = `${sensor}_${metric}`;

		socket.emit('join', key);
		socket.on("outgoing", resp => {
			let baseTime = new Date().getTime();			
			let val = {
				time: new Date(baseTime),
				value: resp.data.value,
			};            
			let existingData = this.state.data[key] || [];
			if(existingData.length >= 10){
				existingData = existingData.slice(1);
			}
			existingData.push(val)
	
			let copiedData = this.state.data;
			copiedData[key] = existingData;

			this.setState({data: copiedData});
		});
	}

	additem = (data) => {
		this.setState({isAddItemPopUp:false})
		addItemService(this.props.add_item, data);
		this.addSocketListener(data.sensor, data.metric);
	};

	cancelAddItem = () => {
		this.setState({isAddItemPopUp:false})
	};

	render() {
		return (
			<React.Fragment>
				<div className="dashboard-title">Dashboard</div>		
				<button onClick={this.openAddItemPopup} className="addButton">
					<i className="fa fa-plus"></i>
					Add Item
				</button>
				<Modal>
					{ this.state.isAddItemPopUp && 
						<AddItemPopup 
							addItem={this.additem} 
							cancelAddItem={this.cancelAddItem}
						/>
					}						
				</Modal>				
				<div>
					<Layout
						layout={this.props.layout}
						data={this.state.data}
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
