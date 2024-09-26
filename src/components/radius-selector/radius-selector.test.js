import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RadiusSelector from './radius-selector';

describe('RadiusSelector Component', () => {
	const radiusOptions = [
		{ value: 1, label: '1 Miles' },
		{ value: 5, label: '5 Miles' },
	];

	test('renders radius options', () => {
		render(
			<RadiusSelector
				radiusOptions={radiusOptions}
				radius={5}
				onRadiusChange={jest.fn()}
			/>
		);
		expect(screen.getByLabelText(/Radius/i)).toBeInTheDocument();
		expect(screen.getByDisplayValue('5 Miles')).toBeInTheDocument();
	});

	test('calls onRadiusChange when option is changed', () => {
		const onRadiusChange = jest.fn();
		render(
			<RadiusSelector
				radiusOptions={radiusOptions}
				radius={5}
				onRadiusChange={onRadiusChange}
			/>
		);

		fireEvent.change(screen.getByRole('combobox'), { target: { value: 1 } });
		expect(onRadiusChange).toHaveBeenCalledWith('1');
	});
});
