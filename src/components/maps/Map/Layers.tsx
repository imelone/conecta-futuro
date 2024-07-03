import React from "react";
import { LayersControl } from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";

interface LayersProps {
  apiKey: string;
}

const Layers: React.FC<LayersProps> = ({ apiKey }) => {
  return (
    <LayersControl position="topright">
      <LayersControl.BaseLayer checked name="ROADMAP_LABEL">
        <ReactLeafletGoogleLayer apiKey={apiKey} type="roadmap" />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="HYBRID_LABEL">
        <ReactLeafletGoogleLayer apiKey={apiKey} type="hybrid" />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="SATELLITE_LABEL">
        <ReactLeafletGoogleLayer apiKey={apiKey} type="satellite" />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="TERRAIN_LABEL">
        <ReactLeafletGoogleLayer apiKey={apiKey} type="terrain" />
      </LayersControl.BaseLayer>
    </LayersControl>
  );
};

export { Layers }; // Ensure the component is correctly exported
