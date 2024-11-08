import React from "react";
import styles from "./styles.module.css";

import { useDataAnalysisSostenibilidadViewModel } from "./data_analisis_sostenibilidad_view_model"; // Adjust the import path as necessary
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import dynamic from "next/dynamic";

import DraggableModal from "../../base_components/draggable_modal/draggable_modal";

ChartJS.register(ArcElement, Tooltip, Legend);
interface DataAnalysisMenuProps {
  isOpen: boolean;
  data: any;
  metas: string[]; // Change type to string[] for clarity
  pilares: string[]; // Change type to string[] for clarity
  actuaciones: string[]; // Change type to string[] for clarity
  removeForestItem: any;
  handleToggleClick: any;
  activeToggles: Record<string, boolean>;
}

const DataAnalysisSostenibilidad: React.FC<DataAnalysisMenuProps> = ({
  isOpen,
  data,
  removeForestItem,
  handleToggleClick,
}) => {
  const {
    activeTab,
    handleTabClick,
    handleClose,
    isMinimized,
    metas,
    pilares,
    actuaciones,
    setIsMinimized,
  } = useDataAnalysisSostenibilidadViewModel(
    isOpen,
    data,
    handleToggleClick,
    removeForestItem
  );
  console.log(
    "metas: ",
    metas,
    "pilares: ",
    pilares,
    "actuaciones:",
    actuaciones
  );
  if (!isOpen) return null;

  return (
    <DraggableModal isMinimized={isMinimized} setIsMinimized={setIsMinimized}>
      <div className={styles.dataAnalysisMenu}>
        <div className={styles.tabHeader}>
          <button
            className={`${styles.tabLink} ${
              activeTab === "metas" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("metas")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>METAS</p>
          </button>
          <button
            className={`${styles.tabLink} ${
              activeTab === "pilares" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("pilares")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>PILARES</p>
          </button>
          <button
            className={`${styles.tabLink} ${
              activeTab === "actuaciones" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("actuaciones")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>ACTUACIONES</p>
          </button>
        </div>
        <div className={styles.tabContent}>
          <div
            id="metas"
            className={`${styles.tabPane} ${
              activeTab === "metas" ? styles.active : ""
            }`}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {metas.map((meta, index) => (
                <li style={{ fontSize: "1.2rem" }} key={index}>
                  {meta}
                </li>
              ))}
            </ul>
          </div>

          <div
            id="pilares"
            className={`${styles.tabPane} ${
              activeTab === "pilares" ? styles.active : ""
            }`}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {pilares.map((pilar, index) => (
                <li style={{ fontSize: "1.2rem" }} key={index}>
                  {pilar}
                </li>
              ))}
            </ul>
          </div>

          <div
            id="actuaciones"
            className={`${styles.tabPane} ${
              activeTab === "actuaciones" ? styles.active : ""
            }`}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {actuaciones.map((actuacion, index) => (
                <li style={{ fontSize: "1.2rem" }} key={index}>
                  {actuacion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DraggableModal>
  );
};

export default DataAnalysisSostenibilidad;
