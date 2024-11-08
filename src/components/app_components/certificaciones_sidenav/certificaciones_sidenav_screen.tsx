// TreeListMenu.jsx
import React from "react";
import TreeMenu from "../../ui-components/tree_menu/tree_menu";
import Image from "next/image";
import styles from "./styles.module.css";
const CertificacionesSideNav: React.FC<any> = ({ data, sectionMainImg }) => {
  return (
    <div>
      <h3 style={{ marginBottom: "1rem", textAlign: "center" }}>
        CERTIFICACIONES
      </h3>
      <div className={styles.logoContainer}>
        {sectionMainImg && (
          <Image
            src={`/assets/images/sections_menu_main/${sectionMainImg}.png`}
            alt="Logo"
            className="sidebar-logo-image"
            layout="intrinsic" // Or other layout options as necessary
            width={300}
            height={300}
          />
        )}
      </div>
      {data?.map((cert: { title: any; items: any[] }, certIndex: any) => (
        <TreeMenu
          key={`cert-${certIndex}`}
          title={cert.title} // Each certification title directly at the top level
          level={0}
          sideBarSelectedOption=""
        >
          <ul>
            {cert?.items?.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li> // Each item displayed as a list item
            ))}
          </ul>
        </TreeMenu>
      ))}
    </div>
  );
};

export default CertificacionesSideNav;
