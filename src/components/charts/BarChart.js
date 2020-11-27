import React, { Component } from 'react';
import Chart from 'chart.js';
import ReactResizeDetector from 'react-resize-detector';

class BarChart extends Component {
	constructor(props) {
		super(props);
		this.barChartRef = React.createRef();

		this.state = {
			height: 100,
			width: 100,
		};
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

	updateSizes = (width, height) => {
		this.setState({ width, height })
	}

	render() {
		const style = { width: this.state.width, height: this.state.height };

		return (
			<div style={{ width: '100%' }}>
				<div style={style}>
					<canvas ref={this.barChartRef} style={style} />
				</div>

				<ReactResizeDetector handleHeight handleWidth onResize={this.updateSizes} />
			</div>
		);
	}
}

export default BarChart;