import axios from 'axios';
import PROPERTY from '../../../property'

const APIUrl = `http://${PROPERTY.host}:${PROPERTY.port}`;

export const getLayoutService = (callback) => {
	axios.get(`${APIUrl}/layout`).then(
		(result) => {
			callback(result);
			console.log(result);
		},
		(error) => {
			console.log(`Error - ${error}`);
		}
	);
};

export const updateLayoutService = (callback, payload) => {
	console.log("payload: ", payload)
	axios.put(`${APIUrl}/layout`, {layout: payload} ).then(
		(result) => {
			callback(result);
			console.log(result);
		},
		(error) => {
			console.log(`Error - ${error}`);
		}
	);
};

export const deleteLayoutService = (callback, payload) => {
	axios.delete(`${APIUrl}/layout?id=` + payload).then(
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
export const addItemService = (callback, data) => {
	console.log(data)
	axios
		.post(`${APIUrl}/item`, {
			// TODO default layout to arrange side by side in empty spaces
			layout: {
				x: 0,
				y: 0,
				w: 5,
				h: 3,
			},
			...data
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
