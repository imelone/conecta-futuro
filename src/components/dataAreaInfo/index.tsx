import React from "react";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface AreaInfoComponentProps {
  areaLabel: string;
  areaName: string;
  areaText: string;
  areaColor: string;
  onClose: (name: string) => void;
  removeForestItem: (name: string) => void;
  toggleName: string;
  handleToggleClick: (name: string) => void;
}

const AreaInfoComponent: React.FC<AreaInfoComponentProps> = ({
  areaLabel,
  areaName,
  areaText,
  areaColor,
  onClose,
  removeForestItem,
  toggleName,
  handleToggleClick,
}) => {
  const handleClose = () => {
    onClose(areaName); // Call onClose with areaName
    removeForestItem(areaName); // Call removeForestItem with toggleName
    handleToggleClick(areaName);
  };

  return (
    <div className={styles.areaInfoComponent}>
      <div className={styles.header}>
        <h2 className={styles.title}>{areaLabel}</h2>
        <div>
          <div
            className={styles.colorCircle}
            style={{ backgroundColor: areaColor }}
          ></div>
          <div className={styles.icon}>
            <FontAwesomeIcon
              icon={faTimes}
              className={styles.closeIcon}
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
      <div className={styles.textContent}>
        <p>{areaText}</p>
      </div>
    </div>
  );
};

export default AreaInfoComponent;
