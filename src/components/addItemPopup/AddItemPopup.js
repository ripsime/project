import React, { Component, createRef } from "react";

import "./addItemPopup.less";

const TYPE = ["line", "bar", "thermometer"];
const METRIC = ["1", "2"];

class AddItemPopup extends Component {
	state = {
		sensor: null,
		metric: null,
	};

	nameRef = createRef();
	typeRef = createRef();
	metricRef = createRef();

	sendData = () => {
		this.props.addItem({
			name: this.nameRef.current.value,
			type: this.typeRef.current.value,
			metric: this.metricRef.current.value,
			sensor: this.state.sensor,
		});
	};

	setSensor = (event) => {
		this.setState({ sensor: event.target.value });
	}

	render() {
		const { sensors } = this.props;

		return (
			<div className="modalPopup">
				<div className="addItemPopup">
					<form>
						<div className="name">
							<label htmlFor="fname">Name</label>
							<input id="fname" type="text" ref={this.nameRef} />
						</div>
						<div className="type">
							<label htmlFor="ftype">Type</label>
							<select name="" id="ftype" ref={this.typeRef}>
								{TYPE.map((v, i) => (
									<option value={v} key={i}>
										{v}
									</option>
								))}
							</select>
						</div>
						<div className="sensor">
							<label>Sensor</label>
							<select value={this.state.sensor} onChange={this.setSensor}>
								{sensors.map((item) => (
									<option value={item.sensorId} key={item.sensorId}>
										{item.name}
									</option>
								))}
							</select>
						</div>
						<div className="metric">
							<label htmlFor="fmetric">Metric</label>
							<select name="" id="fmetric" ref={this.metricRef}>
								{METRIC.map((v, i) => (
									<option value={v.sensorId} key={i}>
										{v.name}
									</option>
								))}
							</select>
						</div>
					</form>
					<div className="buttons">
						<button className="add" onClick={this.sendData}>
							Add
            			</button>
						<button className="cancel" onClick={this.props.cancelAddItem}>
							Cancel
            			</button>
					</div>
				</div>
			</div>
		);
	}
}

export default AddItemPopup;