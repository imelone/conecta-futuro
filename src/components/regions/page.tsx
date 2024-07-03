// src/components/regions/TownList.js
import Link from "next/link";
import styles from "./region.module.css";

const TownList = ({ citiesData, onTownClick }) => {
  console.log("onTownClick: ", onTownClick);
  const { town } = citiesData;
  return (
    <div>
      <h2 className={styles.title}>Distritos</h2>
      <div className={styles.scrollContainer}>
        <ul className={styles.menu}>
          {town.map((town, index) => (
            <li key={index} className={styles.menuItem}>
              {town === "Chiclana de Segura" ? (
                <a href="#" onClick={() => onTownClick(town)}>
                  {town}
                </a>
              ) : (
                <span className={styles.disabledLink}>{town}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TownList;
