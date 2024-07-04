import Link from "next/link";
import styles from "./region.module.css";

interface TownListProps {
  citiesData: {
    town: string[];
    // Add any other required properties with their types
  };
  onTownClick: (town: string) => void;
}

const TownList: React.FC<TownListProps> = ({ citiesData, onTownClick }) => {
  console.log("onTownClick: ", onTownClick);
  const { town } = citiesData;
  return (
    <div>
      <h2 className={styles.title}>Distritos</h2>
      <div className={styles.scrollContainer}>
        <ul className={styles.menu}>
          {town.map((townName, index) => (
            <li key={index} className={styles.menuItem}>
              {townName === "Chiclana de Segura" ? (
                <a href="#" onClick={() => onTownClick(townName)}>
                  {townName}
                </a>
              ) : (
                <span className={styles.disabledLink}>{townName}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TownList;
