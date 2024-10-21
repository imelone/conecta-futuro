import React, { useEffect, useState } from "react";
import { TreeMenu } from "../tree_menu/tree_menu"; // Adjust the import path
import styles from "./region.module.css";

interface Parcel {
  parcela: string;
  properties?: { leyenda?: { name: string; label: string; color: string } };
}

interface Municipio {
  municipio: string;
  parcelas: Parcel[];
}

interface Provincia {
  provincia: string;
  municipios: Municipio[];
}

interface Community {
  comunidad: string;
  provincias: Provincia[];
  descripcion: string[];
}

interface TownListProps {
  communitiesData: any[];
  onParcelClick: (parcel: string) => void;
  handleToggleClick: (leyendaName: string) => void;
  handleMunicipioToggleClick: (municipio: string) => void; // Updated parameter name
  activeToggles: any;
  selectedProgram: any;
  programsInfo: any;
  sideBarSelectedOption: any;
}

const TownList: React.FC<TownListProps> = ({
  communitiesData,
  onParcelClick,
  handleToggleClick,
  handleMunicipioToggleClick,
  activeToggles,
  selectedProgram,
  programsInfo,
  sideBarSelectedOption,
}) => {
  const [selectedProgramName, setSelectedProgramName] = useState("");

  const loadTownsData = async (selectedProgram: string) => {
    try {
      const data = await import(
        `../../../app/data/listado_de_programas/programs.json`
      );
      const programData = data.default || data;

      const selectedProgramData = programData.find(
        (program: any) => program.comunidadArchivo === selectedProgram
      );

      if (selectedProgramData) {
        setSelectedProgramName(selectedProgramData.programa);
      } else {
        console.log("No matching program found for:", selectedProgram);
      }
    } catch (error) {
      console.error("Error loading towns data:", error);
    }
  };

  useEffect(() => {
    if (selectedProgram) {
      loadTownsData(selectedProgram);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProgram]);

  return (
    <div>
      <div>
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          {selectedProgramName}
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem 0",
          }}
        >
          <ul>
            {programsInfo &&
              programsInfo.map((item: any, idx: any) => (
                <li key={idx}>{item}</li>
              ))}
          </ul>
        </div>
      </div>
      {communitiesData.map((communityData: any, index: any) => (
        <TreeMenu
          key={index}
          title={communityData.comunidad}
          selectedProgram={selectedProgram}
          sideBarSelectedOption={sideBarSelectedOption}
        >
          {communityData.provincias.map((province: any) => (
            <TreeMenu
              key={province.provincia}
              title={province.provincia}
              sideBarSelectedOption={sideBarSelectedOption}
            >
              <ul className={styles.menu}>
                {province.municipios.map((municipio: any) => {
                  const municipioChecked =
                    activeToggles[municipio.municipio] || false;

                  // Handle municipio toggle
                  const handleMunicipioClick = () => {
                    handleMunicipioToggleClick(municipio.municipio);
                  };

                  return (
                    <TreeMenu
                      sideBarSelectedOption={sideBarSelectedOption}
                      key={municipio.municipio}
                      title={
                        <div className={styles.municipioWrapper}>
                          <label className={styles.toggleSwitch}>
                            <input
                              type="checkbox"
                              checked={municipioChecked}
                              onChange={handleMunicipioClick}
                            />
                            <span
                              className={styles.slider}
                              style={{
                                backgroundColor: municipioChecked
                                  ? "#4CAF50"
                                  : "#ccc",
                              }}
                            ></span>
                            <span className={styles.label}>
                              {municipio.municipio}
                            </span>
                          </label>
                        </div>
                      }
                    >
                      <ul className={styles.parcelList}>
                        {municipio.parcelas.map((parcel: any) => {
                          const leyenda = parcel.properties?.leyenda;
                          const isChecked =
                            activeToggles[leyenda?.name || ""] || false;
                          return (
                            <li key={leyenda?.name || parcel.parcela}>
                              <label className={styles.toggleSwitch}>
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() =>
                                    leyenda && handleToggleClick(leyenda.name)
                                  }
                                />
                                <span
                                  className={styles.slider}
                                  style={{
                                    backgroundColor: isChecked
                                      ? leyenda?.color
                                      : "#ccc",
                                  }}
                                ></span>
                                <span className={styles.label}>
                                  {leyenda?.label || "Unnamed Parcel"}
                                </span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </TreeMenu>
                  );
                })}
              </ul>
            </TreeMenu>
          ))}
        </TreeMenu>
      ))}
    </div>
  );
};

export default TownList;
