import React from "react";
import { Pie } from "react-chartjs-2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./styles.module.css";

import {
  AreaData,
  useDataAnalysisCuidaTuBosqueViewModel,
} from "./data_analisis_cuida_tu_bosque_view_model"; // Adjust the import path as necessary
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import dynamic from "next/dynamic";
import AreaInfoComponent from "../base_components/dataAreaInfo";
import DraggableModal from "../base_components/draggable_modal/draggable_modal";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DataAnalysisMenuProps {
  isOpen: boolean;
  dataForest: any;
  removeForestItem: any;
  handleToggleClick: any;
  activeToggles: Record<string, boolean>;
  setIsMinimized: any;
  sMinimized: boolean;
}

const DataAnalysisMenu: React.FC<DataAnalysisMenuProps> = ({
  isOpen,
  dataForest,
  removeForestItem,
  handleToggleClick,
  activeToggles,
}) => {
  const {
    activeTab,
    handleTabClick,
    handleClose,
    rowsCatastrales,
    rowsIndicadores,
    setIsMinimized,
    isMinimized,
  } = useDataAnalysisCuidaTuBosqueViewModel(
    isOpen,
    dataForest,
    handleToggleClick,
    removeForestItem
  );

  const shouldShowGrid = rowsCatastrales.length > 0;
  if (!isOpen) return null;

  const columnsDatosCatastrales: GridColDef[] = [
    { field: "bosque", headerName: "BOSQUE", width: 150 },
    { field: "refCat", headerName: "REF. CATASTRAL", width: 150 },
    { field: "poligono", headerName: "POLÍGONO", width: 150 },
    { field: "parcela", headerName: "PARCELA", width: 150 },
  ];

  const columnsIndicadores: GridColDef[] = [
    { field: "bosque", headerName: "BOSQUE", width: 150 },
    { field: "superficie", headerName: "SUPERFICIE", width: 20 },
    { field: "arboles", headerName: "ÁRBOLES", width: 20 },
    { field: "co2Capturado", headerName: "CO2 CAPTURADO (t.)", width: 20 },
    { field: "co2PorCapturar", headerName: "CO2 X CAPTURAR (t.)", width: 20 },
    {
      field: "factorHidrologico",
      headerName: "FACTOR HIDROLÓGICO",
      width: 150,
    },
  ];

  return (
    <DraggableModal isMinimized={isMinimized} setIsMinimized={setIsMinimized}>
      <div className={styles.dataAnalysisMenu}>
        <div className={styles.tabHeader}>
          <button
            className={`${styles.tabLink} ${
              activeTab === "descripcion" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("descripcion")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>DESCRIPCION</p>
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
          <button
            className={`${styles.tabLink} ${
              activeTab === "indicadores" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("indicadores")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>INDICADORES</p>
          </button>
        </div>

        <div className={styles.tabContent}>
          <div
            id="descripcion"
            className={`${styles.tabPane} ${
              activeTab === "descripcion" ? styles.active : ""
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
                handleToggleClick={handleToggleClick}
              />
            ))}
          </div>

          <div
            id="datos_catastrales"
            className={`${styles.tabPane} ${
              activeTab === "datos_catastrales" ? styles.active : ""
            }`}
          >
            {shouldShowGrid && (
              <div className={styles.gridContainer}>
                <DataGrid
                  rows={rowsCatastrales}
                  columns={columnsDatosCatastrales.map((col) => ({
                    ...col,
                    width:
                      col.field === "poligono" || col.field === "parcela"
                        ? 100
                        : 200,
                    sortable: false,
                    filterable: false,
                    disableColumnMenu: true,
                  }))}
                  pagination={undefined}
                  hideFooterPagination={true}
                  hideFooter={true}
                  sx={{
                    boxShadow: 2,
                    border: 2,
                    borderColor: "primary.light",
                    "& .MuiDataGrid-root": {
                      border: "1px solid #ddd",
                      borderCollapse: "collapse",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "1px solid #ddd",
                      whiteSpace: "pre-line",
                      overflowWrap: "break-word",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                      display: "block",
                    },
                    "& .MuiDataGrid-footer": {
                      display: "none",
                    },
                  }}
                />
              </div>
            )}
          </div>

          <div
            id="indicadores"
            className={`${styles.tabPane} ${
              activeTab === "indicadores" ? styles.active : ""
            }`}
          >
            {shouldShowGrid && (
              <div className={styles.gridContainer}>
                <DataGrid
                  rows={rowsIndicadores}
                  columns={columnsIndicadores.map((col) => ({
                    ...col,
                    width: 160,
                    sortable: false,
                    filterable: false,
                    disableColumnMenu: true,
                  }))}
                  pagination={undefined}
                  hideFooterPagination={true}
                  hideFooter={true}
                  sx={{
                    boxShadow: 2,
                    border: 2,
                    borderColor: "primary.light",
                    "& .MuiDataGrid-root": {
                      border: "1px solid #ddd",
                      borderCollapse: "collapse",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "1px solid #ddd",
                      whiteSpace: "pre-line",
                      overflowWrap: "break-word",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                      display: "block",
                    },
                    "& .MuiDataGrid-footer": {
                      display: "none",
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </DraggableModal>
  );
};

export default DataAnalysisMenu;
