import React from "react";
import { TreeMenu } from "../tree_menu/tree_menu"; // Adjust the import path
import styles from "./region.module.css";

interface Parcel {
  parcela: string;
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
}

const TownList: React.FC<TownListProps> = ({
  communitiesData,
  onParcelClick,
}) => {
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
                      {municipio.parcelas.map((parcel) => (
                        <li key={parcel.parcela}>
                          <button
                            className={styles.districtButton}
                            onClick={() => onParcelClick(parcel.parcela)}
                          >
                            {parcel.parcela}
                          </button>
                        </li>
                      ))}
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
