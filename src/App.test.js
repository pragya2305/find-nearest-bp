import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app';
import useFetchStations from './services/fetchStations';

jest.mock('./services/fetchStations');

describe('App Component', () => {
	beforeEach(() => {
		useFetchStations.mockReturnValue({
			stations: [],
			isLoading: false,
			error: null,
		});
	});

	test('renders heading', () => {
		render(<App />);
		const heading = screen.getByText(/BP Station Finder/i);
		expect(heading).toBeInTheDocument();
	});

	test('shows loading text when loading', () => {
		useFetchStations.mockReturnValueOnce({
			stations: [],
			isLoading: true,
			error: null,
		});
		render(<App />);
		expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
	});

	test('shows error message when error occurs', () => {
		useFetchStations.mockReturnValueOnce({
			stations: [],
			isLoading: false,
			error: 'Error fetching stations',
		});
		render(<App />);
		expect(screen.getByText(/Error fetching stations/i)).toBeInTheDocument();
	});
});
