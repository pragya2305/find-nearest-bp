import React, { memo } from 'react';
import './filters.css';

const Filters = ({ filterOptions, filters, onFilterChange }) => {
	return (
		<div className='filters'>
			{filterOptions.map(({ label, value }) => (
				<label key={label}>
					<input
						type='checkbox'
						checked={filters[value]}
						onChange={(e) => onFilterChange(value, e.target.checked)}
					/>
					{label}
				</label>
			))}
		</div>
	);
};

export default memo(Filters);
