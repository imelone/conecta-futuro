import { useEffect, useRef } from "react";
import L from "leaflet";

interface UseGeoJsonLayersCleanupProps {
  geoJsonLayers: { layer: L.Layer }[];
  setGeoJsonLayers: (layers: any[]) => void;
  setSelectedTown: (town: string | null) => void;
  setSelectedProvince: (province: string | null) => void;
  setSelectedDistrict: (district: string | null) => void;
  selectedProgram: string | null;
  loadTownsData: (program: string) => Promise<void>;
}

const useGeoJsonLayersCleanup = ({
  geoJsonLayers,
  setGeoJsonLayers,
  setSelectedTown,
  setSelectedProvince,
  setSelectedDistrict,
  selectedProgram,
  loadTownsData,
}: UseGeoJsonLayersCleanupProps) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // This effect is responsible for cleaning up layers and managing state
    if (mapRef.current) {
      geoJsonLayers.forEach((geoJsonLayer) => {
        if (geoJsonLayer.layer instanceof L.CircleMarker) {
          mapRef?.current?.removeLayer(geoJsonLayer.layer);
        }
      });
    }

    // Reset states only if geoJsonLayers is not empty
    if (geoJsonLayers.length > 0) {
      setGeoJsonLayers([]);
      setSelectedTown(null);
      setSelectedProvince(null);
      setSelectedDistrict(null);
    }

    // Load new towns data based on selectedProgram only if it has changed
    if (selectedProgram) {
      loadTownsData(selectedProgram);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProgram]);

  return { mapRef };
};

export default useGeoJsonLayersCleanup;
