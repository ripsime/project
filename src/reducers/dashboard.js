import {
	GET_LAYOUT,
	UPDATE_LAYOUT,
	ADD_ITEM,
	DELETE_LAYOUT,
} from '../containers/dashboard/dashboardActions';

const initialState = {
	layout: [],
	loading: false,
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
			};
		}
		default:
			return state;
	}
}

export default dashboard;
