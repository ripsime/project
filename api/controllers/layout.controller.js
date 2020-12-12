const Datastore = require('nedb');

const db = {};
db.layout = new Datastore({
	filename: './local_storage/layout.db',
	autoload: true,
	corruptAlertThreshold: 1
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

	const { layout } = req.body;
	const data = JSON.parse(layout)

	try {
		const response = {};
		for (let i in data) {
			let item = data[i]
			db.layout.insert({layout: item}, (err, docs) => {
				if (err) {
					/*Ignore*/
				} else {
					response[docs.layout.name] = docs._id
				}
			});
		}
		setTimeout(() => {

			db.layout.loadDatabase()

			return res.send({data: response});
		}, 100)
	} catch (e) {
		/*Ignore*/
	}
};

exports.update = (req, res) => {
	const { layout } = req.body;
	const data = layout

	try {
		let response = 0;
		for (let i in data) {
			let item = data[i]
			db.layout.update({_id: item.i}, {$set: {w: item.w, h: item.h, x: item.x, y: item.y}}, {}, (err, docs) => {
				if (err) {
					/*Ignore*/
					console.log(err)
				} else {
					++response
				}
			});
		}
		db.layout.loadDatabase()
		return res.send(200);
	} catch (e) {
		/*Ignore*/
	}
};

exports.delete = (req, res) => {
	const id = req.query.id;
	
	try {
		db.layout.remove({_id: id}, {}, (err, docs) => {
			if (err) {
				/*Ignore*/
			} else {
				return res.send({
					isSuccess: true,
				});
			}
		});		
	} catch (e) {
		/*Ignore*/
	}
};

// Add item
exports.add = (req, res) => {

	console.log('Add item');

	const layout = req.body;

	db.layout.insert(layout, () => {
		console.log('Added');
		return res.send({
			isSuccess: true,
		});
	});
};