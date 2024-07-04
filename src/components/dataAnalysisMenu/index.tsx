import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import styles from "./styles.module.css"; // Import CSS module
import AreaInfoComponent from "../dataAreaInfo"; // Import the AreaInfoComponent

// Register Chart.js components
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
  activeToggles,
}) => {
  const [activeTab, setActiveTab] = useState("Tab1");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleClose = (areaName: any) => {
    removeForestItem(areaName);
  };

  if (!isOpen) return null;

  const pieData1 = {
    labels: ["Alcornoque", "Roble", "Algarrobo"],
    datasets: [
      {
        data: [73, 7, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const pieData2 = {
    labels: ["Algarrobo", "Roble", "Durillo"],
    datasets: [
      {
        data: [58, 3, 39],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

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
            LEYENDA
          </button>
          <button
            className={`${styles.tabLink} ${
              activeTab === "Tab2" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("Tab2")}
          >
            ANÁLISIS
          </button>
          <button
            className={`${styles.tabLink} ${
              activeTab === "Tab3" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("Tab3")}
          >
            DATOS CATASTRO
          </button>
        </div>
        <div className={styles.tabContent}>
          <div
            id="Tab1"
            className={`${styles.tabPane} ${
              activeTab === "Tab1" ? styles.active : ""
            }`}
          >
            {dataForest?.map(
              (
                areaData: {
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
                    "Datos catastrales": {
                      text: string;
                      image: string;
                    };
                    Analisis: {
                      text: string;
                      image: string;
                    };
                  };
                },
                index: React.Key | null | undefined
              ) => (
                <AreaInfoComponent
                  key={index}
                  areaLabel={areaData.properties.leyenda.label}
                  areaName={areaData.properties.leyenda.name}
                  areaText={areaData.properties.leyenda.text}
                  areaColor={areaData.properties.leyenda.color}
                  onClose={handleClose}
                  removeForestItem={removeForestItem} // Pass removeForestItem function
                  toggleName={areaData.properties.leyenda.name}
                  handleToggleClick={handleToggleClick}
                />
              )
            )}
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
            {/* {dataForest?.map(
              (
                areaData: {
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
                    };
                    analisis: {
                      text: string;
                      image: string;
                    };
                  };
                },
                index: React.Key | null | undefined
              ) => (
                <div className={styles.chartContainer} key={index}>
                  <div className={styles.imageContainer}>
                    <Image
                      width={1000} // Adjust the width and height to match your image's aspect ratio
                      height={600}
                      layout="responsive"
                      src={`/${areaData.properties.catastrales.image}`}
                      alt={areaData.properties.leyenda.name}
                    />
                  </div>
                </div>
              )
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysisMenu;
