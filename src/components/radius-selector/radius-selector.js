import React, { memo } from 'react';
import './radius-selector.css';

const RadiusSelector = ({ radiusOptions, radius, onRadiusChange }) => {
	return (
		<div className='radius-selector'>
			<label>
				Radius:
				<select
					value={radius}
					onChange={(e) => onRadiusChange(e.target.value)}
				>
					{radiusOptions.map(({ value, label }) => (
						<option
							value={value}
							key={value}
						>
							{label}
						</option>
					))}
				</select>
			</label>
		</div>
	);
};

export default memo(RadiusSelector);
