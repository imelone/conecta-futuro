import { useState } from "react";

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
    metas?: string[];
    pilares?: string[];
    actuaciones?: string[];
    municipio: string;
  };
}

export const useDataAnalysisSostenibilidadViewModel = (
  isOpen: boolean,
  data: AreaData[],
  handleToggleClick: any,
  removeForestItem: (areaName: string) => void
) => {
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

  const handleClose = (areaName: string) => {
    removeForestItem(areaName);
  };
  {
    console.log("data:", data);
  }
  const municipioData = data.map((item) => ({
    municipio: item.properties.leyenda.name,
    metas: item.properties.metas || [],
    pilares: item.properties.pilares || [],
    actuaciones: item.properties.actuaciones || [],
  }));

  return {
    activeTab,
    handleTabClick,
    handleClose,
    handleToggleClick,
    data: municipioData,
    removeForestItem,
    isMinimized,
    setIsMinimized,
  };
};
