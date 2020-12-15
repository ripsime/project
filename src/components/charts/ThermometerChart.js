import React, { Component } from 'react';
import Thermometer from './thermometer';

class ThermometerChart extends Component {
    render() {
        const style = { position: "relative", width: "100%", height: "100%" };
        return (
            <div style={style}>
                <span style={{color: "#4A4A4A", fontSize: "14px"}}>{this.props.title}</span>
                <Thermometer
                    width="100%"
                    height="100%"
                    steps={this.props.steps}
                    minValue={this.props.minValue}
                    maxValue={this.props.maxValue}
                    currentValue={this.props.currentValue + Math.abs(this.props.minValue)}
                />
            </div>
        );
    }
}

export default ThermometerChart;