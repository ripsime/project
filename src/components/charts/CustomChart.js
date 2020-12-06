import React, { Component } from 'react';
import Chart from 'chart.js';
import socketIOClient from "socket.io-client";
import PROPERTY from "../../../property";

class CustomChart extends Component {
	state = {
		data: []
	};

	constructor(props) {
		super(props);
		this.customChartRef = React.createRef();
	}

	addListener = (sensor, metric) => {
		const socket = socketIOClient(`http://${PROPERTY.host}:${PROPERTY.port}`);

		socket.emit('join', `${sensor}_${metric}`);
		socket.on("outgoing", resp => {
			let baseTime = new Date().getTime();			
			var val = {
				time: new Date(baseTime),
				value: resp.data.value,
			};

			let existingData = this.state.data;
			if(existingData.length >= 10)
				existingData.pop();

			this.setState({data: [val, ...existingData]})
		});
	}

	componentDidMount() {
		this.addListener(this.props.sensor, this.props.metric);

		Chart.defaults.global.animation.duration = 10;
		this.customChart = new Chart(this.customChartRef.current, {
			type: this.props.type,
			options: {
				scales: {
					xAxes: [
						{
							type: 'time',
							// time: {
							// 	unit: 'week'
							// }
						}
					],
					yAxes: [
						{
							ticks: {
								min: 0
							}
						}
					]
				}
			},
			data: {
				labels: this.state.data.map(d => d.time),
				datasets: [{
					label: this.props.title,
					data: this.state.data.map(d => d.value),
					backgroundColor: this.props.color,
					pointRadius: 1,
					borderColor: this.props.color,
					borderWidth: 1,
					//Line options
					fill: 'none',
					lineTension: 0,
					//Bar options
					borderSkipped: this.props.borderSkipped,
					hoverBackgroundColor: this.props.hoverBackgroundColor,
					hoverBorderColor: this.props.hoverBorderColor,
					hoverBorderWidth: this.props.hoverBorderWidth,
        			minBarLength: this.props.minBarLength,
				}]
			}
		});
	}

	componentDidUpdate() {
		this.customChart.data.labels = this.state.data.map(d => d.time);
		this.customChart.data.datasets[0].data = this.state.data.map(d => d.value);
		this.customChart.update();
	}

	updateSizes = (width, height) => {
		this.setState({ width, height })
	}

	render() {
		return (			
			<div>
				<canvas ref={this.customChartRef} />
			</div>
		);
	}
}

export default CustomChart;