module.exports = (app) => {
	const layout = require('../controllers/layout.controller.js');

	// Get Layout
	app.get('/layout', layout.get);

	// Set Layout
	//app.post('/layout', layout.update);

	// Update item
	app.put('/layout', layout.update);

	// Delete item
	app.delete('/layout', layout.delete);

	// Add item
	app.post('/item', layout.add);



};
