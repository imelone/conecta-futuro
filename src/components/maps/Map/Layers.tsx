import React from "react";
import { LayersControl, TileLayer } from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";

interface LayersProps {
  apiKey: string;
}

const Layers: React.FC<LayersProps> = ({ apiKey }) => {
  return (
    <LayersControl position="topright">
      <LayersControl.BaseLayer checked name="OpenStreetMap">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="OpenStreetMap - Satellite">
        <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://opentopomap.org/copyright">OpenTopoMap</a> contributors'
        />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="Google Satellite">
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          attribution='&copy; <a href="https://www.google.com/maps">Google</a>'
        />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="Google Hybrid">
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
          attribution='&copy; <a href="https://www.google.com/maps">Google</a>'
        />
      </LayersControl.BaseLayer>
    </LayersControl>
    // <LayersControl position="topright">
    //   <LayersControl.BaseLayer checked name="ROADMAP_LABEL">
    //     <ReactLeafletGoogleLayer apiKey={apiKey} type="roadmap" />
    //   </LayersControl.BaseLayer>

    //   <LayersControl.BaseLayer name="HYBRID_LABEL">
    //     <ReactLeafletGoogleLayer apiKey={apiKey} type="hybrid" />
    //   </LayersControl.BaseLayer>

    //   <LayersControl.BaseLayer name="SATELLITE_LABEL">
    //     <ReactLeafletGoogleLayer apiKey={apiKey} type="satellite" />
    //   </LayersControl.BaseLayer>

    //   <LayersControl.BaseLayer name="TERRAIN_LABEL">
    //     <ReactLeafletGoogleLayer apiKey={apiKey} type="terrain" />
    //   </LayersControl.BaseLayer>
    // </LayersControl>
  );
};

export { Layers }; // Ensure the component is correctly exported
