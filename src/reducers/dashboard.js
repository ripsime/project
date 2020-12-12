import {
	GET_LAYOUT,
	UPDATE_LAYOUT,
	ADD_ITEM,
	DELETE_LAYOUT,
	GET_SENSORS,
} from '../containers/dashboard/dashboardActions';

const initialState = {
	layout: [],
	loading: false,
	sensors: [],
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
				senors: action.payload.data,
			};
		}
		default:
			return state;
	}
}

export default dashboard;
