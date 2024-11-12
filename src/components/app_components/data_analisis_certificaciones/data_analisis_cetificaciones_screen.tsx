import React from "react";
import styles from "./styles.module.css";

import { useDataAnalysisCertificacionesViewModel } from "./data_analisis_certificaciones_view_model"; // Adjust the import path as necessary
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import dynamic from "next/dynamic";

import DraggableModal from "../../base_components/draggable_modal/draggable_modal";

ChartJS.register(ArcElement, Tooltip, Legend);
interface DataAnalysisMenuProps {
  isOpen: boolean;
  data: any;
  iso: string[]; // Change type to string[] for clarity
  sicted: string[]; // Change type to string[] for clarity
  caae: string[]; // Change type to string[] for clarity
}

const DataAnalysisCertificaciones: React.FC<DataAnalysisMenuProps> = ({
  isOpen,
  data,
}) => {
  const {
    activeTab,
    handleTabClick,
    handleClose,
    isMinimized,
    iso,
    sicted,
    caae,
    setIsMinimized,
  } = useDataAnalysisCertificacionesViewModel(isOpen, data);

  //< if (!isOpen) return null;
  const renderItems = (items: string[]) => (
    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
      {items?.map((item, index) => (
        <li key={index} style={{ fontSize: "1.2rem", padding: "0.2rem" }}>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <DraggableModal isMinimized={isMinimized} setIsMinimized={setIsMinimized}>
      <div className={styles.dataAnalysisMenu}>
        <div className={styles.tabHeader}>
          <button
            className={`${styles.tabLink} ${
              activeTab === "iso" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("iso")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>ISO 14001</p>
          </button>
          <button
            className={`${styles.tabLink} ${
              activeTab === "sicted" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("sicted")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>SICTED</p>
          </button>
          <button
            className={`${styles.tabLink} ${
              activeTab === "caae" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("caae")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>NORMA CAAE</p>
          </button>
        </div>
        <div className={styles.tabContent}>
          <div
            id="iso"
            className={`${styles.tabPane} ${
              activeTab === "iso" ? styles.active : ""
            }`}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ fontSize: "1.2rem" }}>{renderItems(iso?.items)}</li>
            </ul>
          </div>

          <div
            id="sicted"
            className={`${styles.tabPane} ${
              activeTab === "sicted" ? styles.active : ""
            }`}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ fontSize: "1.2rem" }}>
                {renderItems(sicted?.items)}
              </li>
            </ul>
          </div>

          <div
            id="caae"
            className={`${styles.tabPane} ${
              activeTab === "caae" ? styles.active : ""
            }`}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ fontSize: "1.2rem" }}>{renderItems(caae?.items)}</li>
            </ul>
          </div>
        </div>
      </div>
    </DraggableModal>
  );
};

export default DataAnalysisCertificaciones;
