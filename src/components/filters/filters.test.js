import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './filters';
import { FILTER_OPTIONS } from '../../constants';

describe('Filters Component', () => {
	const filterOptions = Object.values(FILTER_OPTIONS);

	test('renders filters', () => {
		render(
			<Filters
				filterOptions={filterOptions}
				filters={{}}
				onFilterChange={jest.fn()}
			/>
		);
		filterOptions.forEach(({ label }) => {
			expect(screen.getByLabelText(label)).toBeInTheDocument();
		});
	});

	test('calls onFilterChange when a filter is changed', () => {
		const onFilterChange = jest.fn();
		const filters = {
			[FILTER_OPTIONS.IS_24_HOURS.value]: false,
		};

		render(
			<Filters
				filterOptions={filterOptions}
				filters={filters}
				onFilterChange={onFilterChange}
			/>
		);
		fireEvent.click(screen.getByLabelText(filterOptions[0].label));

		expect(onFilterChange).toHaveBeenCalledWith(filterOptions[0].value, true);
	});
});
