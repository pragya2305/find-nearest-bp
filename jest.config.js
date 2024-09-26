module.exports = {
	transform: {
		'^.+\\.[tj]sx?$': ['babel-jest', { configFile: './babel.config.js' }],
	},
	transformIgnorePatterns: [
		'node_modules/(?!(react-leaflet|leaflet|@react-leaflet|some-other-esm-package)/)',
	],
	verbose: true,
	jest: {
		moduleNameMapper: {
			'react-leaflet': '<rootDir>/mocks/reactLeafletMock.js',
		},
	},
};
