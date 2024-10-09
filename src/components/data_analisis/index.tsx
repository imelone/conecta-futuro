// import React, { useState } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";
// import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
// import styles from "./styles.module.css";
// import AreaInfoComponent from "../dataAreaInfo";

// ChartJS.register(ArcElement, Tooltip, Legend);

// interface DataAnalysisMenuProps {
//   isOpen: boolean;
//   dataForest: any;
//   removeForestItem: any;
//   handleToggleClick: any;
//   activeToggles: Record<string, boolean>;
// }

// interface AreaData {
//   type: string;
//   geometry: {
//     type: string;
//     coordinates: number[][][];
//   };
//   properties: {
//     leyenda: {
//       name: string;
//       label: string;
//       text: string;
//       color: string;
//     };
//     catastrales: {
//       text: string;
//       image: string;
//       refCat: string;
//       poligono: string;
//       parcela: string;
//       coordenadasX: string;
//       coordenadasY: string;
//     };
//     Analisis: {
//       text: string;
//       image: string;
//     };
//   };
// }

// const DataAnalysisMenu: React.FC<DataAnalysisMenuProps> = ({
//   isOpen,
//   dataForest,
//   removeForestItem,
//   handleToggleClick,
//   activeToggles,
// }) => {
//   const [activeTab, setActiveTab] = useState("Tab1");

//   const handleTabClick = (tabName: string) => {
//     setActiveTab(tabName);
//   };

//   const handleClose = (areaName: any) => {
//     removeForestItem(areaName);
//   };

//   if (!isOpen) return null;

//   const pieData1 = {
//     labels: ["Alcornoque", "Roble", "Algarrobo"],
//     datasets: [
//       {
//         data: [73, 7, 20],
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//       },
//     ],
//   };

//   const pieData2 = {
//     labels: ["Algarrobo", "Roble", "Durillo"],
//     datasets: [
//       {
//         data: [58, 3, 39],
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//       },
//     ],
//   };

//   // Extract rows from dataForest
//   const rows: GridRowsProp =
//     dataForest?.map((areaData: AreaData, index: number) => ({
//       id: index + 1,
//       bosque: areaData.properties.leyenda.label,
//       refCat: areaData.properties.catastrales.refCat,
//       poligono: areaData.properties.catastrales.poligono,
//       parcela: areaData.properties.catastrales.parcela,
//       coordenadas: `${areaData.properties.catastrales.coordenadasX} ${areaData.properties.catastrales.coordenadasY}`, // Combine coordinates with a line break
//     })) || [];

//   const columns: GridColDef[] = [
//     { field: "bosque", headerName: "BOSQUE", width: 150 },
//     { field: "refCat", headerName: "REF. CAT", width: 150 },
//     { field: "poligono", headerName: "POLÍGONO", width: 150 },
//     { field: "parcela", headerName: "PARCELA", width: 150 },
//     {
//       field: "coordenadas",
//       headerName: "COORDENADAS",
//       width: 300,
//       cellClassName: "coordenadas-cell",
//     }, // Add a class for custom styling
//   ];

//   const shouldShowGrid = rows.length > 0;

//   return (
//     <div className={styles.cMapMain}>
//       <div className={styles.dataAnalysisMenu}>
//         <div className={styles.tabHeader}>
//           <button
//             className={`${styles.tabLink} ${
//               activeTab === "Tab1" ? styles.active : ""
//             }`}
//             onClick={() => handleTabClick("Tab1")}
//           >
//             <p style={{ fontWeight: "700", fontSize: "14px" }}>
//               PROGRAMA CUIDA TU BOSQUE
//             </p>
//           </button>
//           <button
//             className={`${styles.tabLink} ${
//               activeTab === "Tab2" ? styles.active : ""
//             }`}
//             onClick={() => handleTabClick("Tab2")}
//           >
//             <p style={{ fontWeight: "700", fontSize: "14px" }}>INDICADORES</p>
//           </button>
//           <button
//             className={`${styles.tabLink} ${
//               activeTab === "Tab3" ? styles.active : ""
//             }`}
//             onClick={() => handleTabClick("Tab3")}
//           >
//             <p style={{ fontWeight: "700", fontSize: "14px" }}>
//               DATOS CATASTRO
//             </p>
//           </button>
//         </div>
//         <div className={styles.tabContent}>
//           <div
//             id="Tab1"
//             className={`${styles.tabPane} ${
//               activeTab === "Tab1" ? styles.active : ""
//             }`}
//           >
//             {dataForest?.map(
//               (areaData: AreaData, index: React.Key | null | undefined) => (
//                 <AreaInfoComponent
//                   key={index}
//                   areaLabel={areaData.properties.leyenda.label}
//                   areaName={areaData.properties.leyenda.name}
//                   areaText={areaData.properties.leyenda.text}
//                   areaColor={areaData.properties.leyenda.color}
//                   onClose={handleClose}
//                   removeForestItem={removeForestItem}
//                   toggleName={areaData.properties.leyenda.name}
//                   handleToggleClick={handleToggleClick}
//                 />
//               )
//             )}
//           </div>

//           <div
//             id="Tab2"
//             className={`${styles.tabPane} ${
//               activeTab === "Tab2" ? styles.active : ""
//             }`}
//           >
//             <div className={styles.chartContainer}>
//               <h3>El Corcho</h3>
//               <Pie data={pieData1} />
//             </div>
//             <div className={styles.chartContainer}>
//               <h3>Cerro Ballestero 1</h3>
//               <Pie data={pieData2} />
//             </div>
//           </div>
//           <div
//             id="Tab3"
//             className={`${styles.tabPane} ${
//               activeTab === "Tab3" ? styles.active : ""
//             }`}
//           >
//             {shouldShowGrid && (
//               <div className={styles.gridContainer}>
//                 <DataGrid
//                   rows={rows}
//                   columns={columns.map((col) => ({
//                     ...col,
//                     width:
//                       col.field === "poligono" || col.field === "parcela"
//                         ? 100
//                         : col.field === "coordenadas"
//                         ? 300
//                         : 200, // Example: Different width for 'name' column
//                     sortable: false, // Disable sorting for this column
//                     filterable: false, // Disable filtering for this column
//                     disableColumnMenu: true,
//                   }))}
//                   pagination={undefined}
//                   hideFooterPagination={true}
//                   hideFooter={true}
//                   sx={{
//                     boxShadow: 2,
//                     border: 2,
//                     borderColor: "primary.light",
//                     "& .MuiDataGrid-root": {
//                       border: "1px solid #ddd", // Border for the grid
//                       borderCollapse: "collapse", // Ensure borders are collapsed
//                     },
//                     "& .MuiDataGrid-cell": {
//                       borderBottom: "1px solid #ddd", // Row border
//                       whiteSpace: "pre-line", // Ensures line breaks are respected
//                       overflowWrap: "break-word", // Prevents text overflow
//                     },
//                     "& .MuiDataGrid-columnSeparator": {
//                       display: "block", // Ensure column separators are visible
//                     },
//                     "& .MuiDataGrid-footer": {
//                       display: "none", // Hide the footer
//                     },
//                   }}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DataAnalysisMenu;
