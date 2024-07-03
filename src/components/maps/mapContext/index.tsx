import React, { createContext, useContext, useState, ReactNode } from "react";
import L from "leaflet";

interface MapContextProps {
  map: L.Map | null;
  setMap: (map: L.Map) => void;
  center: [number, number];
  setCenter: (center: [number, number]) => void;
}

interface MapContextProviderProps {
  children: ReactNode;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapContextProvider: React.FC<MapContextProviderProps> = ({
  children,
}) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [center, setCenter] = useState<[number, number]>([51.505, -0.09]);

  return (
    <MapContext.Provider value={{ map, setMap, center, setCenter }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapContextProvider");
  }
  return context;
};
