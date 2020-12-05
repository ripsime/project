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
	deleteLayoutService,
} from './dashboardService';

import AddItemPopup from '../../components/addItemPopup/AddItemPopup';

import "./dashboard.less";

class Dashboard extends Component {
	state={
		isAddItemPopUp:false
	}
	componentDidMount() {
		getLayoutService(this.props.get_layout);
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
		this.setState({isAddItemPopUp:true})
	};	

	additem = (data) => {
		addItemService(this.props.add_item, data);
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
				<div>
					{this.state.isAddItemPopUp && <AddItemPopup addItem={this.additem} cancelAddItem={this.cancelAddItem}/>}
					<Layout
						layout={this.props.layout}
						// addItem={this.openAddItemPopup}
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
