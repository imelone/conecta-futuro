import React from "react";
import styles from "./styles.module.css";

import { useDataAnalysisSostenibilidadViewModel } from "./data_analisis_sostenibilidad_view_model";
import DraggableModal from "../../base_components/draggable_modal/draggable_modal";

interface DataAnalysisMenuProps {
  isOpen: boolean;
  data: any;
  removeForestItem: any;
  handleToggleClick: any;
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
    data: municipioData,
    setIsMinimized,
  } = useDataAnalysisSostenibilidadViewModel(
    isOpen,
    data,
    handleToggleClick,
    removeForestItem
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
        {/* {console.log("municipio: ", municipioData)} */}
        <div className={styles.tabContent}>
          {municipioData.map((municipio, index) => (
            <div key={index}>
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                {municipio.municipio}
              </h2>
              <div
                id="metas"
                className={`${styles.tabPane} ${
                  activeTab === "metas" ? styles.active : ""
                }`}
              >
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {municipio.metas.map((meta, idx) => (
                    <li style={{ fontSize: "1rem" }} key={idx}>
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
                  {municipio.pilares.map((pilar, idx) => (
                    <li style={{ fontSize: "1rem" }} key={idx}>
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
                  {municipio.actuaciones.map((actuacion, idx) => (
                    <li style={{ fontSize: "1rem" }} key={idx}>
                      {actuacion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DraggableModal>
  );
};

export default DataAnalysisSostenibilidad;
