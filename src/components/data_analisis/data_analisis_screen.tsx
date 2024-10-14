import React from "react";
import { Pie } from "react-chartjs-2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./styles.module.css";
import AreaInfoComponent from "../dataAreaInfo";
import { AreaData, useDataAnalysisViewModel } from "./data_analisis_view_model"; // Adjust the import path as necessary
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
interface DataAnalysisMenuProps {
  isOpen: boolean;
  dataForest: any;
  removeForestItem: any;
  handleToggleClick: any;
  activeToggles: Record<string, boolean>;
}

const DataAnalysisMenu: React.FC<DataAnalysisMenuProps> = ({
  isOpen,
  dataForest,
  removeForestItem,
  handleToggleClick,
}) => {
  const { activeTab, handleTabClick, handleClose, rows, pieData1, pieData2 } =
    useDataAnalysisViewModel(
      isOpen,
      dataForest,
      handleToggleClick,
      removeForestItem
    );

  if (!isOpen) return null;

  const columns: GridColDef[] = [
    { field: "bosque", headerName: "BOSQUE", width: 150 },
    { field: "refCat", headerName: "REF. CAT", width: 150 },
    { field: "poligono", headerName: "POLÍGONO", width: 150 },
    { field: "parcela", headerName: "PARCELA", width: 150 },
    {
      field: "coordenadas",
      headerName: "COORDENADAS",
      width: 300,
      cellClassName: "coordenadas-cell",
    },
  ];

  const shouldShowGrid = rows.length > 0;

  return (
    <div className={styles.cMapMain}>
      <div className={styles.dataAnalysisMenu}>
        <div className={styles.tabHeader}>
          <button
            className={`${styles.tabLink} ${
              activeTab === "Tab1" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("Tab1")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>
              PROGRAMA CUIDA TU BOSQUE
            </p>
          </button>
          <button
            className={`${styles.tabLink} ${
              activeTab === "Tab2" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("Tab2")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>INDICADORES</p>
          </button>
          <button
            className={`${styles.tabLink} ${
              activeTab === "Tab3" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("Tab3")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>
              DATOS CATASTRO
            </p>
          </button>
        </div>
        <div className={styles.tabContent}>
          <div
            id="Tab1"
            className={`${styles.tabPane} ${
              activeTab === "Tab1" ? styles.active : ""
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
            id="Tab2"
            className={`${styles.tabPane} ${
              activeTab === "Tab2" ? styles.active : ""
            }`}
          >
            <div className={styles.chartContainer}>
              <h3>El Corcho</h3>
              <Pie data={pieData1} />
            </div>
            <div className={styles.chartContainer}>
              <h3>Cerro Ballestero 1</h3>
              <Pie data={pieData2} />
            </div>
          </div>
          <div
            id="Tab3"
            className={`${styles.tabPane} ${
              activeTab === "Tab3" ? styles.active : ""
            }`}
          >
            {shouldShowGrid && (
              <div className={styles.gridContainer}>
                <DataGrid
                  rows={rows}
                  columns={columns.map((col) => ({
                    ...col,
                    width:
                      col.field === "poligono" || col.field === "parcela"
                        ? 100
                        : col.field === "coordenadas"
                        ? 300
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
        </div>
      </div>
    </div>
  );
};

export default DataAnalysisMenu;
