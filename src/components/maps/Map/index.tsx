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
import { MapContextProvider, useMapContext } from "../mapContext";
import RoutingMachine from "../RoutingMachine";
import "./mapStyles.css";
import { Layers } from "./Layers";
import Sidebar from "../../sidenav/sidenav";
import TownList from "../../ui-components/regions/page"; // Corrected import path
import { cityData } from "../../../app/data/coordenadas_municipios/chiclanaDeSegura.js";
import { FeatureCollection } from "geojson";
import Image from "next/image";
import DataAnalysisMenuCuidaTuBosque from "@/components/data_analisis_cuida_tu_bosque/data_analisis_cuida_tu_bosque_screen";
import DataAnalysisMenuNuevosBosques from "@/components/data_analisis_nuevos_bosques/data_analisis_nuevos_bosques_screen";
import programsData from "../../../app/data/listado_de_programas/programs.json";
//import comunidades from "../../../app/data/cuida-tu-bosque.json";

interface GeoJsonLayer {
  toggleName: string;
  layer: L.Layer;
}

type DataAnalysisMenuProps = {
  handleToggleClick: () => void;
};

const Map = () => {
  const [coord, setCoord] = useState<[number, number]>([40.4637, -3.7492]);
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
  const [anyActiveToggle, setAnyActiveToggle] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [townsData, setTownsData] = useState<any>(null);
  const [optionOpen, setOptionOpen] = useState<string | null>(null);
  const [selectedTown, setSelectedTown] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null); // State for the selected province
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null); // State for the selected district
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>(
    {}
  );
  useEffect(() => {
    console.log("selectedProgram: ", selectedProgram);

    // Cleanup function to remove all circleMarkers from the map
    if (mapRef.current) {
      geoJsonLayers.forEach((geoJsonLayer) => {
        if (geoJsonLayer.layer instanceof L.CircleMarker) {
          mapRef.current.removeLayer(geoJsonLayer.layer);
        }
      });
    }

    // Reset the geoJsonLayers state without affecting the map
    setGeoJsonLayers([]);

    // Reset other related states
    setSelectedTown(null);
    setSelectedProvince(null);
    setSelectedDistrict(null);

    if (selectedProgram) {
      loadTownsData(selectedProgram);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProgram]);

  const loadTownsData = async (selectedProgram: string) => {
    console.log("comunidadArchivo: ", selectedProgram);
    setDataForest([]);
    try {
      const towns = await import(
        `../../../app/data/programas/${selectedProgram}.json`
      );
      setTownsData(towns.default); // Access the default export from the JSON file
    } catch (error) {
      console.error("Error loading towns data:", error);
      setTownsData(null); // Reset towns data on error
    }
  };

  const handleProgramSelection = (comunidadArchivo: string) => {
    setSelectedProgram(comunidadArchivo);

    // Hide the district pane and show the towns pane
    handleOptionClick("towns");
  };
  const handleOptionClick = (optionName: string) => {
    setOptionOpen((prevOption) =>
      optionName === prevOption ? null : optionName
    );
    setSelectedTown(null); // Reset selected town when switching options
    setSelectedProvince(null); // Reset selected province
    setSelectedDistrict(null); // Reset selected district
  };

  const handleTownSelection = (town: string) => {
    setSelectedTown(town);
    handleTownClick(town);
  };

  const handleProvinceSelection = (province: string) => {
    setSelectedProvince(province);
    handleProvinceClick(province);
    setSelectedDistrict(null); // Reset district selection when province changes
    setSelectedTown(null); // Reset town selection when province changes
  };

  const handleDistrictSelection = (district: string) => {
    setSelectedDistrict(district);
    handleDistrictClick(district);
    setSelectedTown(null); // Reset town when district changes
  };

  useEffect(() => {
    if (townsData) {
      const toggleNames = townsData?.flatMap((comunidad) =>
        comunidad.provincias.flatMap((provincia) =>
          provincia.municipios.flatMap((municipio) =>
            municipio.parcelas.map(
              (parcela) => parcela?.properties?.leyenda?.name
            )
          )
        )
      );
      console.log("toggleNames: ", toggleNames);
      // Update activeToggles based on toggleNames
      const newActiveToggles = toggleNames.reduce((acc, name) => {
        acc[name] = false;
        return acc;
      }, {} as Record<string, boolean>);

      setActiveToggles(newActiveToggles); // Set the new state
    }
  }, [townsData, selectedProgram]); // Re-run effect when townsData changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hasActiveToggles = useCallback(() => {
    const result = Object.values(activeToggles).some((value) => value === true);
    console.log("Active Toggles:", result);
    return result;
  }, [activeToggles]);
  useEffect(() => {
    const active = hasActiveToggles();
    setAnyActiveToggle(active);
  }, [activeToggles, hasActiveToggles]);

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
        return;
      }

      if (isActive) {
        try {
          console.log("toggleName: ", toggleName);

          // Find the relevant parcela by the name from toggleName
          const foundParcela = townsData.reduce((acc, comunidad) => {
            if (acc) return acc; // If found, skip further searching
            return comunidad.provincias.reduce((accProv, provincia) => {
              if (accProv) return accProv; // If found, skip further searching
              return provincia.municipios.reduce((accMun, municipio) => {
                if (accMun) return accMun; // If found, skip further searching
                return municipio.parcelas.find(
                  (parcela) => parcela.properties?.leyenda?.name === toggleName
                );
              }, null);
            }, null);
          }, null);

          console.log("foundParcela: ", foundParcela);

          if (foundParcela) {
            const data = foundParcela; // Use the found parcela as data

            if (data.geometry.type === "Point") {
              const coordinates = data.geometry.coordinates[0][0];
              const latLng: LatLngTuple = [coordinates[1], coordinates[0]];

              const pointLayer = L.circleMarker(latLng, {
                radius: 5,
                fillColor: data.properties?.leyenda?.color || "#3388ff",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8,
              });

              let popupContent = "";

              const image = data.properties?.catastrales?.image;
              const title = data.properties?.leyenda?.label;

              if (image) {
                popupContent += `<div class="image-container">`;
                popupContent += `<h3>${title}</h3>`;
                popupContent += `<img src="/images/maps/${image}" alt="Catastrales image" class="popup-image" />`;
                popupContent += `</div>`;
              }
              pointLayer.bindPopup(popupContent);
              pointLayer.addTo(mapRef.current);

              setGeoJsonLayers((prevLayers) => [
                ...prevLayers,
                { toggleName, layer: pointLayer },
              ]);

              mapRef.current.setView([latLng[0], latLng[1] - 0.02], 15);

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
          } else {
            console.warn(`No parcel found for toggleName: ${toggleName}`);
          }
        } catch (error) {
          console.error("Error processing data:", error);
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
    [geoJsonLayers, townsData]
  );

  const removeForestItem = (toggleName: any) => {
    setDataForest((prevDataForest) => {
      const updatedDataForest = prevDataForest.filter((item: any) => {
        return item?.properties?.leyenda?.name !== toggleName;
      });
      return updatedDataForest;
    });
  };

  const addDataToForest = (data: any) => {
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
          programsData={programsData}
          // towns={towns}
          onToggle={handleToggle}
          handleTownClick={handleTownClick}
          setIsDataAnalysisMenuOpen={setIsDataAnalysisMenuOpen}
          handleToggleClick={handleToggleClick}
          activeToggles={activeToggles}
          handleProgramSelection={handleProgramSelection}
          selectedProgram={selectedProgram}
          townsData={townsData}
          handleDistrictSelection={handleDistrictSelection}
          selectedTown={selectedTown}
          selectedProvince={selectedProvince}
          selectedDistrict={selectedDistrict}
          optionOpen={optionOpen}
          handleProvinceSelection={handleProvinceSelection}
          handleTownSelection={handleTownSelection}
          handleOptionClick={handleOptionClick}
        />
        <MapContainer
          style={{
            height: "100vh",
            width: "100%",
          }}
          center={coord}
          zoom={6.4}
          zoomControl={false}
          scrollWheelZoom={false}
          ref={mapRef}
        >
          <ZoomControl position="topright" />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* {statesData.features.map((state, index) => {
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
          })} */}
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

      {anyActiveToggle && selectedProgram === "cuida-tu-bosque" && (
        <DataAnalysisMenuCuidaTuBosque
          isOpen={isDataAnalysisMenuOpen}
          dataForest={dataForest}
          removeForestItem={removeForestItem}
          handleToggleClick={handleToggleClick}
          activeToggles={activeToggles}
        />
      )}
      {anyActiveToggle && selectedProgram === "nuevos-bosques" && (
        <DataAnalysisMenuNuevosBosques
          isOpen={isDataAnalysisMenuOpen}
          dataForest={dataForest}
          removeForestItem={removeForestItem}
          handleToggleClick={handleToggleClick}
          activeToggles={activeToggles}
        />
      )}
    </div>
  );
};

const MapWithProvider = () => (
  <MapContextProvider>
    <Map />
  </MapContextProvider>
);

export default MapWithProvider;
