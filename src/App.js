import React, { useCallback, useState } from 'react';
import './app.css';
import { Filters, RadiusSelector, StationDetails } from './components';
import { useFetchStations, useFetchCurrentLocation } from './services';
import { FILTER_OPTIONS, RADIUS_OPTIONS } from './constants';

/* values from FILTER_OPTIONS and RADIUS_OPTIONS 
can be customized or used according to the particular 
section requirement. Here we are using all of them.
*/
const filterOptions = Object.values(FILTER_OPTIONS);
const radiusOptions = Object.values(RADIUS_OPTIONS);

const App = () => {
	const currLocation = useFetchCurrentLocation();
	const [radius, setRadius] = useState(RADIUS_OPTIONS[5].value); // default radius 5 miles
	const [filters, setFilters] = useState({
		[FILTER_OPTIONS.IS_24_HOURS.value]: false,
		[FILTER_OPTIONS.CONVENIENCE_STORE.value]: false,
		[FILTER_OPTIONS.SERVES_HOT_FOOD.value]: false,
		[FILTER_OPTIONS.ACCEPTS_FUEL_CARDS.value]: false,
	});
	const [selectedStation, setSelectedStation] = useState(null); // For tracking the selected station
	const { stations, isLoading, error } = useFetchStations(
		radius,
		filters,
		currLocation
	);

	const handleFilterChange = useCallback(
		(filterName, value) => {
			setFilters({ ...filters, [filterName]: value });
		},
		[filters]
	);

	const handleRadiusChange = useCallback((value) => {
		setRadius(value);
	}, []);

	const handleStationSelect = useCallback((station) => {
		setSelectedStation(station);
	}, []);

	return (
		<div className='app'>
			<h1 className='app__heading'>BP Station Finder</h1>
			<RadiusSelector
				radiusOptions={radiusOptions}
				radius={radius}
				onRadiusChange={handleRadiusChange}
			/>
			<Filters
				filterOptions={filterOptions}
				filters={filters}
				onFilterChange={handleFilterChange}
			/>
			<div className='app__station-details'>
				{isLoading && (
					<div className='app__station-details--loading'>Loading...</div>
				)}
				{error && <div className='app__station-details--error'>{error}</div>}
				{stations && (
					<StationDetails
						currLocation={currLocation}
						stations={stations}
						selectedStation={selectedStation}
						handleStationSelect={handleStationSelect}
					/>
				)}
			</div>
		</div>
	);
};

export default App;
