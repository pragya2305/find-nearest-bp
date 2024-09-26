import mockStations from '../data/mockStations';

export const getStations = async (location) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(mockStations), 500);
	});
};
