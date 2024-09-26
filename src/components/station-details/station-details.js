import React, { memo } from 'react';
import './station-details.css';
import StationList from '../station-list';
import StationMap from '../station-map';

const StationDetails = ({
	stations,
	selectedStation,
	handleStationSelect,
	currLocation,
}) => {
	return (
		<div className='stations-details'>
			<StationList
				stations={stations}
				selectedStation={selectedStation}
				onStationSelect={handleStationSelect}
			/>
			<StationMap
				currLocation={currLocation}
				stations={stations}
				selectedStation={selectedStation}
				onStationSelect={handleStationSelect}
			/>
		</div>
	);
};

export default memo(StationDetails);
