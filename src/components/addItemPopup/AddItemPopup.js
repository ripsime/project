import React, { Component, createRef } from "react";

import "./addItemPopup.less";

const TYPE = ["line", "bar"];
const METRIC = ["1", "2"];
const SENSOR = ["1", "2"];

class AddItemPopup extends Component {
  nameRef = createRef();
  typeRef = createRef();
  metricRef = createRef();
  sensorRef = createRef();

  sendData = () => {
    this.props.addItem({
      name: this.nameRef.current.value,
      type: this.typeRef.current.value,
      metric: this.metricRef.current.value,
      sensor: this.sensorRef.current.value,
    });
  };

  render() {
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
            <div className="metric">
              <label htmlFor="fmetric">Metric</label>
              <select name="" id="fmetric" ref={this.metricRef}>
                {METRIC.map((v, i) => (
                  <option value={v} key={i}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="sensor">
              <label htmlFor="fsensor">Sensor</label>
              <select name="" id="fsensor" ref={this.sensorRef}>
                {SENSOR.map((v, i) => (
                  <option value={v} key={i}>
                    {v}
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
