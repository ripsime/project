export const GET_SENSORS = 'GET_SENSORS';

export function get_sensors(payload) {
	return {
		type: GET_SENSORS,
		payload,
	};
}
