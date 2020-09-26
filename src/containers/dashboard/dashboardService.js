import axios from 'axios';

export const getLayoutService = (callback) => {
	axios.get('http://localhost:3000/layout').then(
		(result) => {
			callback(result);
			console.log(result);
		},
		(error) => {
			console.log(`Error - ${error}`);
		}
	);
};

export const setLayoutService = (callback) => {
	axios.post('http://localhost:3000/layout').then(
		(result) => {
			callback(result);
			console.log(result);
		},
		(error) => {
			console.log(`Error - ${error}`);
		}
	);
};
// TODO resolve issue
export const addItemService = (callback) => {
	axios
		.post('http://localhost:3000/layout', {
			// TODO default layout to arrange side by side in empty spaces
			layout: {
				x: 0,
				y: 100000,
				w: 2,
				h: 2,
			},
		})
		.then(
			(result) => {
				if (result.data.isSuccess) {
					callback();
				}
			},
			(error) => {
				console.log(`Error - ${error}`);
			}
		);
};
