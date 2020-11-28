import React, { Component } from 'react';
import Chart from 'chart.js';

class BarChart extends Component {
	constructor(props) {
		super(props);
		this.barChartRef = React.createRef()
	}

	componentDidMount() {
		this.barChart = new Chart(this.barChartRef.current, {
			type: 'bar',
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
					backgroundColor: this.props.color,
					borderColor: this.props.color,
					borderSkipped: this.props.borderSkipped,
					borderWidth: this.props.borderWidth,
					hoverBackgroundColor: this.props.hoverBackgroundColor,
					hoverBorderColor: this.props.hoverBorderColor,
					hoverBorderWidth: this.props.hoverBorderWidth,
        			minBarLength: this.props.minBarLength,
				}]
			}
		});
	}

	componentDidUpdate() {
		this.barChart.data.labels = this.props.data.map(d => d.time);
		this.barChart.data.datasets[0].data = this.props.data.map(d => d.value);
		this.barChart.update();
	}

	render() {		
		return (
			<div>
				<canvas ref={this.barChartRef} />
			</div>
		);
	}
}

export default BarChart;