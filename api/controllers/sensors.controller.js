const Client = require('../modules/client');

// Get Sensors
exports.get = (req, res) => {
	console.log('Get Sensors');

	const client = new Client();
	client.connect();
	client.getSensors().then(
		(result) => {
			return res.send(result);
		},
		(error) => {
			return res.send([]);
		});
};

exports.getMetricInfo = (req, res) => {
	console.log('Get Metric Info');

	const sensorId = req.query.sensorId;
	const metricId = req.query.metricId;

	const client = new Client();
	client.connect();
	client.getMetricInfo(sensorId, metricId).then(
		(result) => {
			return res.send(result);
		},
		(error) => {
			return res.send([]);
		});
};