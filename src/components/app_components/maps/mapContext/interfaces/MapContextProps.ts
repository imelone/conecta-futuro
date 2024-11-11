import { Map } from 'leaflet';
import { MapLatLngProps } from './MapLatLngProps';

interface MapContextProps {
	map?: Map;
	setMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
	center: MapLatLngProps;
	zoom: number;
}

export type { MapContextProps };
