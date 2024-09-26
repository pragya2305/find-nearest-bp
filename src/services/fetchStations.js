import { useEffect, useState } from 'react';
import { getStations } from './api';

const useFetchStations = (radius, filters, location) => {
	const [isLoading, setIsLoading] = useState(false);
	const [stations, setStations] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			setError(null);
			try {
				const stations = await getStations(location);
				const filteredStations = stations.filter((station) => {
					return (
						station.distance <= radius &&
						(!filters.is24Hours || station.is24Hours) &&
						(!filters.hasConvenienceStore || station.hasConvenienceStore) &&
						(!filters.servesHotFood || station.servesHotFood) &&
						(!filters.acceptsFuelCards || station.acceptsFuelCards)
					);
				});
				setStations(filteredStations);
			} catch (error) {
				setError('Something went wrong. Please try again.');
			} finally {
				setIsLoading(false);
			}
		})();
	}, [radius, filters, location]);

	return { stations, isLoading, error };
};

export default useFetchStations;
