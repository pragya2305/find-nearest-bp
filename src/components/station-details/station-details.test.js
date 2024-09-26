import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StationDetails from './station-details';

jest.mock('../station-list', () => {
	return ({ stations, selectedStation, onStationSelect }) => (
		<div data-testid='station-list'>
			{stations.map((station) => (
				<div
					key={station.id}
					data-testid={`station-item-${station.id}`}
					onClick={() => onStationSelect(station)}
				>
					{station.name}{' '}
					{selectedStation && selectedStation.id === station.id
						? '(selected)'
						: ''}
				</div>
			))}
		</div>
	);
});

jest.mock('../station-map', () => {
	return ({ stations, selectedStation, onStationSelect }) => (
		<div data-testid='station-map'>
			{stations.map((station) => (
				<div
					key={station.id}
					onClick={() => onStationSelect(station)}
				>
					{station.name} on map
				</div>
			))}
		</div>
	);
});

describe('StationDetails Component', () => {
	const stations = [
		{ id: '1', name: 'Station A' },
		{ id: '2', name: 'Station B' },
	];

	const handleStationSelectMock = jest.fn();

	beforeEach(() => {
		// Clear the mock before each test
		handleStationSelectMock.mockClear();
	});

	test('renders StationList and StationMap components', () => {
		render(
			<StationDetails
				stations={stations}
				selectedStation={null}
				handleStationSelect={handleStationSelectMock}
			/>
		);

		expect(screen.getByTestId('station-list')).toBeInTheDocument();
		expect(screen.getByTestId('station-map')).toBeInTheDocument();
	});

	test('renders station names in the StationList', () => {
		render(
			<StationDetails
				stations={stations}
				selectedStation={null}
				handleStationSelect={handleStationSelectMock}
			/>
		);

		expect(screen.getByText('Station A')).toBeInTheDocument();
		expect(screen.getByText('Station B')).toBeInTheDocument();
	});

	test('marks the selected station in the StationList', () => {
		render(
			<StationDetails
				stations={stations}
				selectedStation={stations[0]} // Station A selected
				handleStationSelect={handleStationSelectMock}
			/>
		);

		expect(screen.getByText('Station A (selected)')).toBeInTheDocument();
		expect(screen.getByText('Station B')).toBeInTheDocument();
	});

	test('calls handleStationSelect when a station is selected from the StationList', () => {
		render(
			<StationDetails
				stations={stations}
				selectedStation={null}
				handleStationSelect={handleStationSelectMock}
			/>
		);

		const stationAItem = screen.getByTestId('station-item-1');
		fireEvent.click(stationAItem);

		expect(handleStationSelectMock).toHaveBeenCalledTimes(1);
		expect(handleStationSelectMock).toHaveBeenCalledWith(stations[0]);
	});

	test('calls handleStationSelect when a station is selected from the StationMap', () => {
		render(
			<StationDetails
				stations={stations}
				selectedStation={null}
				handleStationSelect={handleStationSelectMock}
			/>
		);

		const stationAMapItem = screen.getByText('Station A on map');
		fireEvent.click(stationAMapItem);

		expect(handleStationSelectMock).toHaveBeenCalledTimes(1);
		expect(handleStationSelectMock).toHaveBeenCalledWith(stations[0]);
	});
});
