import React from "react";
import { Pie } from "react-chartjs-2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./styles.module.css";

import {
  AreaData,
  useDataAnalysisSostenibilidadViewModel,
} from "./data_analisis_sostenibilidad_view_model"; // Adjust the import path as necessary
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
//import Draggable from "react-draggable";
import dynamic from "next/dynamic";
import AreaInfoComponent from "../../base_components/dataAreaInfo";
import DraggableModal from "../../base_components/draggable_modal/draggable_modal";

ChartJS.register(ArcElement, Tooltip, Legend);
interface DataAnalysisMenuProps {
  isOpen: boolean;
  dataForest: any;
  removeForestItem: any;
  handleToggleClick: any;
  activeToggles: Record<string, boolean>;
}
const Draggable = dynamic(() => import("react-draggable"), { ssr: false });
const DataAnalysisSostenibilidad: React.FC<DataAnalysisMenuProps> = ({
  isOpen,
  dataForest,
  removeForestItem,
  handleToggleClick,
}) => {
  const {
    activeTab,
    handleTabClick,
    handleClose,
    rowsCatastrales,
    rowsIndicadores,
    isMinimized,
    setIsMinimized,
  } = useDataAnalysisSostenibilidadViewModel(
    isOpen,
    dataForest,
    handleToggleClick,
    removeForestItem
  );

  if (!isOpen) return null;

  return (
    <DraggableModal isMinimized={isMinimized} setIsMinimized={setIsMinimized}>
      <div className={styles.tabHeader}>
        <button
          className={`${styles.tabLink} ${
            activeTab === "PILARES" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("PILARES")}
        >
          <p style={{ fontWeight: "700", fontSize: "14px" }}>PILARES</p>
        </button>
        <button
          className={`${styles.tabLink} ${
            activeTab === "indicadores" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("indicadores")}
        >
          <p style={{ fontWeight: "700", fontSize: "14px" }}>INDICADORES</p>
        </button>
        <button
          className={`${styles.tabLink} ${
            activeTab === "datos_catastrales" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("datos_catastrales")}
        >
          <p style={{ fontWeight: "700", fontSize: "14px" }}>
            DATOS CATASTRALES
          </p>
        </button>
      </div>
      <div className={styles.tabContent}>
        <div
          id="PILARES"
          className={`${styles.tabPane} ${
            activeTab === "PILARES" ? styles.active : ""
          }`}
        >
          {dataForest?.map((areaData: AreaData, index: any) => (
            <AreaInfoComponent
              key={index}
              areaLabel={areaData.properties.leyenda.label}
              areaName={areaData.properties.leyenda.name}
              areaText={areaData.properties.leyenda.text}
              areaColor={areaData.properties.leyenda.color}
              onClose={handleClose}
              removeForestItem={removeForestItem}
              toggleName={areaData.properties.leyenda.name}
              handleToggleClick={handleToggleClick} // Pass the handleToggleClick function
            />
          ))}
        </div>

        <div
          id="indicadores"
          className={`${styles.tabPane} ${
            activeTab === "indicadores" ? styles.active : ""
          }`}
        ></div>
        <div
          id="datos_catastrales"
          className={`${styles.tabPane} ${
            activeTab === "datos_catastrales" ? styles.active : ""
          }`}
        ></div>
      </div>
    </DraggableModal>
  );
};

export default DataAnalysisSostenibilidad;
