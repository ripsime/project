module.exports = (app) => {
	const layout = require('../controllers/layout.controller.js');
	const sensors = require('../controllers/sensors.controller.js');

	// Get Layout
	app.get('/layout', layout.get);

	// Set Layout
	// app.post('/layout', layout.update);
	app.post('/layout', layout.set);

	// Update item
	app.put('/layout', layout.update);

	// Delete item
	app.delete('/layout', layout.delete);

	// Add item
	app.post('/item', layout.add);

	// Get Sensors
	app.get('/sensors', sensors.get);

	// Get Metric Info
	app.get('/metricInfo', sensors.getMetricInfo);
};
