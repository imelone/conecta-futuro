// DataAnalysisViewModel.ts

import { useState } from "react";

export interface DataAnalysisMenuProps {
  isOpen: boolean;
  dataForest: any;
  removeForestItem: any;
  handleToggleClick: any;
  activeToggles: Record<string, boolean>;
}

export interface AreaData {
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  properties: {
    leyenda: {
      name: string;
      label: string;
      text: string;
      color: string;
    };
    catastrales: {
      text: string;
      image: string;
      refCat: string;
      poligono: string;
      parcela: string;
      coordenadasX: string;
      coordenadasY: string;
    };
    Analisis: {
      text: string;
      image: string;
    };
  };
}

export const useDataAnalysisSostenibilidadViewModel = (
  isOpen: any,
  data: AreaData[],
  handleToggleClick: any,
  removeForestItem: (areaName: string) => void
) => {
  // Log all the props received
  console.log("Props received:", {
    isOpen,
    data,
    handleToggleClick,
    removeForestItem,
  });

  const [activeTab, setActiveTab] = useState("metas");
  const [isMinimized, setIsMinimized] = useState(false);
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleClose = (areaName: any) => {
    removeForestItem(areaName);
  };

  // Initialize arrays to hold the values
  const metas: string[] = [];
  const pilares: string[] = [];
  const actuaciones: string[] = [];

  // Access metas, pilares, and actuaciones directly
  data.forEach((item: any) => {
    // Check if properties exist
    if (item.properties) {
      metas.push(...(item.properties.metas || []));
      pilares.push(...(item.properties.pilares || []));
      actuaciones.push(...(item.properties.actuaciones || []));
    }
  });

  return {
    activeTab,
    handleTabClick,
    handleClose,
    handleToggleClick,
    data,
    metas,
    pilares,
    actuaciones,
    removeForestItem,
    isMinimized,
    setIsMinimized,
  };
};
