import React from 'react';
import { MapContainer } from './MapContainer';
import { MapContextProvider } from './mapContext';

function CnpjFormIndex() {
	return (
		<MapContextProvider>
			<MapContainer />
		</MapContextProvider>
	);
}

export default CnpjFormIndex;
