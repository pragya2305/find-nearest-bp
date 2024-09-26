import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StationList from './station-list';

describe('StationList Component', () => {
	const stations = [
		{ id: 1, name: 'Station 1', distance: 5 },
		{ id: 2, name: 'Station 2', distance: 10 },
	];

	test('renders station list', () => {
		render(
			<StationList
				stations={stations}
				selectedStation={null}
				onStationSelect={jest.fn()}
			/>
		);
		expect(screen.getByText('Station 1')).toBeInTheDocument();
		expect(screen.getByText('Station 2')).toBeInTheDocument();
	});

	test('shows no stations found when empty', () => {
		render(
			<StationList
				stations={[]}
				selectedStation={null}
				onStationSelect={jest.fn()}
			/>
		);
		expect(screen.getByText(/No stations found/i)).toBeInTheDocument();
	});

	test('calls onStationSelect when a station is clicked', () => {
		const onStationSelect = jest.fn();
		render(
			<StationList
				stations={stations}
				selectedStation={null}
				onStationSelect={onStationSelect}
			/>
		);

		fireEvent.click(screen.getByText('Station 1'));
		expect(onStationSelect).toHaveBeenCalledWith(stations[0]);
	});

	test('applies selected className to the selected station', () => {
		const onStationSelect = jest.fn();
		render(
			<StationList
				stations={stations}
				selectedStation={stations[0]} // Set the first station as selected
				onStationSelect={onStationSelect}
			/>
		);

		const selectedStationItem = screen.getByText('Station 1').closest('li');
		expect(selectedStationItem).toHaveClass('selected');

		const unselectedStationItem = screen.getByText('Station 2').closest('li');
		expect(unselectedStationItem).not.toHaveClass('selected');
	});
});
