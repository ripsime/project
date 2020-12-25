import {
	GET_SENSORS
} from '../containers/shared/sensorActions';

const initialState = {
	loading: false,
	sensors: [],
};

function home(state = initialState, action) {
	switch (action.type) {		
		case GET_SENSORS: {
			return {
				...state,
				sensors: action.payload.data,
			};
		}
		default:
			return state;
	}
}

export default home;
