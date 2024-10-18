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
  activeToggles: any;
  selectedProgram: any;
  programsInfo: any;
}

const TownList: React.FC<TownListProps> = ({
  communitiesData,
  onParcelClick,
  handleToggleClick,
  activeToggles,
  selectedProgram,
  programsInfo,
}) => {
  const [selectedProgramName, setSelectedProgamName] = useState("");
  const [districtsArray, setDistrictsArray] = useState([]);
  const loadTownsData = async (selectedProgram: string) => {
    try {
      const data = await import(
        `../../../app/data/listado_de_programas/programs.json`
      );
      console.log("communitiesData:", communitiesData);
      // Check if the imported data is an object with a 'default' array
      const programData = data.default || data;

      // Find the program that matches the selectedProgram (comunidadArchivo)
      const selectedProgramData = programData.find(
        (program: any) => program.comunidadArchivo === selectedProgram
      );

      if (selectedProgramData) {
        setSelectedProgamName(selectedProgramData.programa);

        // You can now use selectedProgramData.programa where needed
      } else {
        console.log("No matching program found for:", selectedProgram);
      }
    } catch (error) {
      console.error("Error loading towns data:", error);
    }
  };

  useEffect(() => {
    console.log("programsInfo: ", programsInfo);
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
              programsInfo?.map((item: any, idx: any) => (
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
        >
          {communityData.provincias.map((province: any) => (
            <TreeMenu key={province.provincia} title={province.provincia}>
              <ul className={styles.menu}>
                {province.municipios.map((municipio: any) => (
                  <TreeMenu
                    key={municipio.municipio}
                    title={municipio.municipio}
                  >
                    <ul className={styles.parcelList}>
                      {municipio.parcelas.map((parcel: any) => {
                        // Check if leyenda exists before rendering its values
                        const leyenda = parcel.properties?.leyenda;
                        const isChecked =
                          activeToggles[leyenda?.name || ""] || false;
                        return (
                          <li key={leyenda?.name || parcel.parcela}>
                            <label className={styles.toggleSwitch}>
                              <input
                                type="checkbox"
                                checked={
                                  activeToggles[leyenda?.name || ""] || false
                                }
                                onChange={() =>
                                  leyenda && handleToggleClick(leyenda.name)
                                }
                              />
                              <span
                                className={styles.slider}
                                style={{
                                  backgroundColor: isChecked
                                    ? leyenda?.color
                                    : "#ccc", // Use leyenda color when checked, otherwise gray
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
                ))}
              </ul>
            </TreeMenu>
          ))}
        </TreeMenu>
      ))}
    </div>
  );
};

export default TownList;
