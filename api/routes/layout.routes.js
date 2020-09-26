module.exports = (app) => {
	const layout = require('../controllers/layout.controller.js');

	// Get Layout
	app.get('/layout', layout.get);

	// Add item
	app.post('/layout', layout.add);

	// TODO add route for layout
};
