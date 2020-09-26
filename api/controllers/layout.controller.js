const Datastore = require('nedb');

const db = {};
db.layout = new Datastore({
	filename: './local_storage/layout.db',
	autoload: true,
});

// Get Layout
exports.get = (req, res) => {
	console.log('Get layout');

	try {
		db.layout.find({}, (err, docs) => {
			console.log(docs);
			if (err) {
				/*Ignore*/
			} else {
				return res.send(docs);
			}
		});
	} catch (e) {
		/*Ignore*/
	}
};

// Set Layout
exports.set = (req, res) => {
	// TODO correct service work
	console.log('Set layout');
	const { layout } = req.body;
	try {
		db.layout.update({}, layout, {}, (err, docs) => {
			console.log(docs);
			if (err) {
				/*Ignore*/
			} else {
				return res.send(docs);
			}
		});
	} catch (e) {
		/*Ignore*/
	}
};

// Add item
exports.add = (req, res) => {
	console.log('Add item');

	const { layout } = req.body;

	db.layout.insert(layout, () => {
		console.log('Added');
		return res.send({
			isSuccess: true,
		});
	});
};
