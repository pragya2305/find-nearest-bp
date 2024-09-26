import { useState, useEffect } from 'react';

const useFetchCurrentLocation = () => {
	const [location, setLocation] = useState({
		latitude: 51.505,
		longitude: -0.09,
	}); // setting some default location

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				setLocation({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
			});
		} else {
			console.log('Geolocation is not available in your browser.');
		}
	}, []);

	return location;
};
export default useFetchCurrentLocation;
