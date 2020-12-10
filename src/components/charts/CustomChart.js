import React, { Component } from 'react';
import Chart from 'chart.js';

class CustomChart extends Component {
	constructor(props) {
		super(props);
		this.customChartRef = React.createRef();
	}
	
	componentDidMount() {
		Chart.defaults.global.animation.duration = 10;
		this.customChart = new Chart(this.customChartRef.current, {
			type: this.props.type,
			options: {
				scales: {
					xAxes: [
						{
							type: 'time',
							ticks: {
								min: 0,
								maxTicksLimit: 10,
							},
							time: {
								unit: 'second',
								displayFormats: {
									second: 'h:mm:ss',
								},
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
				},				
				maintainAspectRatio: false,
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
					barThickness: 'flex',
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

	render() {
		const style = { position: "relative", width: "100%", height: "100%" };
		return (			
			<div style={style}>
				<canvas ref={this.customChartRef} />
			</div>
		);
	}
}

export default CustomChart;