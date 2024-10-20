import React, { useEffect, useState } from "react";
import styles from "./tree_menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

interface AccordionProps {
  title: any;
  children: React.ReactNode;
  level?: number;
  selectedProgram?: string;
}

export const TreeMenu: React.FC<AccordionProps> = ({
  title,
  children,
  level = 0,
  selectedProgram,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // console.log("children: ", children);
    setIsOpen(false);
  }, [selectedProgram]);

  const toggleContent = () => {
    setIsOpen((prev) => !prev);
  };

  const levelClassName = `level-${level}`;

  return (
    <div className={`${styles.container} ${styles[levelClassName]}`}>
      <div className={styles.header} onClick={toggleContent}>
        <span className={styles.icon}>
          <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} />
        </span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default TreeMenu;
