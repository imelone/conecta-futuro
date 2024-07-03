import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

const POSITION_CLASSES = {
	bottomleft: 'leaflet-bottom leaflet-left',
	bottomright: 'leaflet-bottom leaflet-right',
	topleft: 'leaflet-top leaflet-left',
	topright: 'leaflet-top leaflet-right',
};

interface MapCustomControlProps {
	position: 'bottomleft' | 'bottomright' | 'topleft' | 'topright';
	children: ReactNode;
}

function MapCustomControl({ position, children }: MapCustomControlProps) {
	const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

	const existControlGrupe = document.getElementsByClassName(positionClass)[0];

	if (existControlGrupe) {
		return ReactDOM.createPortal(<div className="leaflet-control leaflet-bar">{children}</div>, existControlGrupe);
	}

	return (
		<div className={positionClass}>
			<div className="leaflet-control leaflet-bar">{children}</div>
		</div>
	);
}

export { MapCustomControl };
