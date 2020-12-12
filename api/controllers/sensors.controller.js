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