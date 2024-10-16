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
export const useDataAnalysisViewModel = (
  isOpen: any,
  dataForest: AreaData[],
  handleToggleClick: any,
  removeForestItem: (areaName: string) => void
) => {
  const [activeTab, setActiveTab] = useState("Tab1");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleClose = (areaName: any) => {
    removeForestItem(areaName);
  };

  // Prepare pie chart data
  const pieData1 = {
    labels: ["Alcornoque", "Roble", "Algarrobo"],
    datasets: [
      {
        data: [73, 7, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const pieData2 = {
    labels: ["Algarrobo", "Roble", "Durillo"],
    datasets: [
      {
        data: [58, 3, 39],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Extract rows from dataForest
  const rows =
    dataForest?.map((areaData: AreaData, index: number) => ({
      id: index + 1,
      bosque: areaData.properties.leyenda.label,
      refCat: areaData.properties.catastrales.refCat,
      poligono: areaData.properties.catastrales.poligono,
      parcela: areaData.properties.catastrales.parcela,
      //  coordenadas: `${areaData.properties.catastrales.coordenadasX} ${areaData.properties.catastrales.coordenadasY}`,
    })) || [];

  return {
    activeTab,
    handleTabClick,
    handleClose,
    rows,
    pieData1,
    pieData2,
    handleToggleClick,
    removeForestItem,
  };
};
