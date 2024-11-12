// DataAnalysisViewModel.ts

import { useState } from "react";

export interface DataAnalysisMenuProps {
  isOpen: boolean;
  data: any;
}

export const useDataAnalysisCertificacionesViewModel = (
  isOpen: any,
  data: any
) => {
  // Log all the props received
  console.log("Props received:", {
    isOpen,
    data,
  });

  const [activeTab, setActiveTab] = useState("iso");
  const [isMinimized, setIsMinimized] = useState(false);
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleClose = (areaName: any) => {
    // removeForestItem(areaName);
  };

  // Initialize arrays to hold the values
  const iso = (data && data[0]) || {};
  const caae = (data && data[1]) || {};
  const sicted = (data && data[2]) || {};

  return {
    activeTab,
    handleTabClick,
    handleClose,
    data,
    iso,
    caae,
    sicted,
    isMinimized,
    setIsMinimized,
  };
};
