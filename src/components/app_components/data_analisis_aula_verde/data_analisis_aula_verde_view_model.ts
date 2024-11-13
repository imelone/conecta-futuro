// DataAnalysisViewModel.ts

import { useState } from "react";

export interface DataAnalysisMenuProps {
  isOpen: boolean;
  data: any;
}

export const useDataAnalysisAulaVerdeViewModel = (isOpen: any, data: any) => {
  // Log all the props received
  console.log("Props received:", {
    isOpen,
    data,
  });

  const [activeTab, setActiveTab] = useState("sostenibilidad_turismo");
  const [isMinimized, setIsMinimized] = useState(false);
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleClose = (areaName: any) => {
    // removeForestItem(areaName);
  };

  // Initialize arrays to hold the values
  console.log("data aula verde: ", data);
  const certificacionEspaciosVerdes = (data && data[0]) || {};
  const certificacionHotelEcologico = (data && data[1]) || {};
  const sostenibilidadTurismo = (data && data[2]) || {};

  return {
    activeTab,
    handleTabClick,
    handleClose,
    data,
    certificacionEspaciosVerdes,
    certificacionHotelEcologico,
    sostenibilidadTurismo,
    isMinimized,
    setIsMinimized,
  };
};
