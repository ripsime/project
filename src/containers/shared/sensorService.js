import axios from 'axios';
import PROPERTY from '../../../property'

const APIUrl = `http://${PROPERTY.host}:${PROPERTY.port}`;

export const getSensorsService = (callback) => {
	axios.get(`${APIUrl}/sensors`).then(
		(result) => {
			callback(result);
			console.log(result);
		},
		(error) => {
			console.log(`Error - ${error}`);
		}
	);
};

export const getMetricInfoService = (sensorId, metricId, callback) => {
	axios.get(`${APIUrl}/metricInfo?sensorId=${sensorId}&metricId=${metricId}`).then(
		(result) => {
			callback(result);
		},
		(error) => {
			console.log(`Error - ${error}`);
		}
	);
};