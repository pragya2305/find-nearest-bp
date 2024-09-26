import React, { memo } from 'react';
import './station-list.css';

const StationList = ({ stations, selectedStation, onStationSelect }) => {
	return (
		<ul className='station-list'>
			{stations.length === 0 ? (
				<li>No stations found.</li>
			) : (
				stations.map((station) => (
					<li
						key={station.id}
						className={
							selectedStation && selectedStation.id === station.id
								? 'selected'
								: ''
						}
						onClick={() => onStationSelect(station)}
					>
						<strong>{station.name}</strong>
						<span>{station.distance} miles away</span>
					</li>
				))
			)}
		</ul>
	);
};

export default memo(StationList);
