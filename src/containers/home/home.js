import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import DataTable from "react-data-table-component"

// Actions
import * as sensorActions from '../shared/sensorActions';
// Services
import {
	getSensorsService
} from '../shared/sensorService'

import './home.less';

class Home extends Component {
	state = {
		sensorTableColumns: [
			{
				name: "Name",
				selector: "name",
				maxWidth: "300px",
			},
			{
				name: "Sensor ID",
				selector: "id",
				maxWidth: "500px",
			},
		],
		metricTableColumns: [
			{
				name: "Metric name",
				selector: "name",
			},
			{
				name: "Metric ID",
				selector: "id",
			},
			{
				name: "Value type",
				selector: "valueType",
			},
		]
	}

	componentDidMount() {
		getSensorsService(this.props.get_sensors);
	}

	componentDidUpdate() {
		if (this.props.loading) {
			getSensorsService(this.props.get_sensors);
		}
		console.log(this.props.sensors);
	}

	render() {
		var sensorsData = _.map(this.props.sensors,
			(sensor) => ({
				name: sensor.name,
				id: sensor.sensorId,
				metrics: _.map(sensor.metrics, (metric) => ({ name: metric.name, id: metric.metricId, valueType: metric.valueType }))
			})
		);

		const ExpandableComponent = ({ data }) =>
			<div style={{margin: "10px 0 10px 50px"}}>
				<DataTable
					noHeader={true}
					columns={this.state.metricTableColumns}
					data={data.metrics}
					highlightOnHover={true}
					striped={true}
				/>
			</div>;

		return (
			<React.Fragment>
				<div className="title">Sensors</div>
				<div style={{ maxWidth: "800px" }}>
					<DataTable
						noHeader={true}
						columns={this.state.sensorTableColumns}
						data={sensorsData}
						highlightOnHover={true}
						striped={true}
						expandableRows={true}
						expandableRowsComponent={<ExpandableComponent />}
					/>
				</div>
			</React.Fragment>
		)
	}
}

function mapStateToProps(state) {
	return {
		loading: state.home.loading,
		sensors: state.home.sensors,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(sensorActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);