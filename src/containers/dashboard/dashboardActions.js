export const GET_LAYOUT = 'GET_LAYOUT';
export const ADD_ITEM = 'ADD_ITEM';
export const SET_LAYOUT = 'SET_LAYOUT';
export const UPDATE_LAYOUT = 'UPDATE_LAYOUT';
export const DELETE_LAYOUT = 'DELETE_LAYOUT';
export const GET_SENSORS = 'GET_SENSORS';
export const ADD_SOCKET_LISTENER = 'ADD_SOCKET_LISTENER';
export const GET_CHART_DATA = 'GET_CHART_DATA';

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

export function update_layout(payload) {
	return {
		type: UPDATE_LAYOUT,
		payload,
	};
}

export function delete_layout(payload) {
	return {
		type: DELETE_LAYOUT,
		payload,
	};
}

export function add_socket_listener() {
	return {
		type: ADD_SOCKET_LISTENER,
	}
}

export function get_chart_data(payload) {
	return {
		type: GET_CHART_DATA,
		payload,
	}
}