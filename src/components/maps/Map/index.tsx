// @ts-nocheck
"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-sidebar-v2/css/leaflet-sidebar.min.css";
import "leaflet-sidebar-v2";
import {
  MapContainer,
  TileLayer,
  ScaleControl,
  FeatureGroup,
  ZoomControl,
} from "react-leaflet";

import "leaflet-draw/dist/leaflet.draw.css";
import { MapContextProvider } from "../mapContext";
import RoutingMachine from "../RoutingMachine";
import "./mapStyles.css";
import { Layers } from "./Layers";
import Sidebar from "../../sidenav/sidenav";
//import TownList from "../../ui-components/regions/page"; // Corrected import path
//import { cityData } from "../../../app/data/coordenadas_municipios/chiclanaDeSegura.js";
import { FeatureCollection } from "geojson";
//import Image from "next/image";
import DataAnalysisMenuCuidaTuBosque from "@/components/app_components/data_analisis_cuida_tu_bosque/data_analisis_cuida_tu_bosque_screen";
import DataAnalysisMenuNuevosBosques from "@/components/app_components/data_analisis_nuevos_bosques/data_analisis_nuevos_bosques_screen";
import DataAnalysisSostenbilidad from "@/components/app_components/data_analisis_sostenibilidad/data_analisis_sostenibilidad_screen";
import programsList from "../../../app/data/listado_de_programas/programs.json";
import useGeoJsonLayersCleanup from "../../../hooks/use_geoJson_cleanup_layers";
import { findParcelaByName } from "@/utils/find_parcel_by_name";
//import comunidades from "../../../app/data/cuida-tu-bosque.json";

interface GeoJsonLayer {
  toggleName: string;
  layer: L.Layer;
}

type DataAnalysisMenuProps = {
  handleToggleClick: () => void;
};

const Map = () => {
  const [coord] = useState<[number, number]>([40.4637, -3.7492]);
  const [endPoint] = useState<{ lat: number; lng: number } | null>(null);
  const [geoJsonLayers, setGeoJsonLayers] = useState<GeoJsonLayer[]>([]);
  // const mapRef = useRef<L.Map | null>(null);
  const sidebarRef = useRef<L.Control.Sidebar | null>(null);
  //const { setMap } = useMapContext();
  const [dataForest, setDataForest] = useState([]);
  const [analysisData, setAnalysisData] = useState<{ [key: string]: any }>({});
  const [isDataAnalysisMenuOpen, setIsDataAnalysisMenuOpen] = useState(false);
  const [anyActiveToggle, setAnyActiveToggle] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [townsData, setTownsData] = useState<any>(null);
  const [programsInfo, setProgramsInfo] = useState<any>(null);
  const [optionOpen, setOptionOpen] = useState<string | null>(null);
  const [selectedTown, setSelectedTown] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null); // State for the selected province
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null); // State for the selected district
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>(
    {}
  );
  const [sideBarSelectedOption, setSideBarSelectedOption] = useState("home");
  const [sectionMainImg, setSectionMainImg] = useState("");

  const loadTownsData = async (selectedProgram: string) => {
    console.log("comunidadArchivo: ", selectedProgram);

    setDataForest([]);
    try {
      const towns = await import(
        `../../../app/data/programas/${selectedProgram}.json`
      );
      console.log("towns[1].certificaciones: ", towns[1]);
      if (selectedProgram === "certificaciones") {
        console.log("selectedProgram: ", selectedProgram);
        console.log("towns[1].certificaciones: ", towns[1].certificaciones);
        setTownsData(towns[1].certificaciones);
      } else {
        setTownsData(towns[1].distritos);
      }

      setProgramsInfo(towns[0].descripcion); // Access the default export from the JSON file
      console.log("towns[0].image: ", towns[0].image);
      setSectionMainImg(towns[0].image);
    } catch (error) {
      console.error("Error loading towns data:", error);
      setTownsData(null); // Reset towns data on error
    }
  };
  const { mapRef } = useGeoJsonLayersCleanup({
    geoJsonLayers,
    setGeoJsonLayers,
    setSelectedTown,
    setSelectedProvince,
    setSelectedDistrict,
    selectedProgram,
    loadTownsData,
  });

  const handleProgramSelection = (comunidadArchivo: string) => {
    setSelectedProgram(comunidadArchivo);
    setSelectedTown(null);
    setSelectedProvince(null);
    setSelectedDistrict(null);
    // Remove all layers from the map
    if (mapRef.current) {
      geoJsonLayers.forEach((layerObj) => {
        mapRef.current.removeLayer(layerObj.layer);
      });

      mapRef.current.setView([40.4637, -3.7492], 6); // Set initialLat, initialLng, and initialZoom accordingly
    }

    handleOptionClick("districts");
  };

  const handleOptionClick = (optionName: string) => {
    console.log("pasa");

    setIsDataAnalysisMenuOpen(false);
    setSelectedTown(null); // Reset selected town when switching options
    setSelectedProvince(null); // Reset selected province
    setSelectedDistrict(null); // Reset selected district

    // Reset all active toggles to false
    setActiveToggles((prevToggles) => {
      const newToggles = Object.keys(prevToggles).reduce((acc, key) => {
        acc[key] = false; // Reset each toggbyle to false
        return acc;
      }, {} as Record<string, boolean>);

      // Remove all layers from the map corresponding to the toggles
      if (mapRef.current) {
        geoJsonLayers.forEach((geoJsonLayer) => {
          if (geoJsonLayer.layer) {
            mapRef.current.removeLayer(geoJsonLayer.layer);
          }
        });
        setGeoJsonLayers([]); // Clear the geoJsonLayers array
      }

      return newToggles;
    });
    setDataForest([]);
    // Handle option change logic
    setOptionOpen((prevOption) =>
      optionName === prevOption ? null : optionName
    );
    setSideBarSelectedOption(optionName);
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
    if (townsData && selectedProgram !== "certificaciones") {
      const toggleNames = extractToggleNames(townsData);

      // Update activeToggles based on toggleNames
      const newActiveToggles = createActiveToggles(toggleNames);
      setActiveToggles(newActiveToggles); // Set the new state
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [townsData, selectedProgram]);

  const extractToggleNames = (data) => {
    return data.flatMap((comunidad) =>
      comunidad.provincias.flatMap((provincia) =>
        extractMunicipioNames(provincia.municipios)
      )
    );
  };

  const extractMunicipioNames = (municipios) => {
    return municipios.flatMap((municipio) =>
      municipio.parcelas.map((parcela) => parcela?.properties?.leyenda?.name)
    );
  };

  const createActiveToggles = (toggleNames) => {
    return toggleNames.reduce((acc, name) => {
      acc[name] = false;
      return acc;
    }, {} as Record<string, boolean>);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hasActiveToggles = useCallback(() => {
    console.log("activeToggles:", activeToggles);
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
        await handleToggleOn(toggleName);
      } else {
        handleToggleOff(toggleName);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [geoJsonLayers, townsData]
  );

  const handleToggleOn = async (toggleName: string) => {
    try {
      const levels = ["provincias", "municipios", "parcelas"];
      const foundParcela = findParcelaByName(toggleName, townsData, levels);
      console.log("foundParcela: ", foundParcela);
      if (foundParcela) {
        if (foundParcela.geometry.type === "Point") {
          await addPointLayer(foundParcela);
        } else if (foundParcela.geometry.type === "Polygon") {
          await addPolygonLayer(foundParcela, toggleName);
        }
        addDataToForest(foundParcela);
      } else {
        console.warn(`No parcel found for toggleName: ${toggleName}`);
      }
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  const addPointLayer = async (data) => {
    const coordinates = data.geometry.coordinates[0][0];
    const latLng: LatLngTuple = [coordinates[1], coordinates[0]];

    const pointLayer = L.circleMarker(latLng, {
      radius: 12,
      fillColor: data.properties?.leyenda?.color || "#3388ff",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    });

    let popupContent = createPopupContent(data);
    pointLayer.bindPopup(popupContent);
    pointLayer.addTo(mapRef.current);

    setGeoJsonLayers((prevLayers) => [
      ...prevLayers,
      { toggleName: data.properties?.leyenda?.name, layer: pointLayer },
    ]);

    mapRef.current.setView([latLng[0], latLng[1] - 0.02], 15);
  };

  const createPopupContent = (data) => {
    const image = data.properties?.catastrales?.image;
    const title = data.properties?.leyenda?.label;

    if (image) {
      return `
        <div class="image-container">
          <h3>${title}</h3>
          <img src="/assets/images/maps/${image}" alt="Catastrales image" class="popup-image" />
        </div>
      `;
    }
    return "";
  };

  const addPolygonLayer = async (data, toggleName) => {
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
          mouseover: (e) =>
            highlightLayer(e, layer, highlightStyle, toggleName),
          mouseout: (e) => unhighlightLayer(layer, style),
          click: (e) => highlightLayer(e, layer, highlightStyle, toggleName),
        });
      },
    });

    mapRef.current.addLayer(newLayer);
    setGeoJsonLayers((prevLayers) => [
      ...prevLayers,
      { toggleName, layer: newLayer },
    ]);
  };

  const highlightLayer = (e, layer, style, toggleName) => {
    layer.setStyle(style);
    layer.bindTooltip(toggleName).openTooltip(e.latlng);
  };

  const unhighlightLayer = (layer, style) => {
    layer.setStyle(style);
    layer.closeTooltip();
  };

  const handleToggleOff = (toggleName) => {
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
  };

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

  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
        index === 0 ? match.toLowerCase() : match.toUpperCase()
      )
      .replace(/\s+/g, ""); // Removes spaces
  };

  const handleMunicipioToggleClick = async (town: string) => {
    try {
      // Convert town to camelCase to match the file name format
      const camelCaseTown = toCamelCase(town);

      // Check if the layer for the town already exists in the municipios group
      const existingMunicipioLayer = geoJsonLayers.find(
        (layer) => layer.toggleName === camelCaseTown
      );

      const isActive = !existingMunicipioLayer; // Determine if this toggle should be active or inactive

      // Call the handleToggle function with the town and its active state
      await handleToggle(camelCaseTown, isActive);

      // Update active toggles state
      setActiveToggles((prev) => ({
        ...prev,
        [town]: isActive,
      }));

      if (isActive) {
        // Dynamically fetch the GeoJSON file based on the town's camelCase name
        const response = await import(
          `../../../app/data/coordenadas_municipios/${camelCaseTown}.json`
        );

        const cityData = response; // Use the response directly as cityData

        // Create a new GeoJSON layer for the municipality
        const newMunicipioLayer = L.geoJSON(cityData as FeatureCollection<any>);

        if (mapRef.current) {
          // Add the new municipality layer to the map
          mapRef.current.addLayer(newMunicipioLayer);
          newMunicipioLayer.bringToBack();
          // Update state with the new municipality layer
          setGeoJsonLayers((prevLayers) => [
            ...prevLayers,
            { toggleName: camelCaseTown, layer: newMunicipioLayer },
          ]);

          // Calculate the center of the town shape coordinates
          const townShape = cityData.features[0].geometry.coordinates[0];
          const centerLat =
            townShape.reduce((sum, coord) => sum + coord[1], 0) /
            townShape.length;
          const centerLng =
            townShape.reduce((sum, coord) => sum + coord[0], 0) /
            townShape.length;

          // Center the map on the municipality
          mapRef.current.setView([centerLat, centerLng - 0.3], 11); // Adjust the zoom level as needed
        }
      } else {
        // If the toggle is inactive, remove the layer from the map and state
        if (existingMunicipioLayer && mapRef.current) {
          mapRef.current.removeLayer(existingMunicipioLayer.layer);

          // Update state to remove the layer
          setGeoJsonLayers((prevLayers) =>
            prevLayers.filter((layer) => layer.toggleName !== camelCaseTown)
          );
        }
      }
    } catch (error) {
      console.error(`Error creating GeoJSON layer for ${town}:`, error);
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar
          programsList={programsList}
          onToggle={handleToggle}
          sectionMainImg={sectionMainImg}
          //   handleTownClick={handleTownClick}
          setIsDataAnalysisMenuOpen={setIsDataAnalysisMenuOpen}
          handleToggleClick={handleToggleClick}
          handleMunicipioToggleClick={handleMunicipioToggleClick}
          activeToggles={activeToggles}
          handleProgramSelection={handleProgramSelection}
          selectedProgram={selectedProgram}
          townsData={townsData}
          programsInfo={programsInfo}
          handleDistrictSelection={handleDistrictSelection}
          selectedTown={selectedTown}
          selectedProvince={selectedProvince}
          selectedDistrict={selectedDistrict}
          optionOpen={optionOpen}
          handleProvinceSelection={handleProvinceSelection}
          handleTownSelection={handleTownSelection}
          handleOptionClick={handleOptionClick}
          sideBarSelectedOption={sideBarSelectedOption}
        />

        <div style={{ flex: 1 }}>
          {sideBarSelectedOption === "home" ? (
            <div
              style={{
                height: "100vh",
                width: "100%",
                backgroundImage: "url('/assets/images/home.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          ) : (
            <MapContainer
              style={{ height: "100vh", width: "100%" }}
              center={coord}
              zoom={6.4}
              zoomControl={false}
              scrollWheelZoom={false}
              ref={mapRef}
            >
              <ZoomControl position="topright" />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {endPoint && (
                <RoutingMachine startPoint={coord} endPoint={endPoint} />
              )}
              <FeatureGroup></FeatureGroup>
              <Layers />

              <ScaleControl position="bottomright" />
            </MapContainer>
          )}
        </div>
      </div>

      {anyActiveToggle && isDataAnalysisMenuOpen && (
        <>
          {selectedProgram === "cuida-tu-bosque" && (
            <DataAnalysisMenuCuidaTuBosque
              isOpen={isDataAnalysisMenuOpen}
              dataForest={dataForest}
              removeForestItem={removeForestItem}
              handleToggleClick={handleToggleClick}
              activeToggles={activeToggles}
            />
          )}
          {selectedProgram === "nuevos-bosques" && (
            <DataAnalysisMenuNuevosBosques
              isOpen={isDataAnalysisMenuOpen}
              dataForest={dataForest}
              removeForestItem={removeForestItem}
              handleToggleClick={handleToggleClick}
              activeToggles={activeToggles}
            />
          )}
          {selectedProgram === "sostenibilidad" && (
            <DataAnalysisSostenbilidad
              isOpen={isDataAnalysisMenuOpen}
              dataForest={dataForest}
              removeForestItem={removeForestItem}
              handleToggleClick={handleToggleClick}
              activeToggles={activeToggles}
            />
          )}
        </>
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
