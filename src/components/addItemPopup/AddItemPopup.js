import React, { Component, createRef } from "react";

import "./addItemPopup.less";

const TYPE = ["line", "bar", "thermometer"];

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
		const metrics = this.state.sensor ? _.find(sensors, s => s.sensorId == this.state.sensor).metrics : [];

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
							<select onChange={this.setSensor}>
									<option key={0}></option>
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
								{metrics.map((v) => (
									<option value={v.metricId} key={v.metricId}>
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