export const GET_LAYOUT = 'GET_LAYOUT';
export const ADD_ITEM = 'ADD_ITEM';
export const SET_LAYOUT = 'SET_LAYOUT';

export function get_layout(payload) {
	return {
		type: GET_LAYOUT,
		payload,
	};
}

export function add_item(payload) {
	return {
		type: ADD_ITEM,
		payload,
	};
}

export function set_layout(payload) {
	return {
		type: SET_LAYOUT,
		payload,
	};
}
