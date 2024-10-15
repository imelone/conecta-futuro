import React from "react";
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
}

interface TownListProps {
  communitiesData: Community[];
  onParcelClick: (parcel: string) => void;
  handleToggleClick: (leyendaName: string) => void;
  activeToggles: any;
}

const TownList: React.FC<TownListProps> = ({
  communitiesData,
  onParcelClick,
  handleToggleClick,
  activeToggles,
}) => {
  console.log("Communities Data:", communitiesData);

  return (
    <div>
      {communitiesData.map((communityData, index) => (
        <TreeMenu key={index} title={communityData.comunidad}>
          {communityData.provincias.map((province) => (
            <TreeMenu key={province.provincia} title={province.provincia}>
              <ul className={styles.menu}>
                {province.municipios.map((municipio) => (
                  <TreeMenu
                    key={municipio.municipio}
                    title={municipio.municipio}
                  >
                    <ul className={styles.parcelList}>
                      {municipio.parcelas.map((parcel) => {
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
