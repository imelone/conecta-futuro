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
export const useDataAnalysisCuidaTuBosqueViewModel = (
  isOpen: any,
  dataForest: AreaData[],
  handleToggleClick: any,
  removeForestItem: (areaName: string) => void
) => {
  const [activeTab, setActiveTab] = useState("descripcion");
  const [isMinimized, setIsMinimized] = useState(false);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleClose = (areaName: any) => {
    removeForestItem(areaName);
  };

  // Extract rows from dataForest
  const rowsCatastrales =
    dataForest?.map((areaData: AreaData, index: number) => ({
      id: index + 1,
      bosque: areaData.properties.leyenda.label,
      refCat: areaData.properties.catastrales.refCat,
      poligono: areaData.properties.catastrales.poligono,
      parcela: areaData.properties.catastrales.parcela,
      //  coordenadas: `${areaData.properties.catastrales.coordenadasX} ${areaData.properties.catastrales.coordenadasY}`,
    })) || [];

  const rowsIndicadores =
    dataForest?.map((areaData: any, index: number) => ({
      id: index + 1,
      bosque: areaData.properties.leyenda.label,
      superficie: areaData.properties.indicadores.superficie,
      arboles: areaData.properties.indicadores.arboles,
      co2Capturado: areaData.properties.indicadores.co2Capturado,
      co2PorCapturar: areaData.properties.indicadores.co2PorCapturar,
      factorHidrologico: areaData.properties.indicadores.factorHidrologico,
    })) || [];

  return {
    activeTab,
    handleTabClick,
    handleClose,
    rowsCatastrales,
    rowsIndicadores,
    handleToggleClick,
    removeForestItem,
    isMinimized,
    setIsMinimized,
  };
};
