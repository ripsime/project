import socketIOClient from "socket.io-client";
import PROPERTY from "../../property";

export default class SocketHandler {
	constructor() {
		this.chartData = {};
	}

	addSocketListener = (sensor, metric, onDataReceived) => {
		const socket = socketIOClient(`http://${PROPERTY.host}:${PROPERTY.port}`);

		var key = `${sensor}_${metric}`;

		socket.emit('join', key);
		socket.on("outgoing", resp => {
			let baseTime = new Date().getTime();
			let val = {
				time: new Date(baseTime),
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