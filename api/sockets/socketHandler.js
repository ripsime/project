import socketIOClient from "socket.io-client";
import PROPERTY from "../../property";

export default class SocketHandler {
	constructor() {
		this.chartData = {};
	}

	addSocketListener = (sensorId, metricId, onDataReceived) => {
		const socket = socketIOClient(`http://${PROPERTY.host}:${PROPERTY.port}`);

		var key = `${sensorId}_${metricId}`;
		socket.emit('join', key);
		
		socket.emit('subscribe', sensorId);

		socket.on("publish", resp => {
			let val = {
				time: new Date(resp.data.timestamp),
				value: resp.data.value,
			};
			let existingData = this.chartData[key] || [];
			if (existingData.length >= 10) {
				existingData = existingData.slice(1);
			}
			existingData.push(val)
			this.chartData[key] = existingData;

			onDataReceived({ data: Object.assign({}, this.chartData) });
		});
	}
}