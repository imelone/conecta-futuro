// @ts-nocheck
"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import L, { LatLngTuple, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-sidebar-v2/css/leaflet-sidebar.min.css";
import "leaflet-sidebar-v2";
import {
  MapContainer,
  TileLayer,
  ScaleControl,
  FeatureGroup,
  ZoomControl,
  Polygon,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import { statesData } from "./data";
import { MapContextProvider, useMapContext } from "../mapContext";
import RoutingMachine from "../RoutingMachine";
import "./mapStyles.css";
import { Layers } from "./Layers";
import Sidebar from "../../sidenav";
import TownList from "../../regions/page"; // Corrected import path
import citiesData from "../../regions/municipios.json"; // Corrected import path
import { cityData } from "./chiclanaDeSegura.js";
import DataAnalysisMenu from "../../dataAnalysisMenu";
import { FeatureCollection } from "geojson";
import Image from "next/image";

interface GeoJsonLayer {
  toggleName: string;
  layer: L.Layer;
}

type DataAnalysisMenuProps = {
  handleToggleClick: () => void;
};

const Map = () => {
  const [coord, setCoord] = useState<[number, number]>([51.505, -0.09]);
  const [endPoint, setEndPoint] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [geoJsonLayers, setGeoJsonLayers] = useState<GeoJsonLayer[]>([]);
  const mapRef = useRef<L.Map | null>(null);
  const sidebarRef = useRef<L.Control.Sidebar | null>(null);
  const { setMap } = useMapContext();
  const [dataForest, setDataForest] = useState([]);
  const [analysisData, setAnalysisData] = useState<{ [key: string]: any }>({});
  const [isDataAnalysisMenuOpen, setIsDataAnalysisMenuOpen] = useState(false);

  const [activeToggles, setActiveToggles] = useState({
    elCorcho: false,
    losCarrizales: false,
    cerroBallestero1: false,
    cerroBallestero2: false,
    laHerencia: false,
  });

  useEffect(() => {
    if (mapRef.current && !sidebarRef.current) {
      sidebarRef.current = L.control.sidebar({
        autopan: true,
        closeButton: true,
        container: "sidebar",
        position: "left",
      });
      sidebarRef.current.addTo(mapRef.current);
    }
  }, [mapRef]);

  const handleCreated = (e: any) => {
    const layer = e.layer;
    const shape = layer.toGeoJSON();
    console.log("Shape created:", shape);
    // Save shape to your state or send to your backend here
  };

  const handleEdited = (e: any) => {
    const layers = e.layers;
    layers.eachLayer((layer: any) => {
      const shape = layer.toGeoJSON();
      console.log("Shape edited:", shape);
      // Update shape in your state or send to your backend here
    });
  };

  const handleDeleted = (e: any) => {
    const layers = e.layers;
    layers.eachLayer((layer: any) => {
      console.log("Shape deleted:", layer);
      // Remove shape from your state or inform your backend here
    });
  };

  const handleToggleClick = async (toggleName: keyof typeof activeToggles) => {
    console.log("toggleName: ", toggleName);
    setIsDataAnalysisMenuOpen(true); // Toggle the menu visibility
    setActiveToggles((prevToggles) => {
      const newToggles = {
        ...prevToggles,
        [toggleName]: !prevToggles[toggleName],
      };
      handleToggle(toggleName, newToggles[toggleName]);

      return newToggles;
    });
  };

  const handleToggle = useCallback(
    async (toggleName: string, isActive: boolean) => {
      if (!mapRef.current) {
        console.error("mapRef.current is null");
        return;
      }

      if (isActive) {
        try {
          // const existingLayerIndex = geoJsonLayers.findIndex(
          //   (layer) => layer.toggleName === toggleName
          // );
          // if (existingLayerIndex !== -1) {
          //   console.log(`${toggleName} layer already exists.`);
          //   return;
          // }

          const response = await fetch(`/${toggleName}.json`);
          const data = await response.json();

          if (data.geometry.type === "Point") {
            const coordinates = data.geometry.coordinates[0][0];
            const latLng: LatLngTuple = [coordinates[1], coordinates[0]];
            console.log("latLng: ", latLng);

            const pointLayer = L.circleMarker(latLng, {
              radius: 5,
              fillColor: data.properties?.leyenda?.color || "#3388ff",
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8,
            });

            let popupContent = "";
            // if (leyenda) {
            //   const leyendaKeys = Object.keys(leyenda);
            //   popupContent += `<div class="leyenda-container">`;
            //   leyendaKeys.forEach((key) => {
            //     if (key !== "image") {
            //       popupContent += `<p><b>${key}:</b> ${leyenda[key]}</p>`;
            //     } else if (leyenda[key]) {
            //       popupContent += `<img src="${leyenda[key]}" alt="${key} image" />`;
            //     }
            //   });
            //   popupContent += `</div>`;
            // }
            const image = data.properties?.catastrales?.image;
            const title = data.properties?.leyenda?.label;

            if (image) {
              popupContent += `<div class="image-container">`;
              popupContent += `<h3>${title}</h3>`; // Add your title here
              popupContent += `<img src="${image}" alt="Catastrales image" class="popup-image" />`;
              popupContent += `</div>`;
            }
            pointLayer.bindPopup(popupContent);
            pointLayer.addTo(mapRef.current);

            setGeoJsonLayers((prevLayers) => [
              ...prevLayers,
              { toggleName, layer: pointLayer },
            ]);

            mapRef.current.setView(latLng, 15); // Adjust zoom level as needed

            // Add data to forest
            addDataToForest(data);
          } else if (data.geometry.type === "Polygon") {
            const style = {
              color: data.properties?.leyenda?.color || "#3388ff",
              weight: 2,
              opacity: 0.3,
            };

            const highlightStyle = {
              weight: 3,
              color: "#ebf1f1",
              dashArray: "",
              fillOpacity: 0.7,
            };

            const newLayer = L.geoJSON(data, {
              style,
              onEachFeature: (feature, layer) => {
                layer.on({
                  mouseover: (e) => {
                    const layer = e.target;
                    layer.setStyle(highlightStyle);
                    layer.bindTooltip(toggleName).openTooltip(e.latlng);
                  },
                  mouseout: (e) => {
                    const layer = e.target;
                    layer.setStyle(style);
                    layer.closeTooltip();
                  },
                  click: (e) => {
                    const layer = e.target;
                    layer.setStyle(highlightStyle);
                    layer.bindTooltip(toggleName).openTooltip(e.latlng);
                  },
                });
              },
            });

            mapRef.current.addLayer(newLayer);
            setGeoJsonLayers((prevLayers) => [
              ...prevLayers,
              { toggleName, layer: newLayer },
            ]);

            // Add data to forest
            addDataToForest(data);
          }
        } catch (error) {
          console.error("Error fetching GeoJSON:", error);
        }
      } else {
        console.log("Layer to be removed:", toggleName);

        const layersToRemove = geoJsonLayers.filter(
          (layer) => layer.toggleName === toggleName
        );

        console.log("Layers to be removed:", layersToRemove);
        layersToRemove.forEach((layerToRemove) => {
          mapRef?.current?.removeLayer(layerToRemove.layer);
        });

        setGeoJsonLayers((prevLayers) =>
          prevLayers.filter((layer) => layer.toggleName !== toggleName)
        );

        // Remove data from forest
        removeForestItem(toggleName);

        // Remove analysis data
        setAnalysisData((prevData: any) => {
          const newData = { ...prevData };
          delete newData[toggleName];
          return newData;
        });
      }
    },
    [geoJsonLayers]
  );

  const removeForestItem = (toggleName: any) => {
    setDataForest((prevDataForest) => {
      console.log("Previous data forest:", prevDataForest);
      console.log("Toggle name to be removed:", toggleName);
      const updatedDataForest = prevDataForest.filter((item: any) => {
        return item?.properties?.leyenda?.name !== toggleName;
      });
      console.log("Updated data forest:", updatedDataForest);
      return updatedDataForest;
    });
  };

  const addDataToForest = (data: any) => {
    console.log("data:", data);
    setDataForest((prevDataForest: any) => {
      // Check if the data already exists in dataForest
      const isDataExists = prevDataForest.some(
        (item: any) =>
          item.properties.leyenda.name === data.properties.leyenda.name
      );

      if (!isDataExists) {
        return [data, ...prevDataForest];
      }

      return prevDataForest;
    });
  };

  const handleTownClick = async (town: string) => {
    if (town === "Chiclana de Segura") {
      try {
        // Check if the layer for Chiclana de Segura already exists
        const existingLayer = geoJsonLayers.find(
          (layer) => layer.toggleName === town
        );
        if (existingLayer) {
          return;
        }

        // Create new GeoJSON layer
        const newLayer = L.geoJSON(cityData as FeatureCollection<any>);
        if (mapRef.current) {
          mapRef.current.addLayer(newLayer);

          // Update state with new layer
          setGeoJsonLayers((prevLayers) => [
            ...prevLayers,
            { toggleName: town, layer: newLayer },
          ]);

          // Calculate the center of the town shape coordinates
          const townShape = cityData.features[0].geometry.coordinates[0];
          const centerLat =
            townShape.reduce((sum, coord) => sum + coord[1], 0) /
            townShape.length;
          const centerLng =
            townShape.reduce((sum, coord) => sum + coord[0], 0) /
            townShape.length;

          // Center the map on Chiclana de Segura
          mapRef.current.setView([centerLat, centerLng], 11); // Adjust the zoom level as needed
        }
      } catch (error) {
        console.error(
          "Error creating GeoJSON layer for Chiclana de Segura:",
          error
        );
      }
    }
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar
          onToggle={handleToggle}
          handleTownClick={handleTownClick}
          setIsDataAnalysisMenuOpen={setIsDataAnalysisMenuOpen}
          handleToggleClick={handleToggleClick}
          activeToggles={activeToggles}
        />
        <MapContainer
          style={{
            height: "100vh",
            width: "100%",
          }}
          center={coord}
          zoom={13}
          zoomControl={false}
          scrollWheelZoom={false}
          ref={mapRef}
        >
          <ZoomControl position="topright" />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {statesData.features.map((state, index) => {
            const coordinates: LatLngExpression[] =
              state.geometry.coordinates[0].map((item: any) => {
                // Ensure item is a number[] with at least two elements
                if (Array.isArray(item) && item.length >= 2) {
                  return [item[1], item[0]] as LatLngExpression;
                } else {
                  throw new Error(
                    `Invalid coordinates format for state ${state}`
                  );
                }
              });
            return (
              <Polygon
                key={index}
                pathOptions={{
                  fillOpacity: 0,
                  weight: 2,
                  opacity: 1,
                  dashArray: "3",
                  color: "white",
                }}
                positions={coordinates}
                eventHandlers={{
                  mouseover: (e: { target: any }) => {
                    const layer = e.target;
                    layer.setStyle({
                      dashArray: "",
                      fillOpacity: 0,
                      weight: 2,
                      opacity: 1,
                      color: "white",
                    });
                  },
                  mouseout: (e: { target: any }) => {
                    const layer = e.target;
                    layer.setStyle({
                      fillOpacity: 0,
                      weight: 2,
                      dashArray: "3",
                      color: "white",
                    });
                  },
                  click: () => {},
                }}
              />
            );
          })}
          {endPoint && (
            <RoutingMachine startPoint={coord} endPoint={endPoint} />
          )}
          <FeatureGroup>
            <EditControl
              position="topright"
              onCreated={handleCreated}
              onEdited={handleEdited}
              onDeleted={handleDeleted}
              draw={{
                rectangle: true,
                polygon: true,
                circle: true,
                polyline: false,
                marker: false,
                circlemarker: false,
              }}
            />
          </FeatureGroup>
          <Layers apiKey={""} />
          <ScaleControl position="bottomright" />
        </MapContainer>
      </div>
      <DataAnalysisMenu
        isOpen={isDataAnalysisMenuOpen}
        dataForest={dataForest}
        removeForestItem={removeForestItem}
        handleToggleClick={handleToggleClick} // Pass removeForestItem function
        activeToggles={activeToggles}
      />
    </div>
  );
};

const MapWithProvider = () => (
  <MapContextProvider>
    <Map />
  </MapContextProvider>
);

export default MapWithProvider;
