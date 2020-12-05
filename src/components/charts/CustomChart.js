import React, { Component } from 'react';
import Chart from 'chart.js';

class CustomChart extends Component {
	constructor(props) {
		super(props);
		this.customChartRef = React.createRef();
	}

	componentDidMount() {
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
				labels: this.props.data.map(d => d.time),
				datasets: [{
					label: this.props.title,
					data: this.props.data.map(d => d.value),
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
		this.customChart.data.labels = this.props.data.map(d => d.time);
		this.customChart.data.datasets[0].data = this.props.data.map(d => d.value);
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