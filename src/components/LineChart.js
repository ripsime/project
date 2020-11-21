import React, { Component } from 'react';
import Chart from 'chart.js';
import ReactResizeDetector from 'react-resize-detector';

class LineChart extends Component {
	constructor(props) {
		super(props);
		this.lineChartRef = React.createRef();

		this.state = {
			height: 100,
			width: 100,
		};
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

	updateSizes = (width, height) => {
		this.setState({ width, height })
	}

	render() {
		const style = { width: this.state.width, height: this.state.height };

		return (
			<div style={{ width: '100%' }}>
				<div style={style}>
					<canvas ref={this.lineChartRef} style={style} />
				</div>

				<ReactResizeDetector handleHeight handleWidth onResize={this.updateSizes} />
			</div>
		);
	}
}

export default LineChart;