import {
	GET_LAYOUT,
	UPDATE_LAYOUT,
	ADD_ITEM,
	DELETE_LAYOUT,
	GET_SENSORS,
	ADD_SOCKET_LISTENER,
	GET_CHART_DATA,
} from '../containers/dashboard/dashboardActions';

const initialState = {
	layout: [],
	loading: false,
	sensors: [],
	data: {},
};

function dashboard(state = initialState, action) {
	switch (action.type) {
		case GET_LAYOUT: {
			return {
				...state,
				loading: false,
				layout: action.payload.data,
			};
		}
		case ADD_ITEM: {
			return {
				...state,
				loading: true,
			};
		}
		case UPDATE_LAYOUT: {
			return {
				...state,
				loading: true,
				layout: action.payload.layout,
			};
		}
		case DELETE_LAYOUT: {
			return {
				...state,
				loading: true,
				layout: action.payload.layout,
			}
		}
		case GET_SENSORS: {
			return {
				...state,
				sensors: action.payload.data,
			};
		}
		case ADD_SOCKET_LISTENER: {
			return {
				...state,
			};
		}
		case GET_CHART_DATA: {
			return {
				...state,
				data: action.payload.data,
			};
		}
		default:
			return state;
	}
}

export default dashboard;
