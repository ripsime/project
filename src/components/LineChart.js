import React, { Component } from 'react';
import Chart from 'chart.js';

class LineChart extends Component {
	constructor(props) {
		super(props);
		this.lineChartRef = React.createRef();
	}

	componentDidMount() {
		this.lineChart = new Chart(this.lineChartRef.current, {
			type: 'line',
			options: {
				scales: {
					xAxes: [
						{
							type: 'time',
							time: {
								unit: 'week'
							}
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
				labels: this.props.data.map(d => d.time),
				datasets: [{
					label: this.props.title,
					data: this.props.data.map(d => d.value),
					fill: 'none',
					backgroundColor: this.props.color,
					pointRadius: 1,
					borderColor: this.props.color,
					borderWidth: 1,
					lineTension: 0
				}]
			}
		});
	}

	componentDidUpdate() {
		this.lineChart.data.labels = this.props.data.map(d => d.time);
		this.lineChart.data.datasets[0].data = this.props.data.map(d => d.value);
		this.lineChart.update();
	}

	render() {
		return (
			<canvas ref={this.lineChartRef} />
		);
	}
}

export default LineChart;