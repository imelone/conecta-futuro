// TreeListMenu.jsx
import React from "react";
import TreeMenu from "../../ui-components/tree_menu/tree_menu";

const AulaVerdeSideNav = ({ data }: any) => {
  return (
    <div>
      <h3 style={{ marginBottom: "1rem", textAlign: "center" }}>AULA VERDE</h3>
      {data?.map(
        (
          cert: { title: any; items: { label: string; pdfUrl: string }[] },
          certIndex: any
        ) => (
          <TreeMenu
            key={`cert-${certIndex}`}
            title={cert.title} // Each certification title directly at the top level
            level={0}
            sideBarSelectedOption=""
          >
            <ul>
              {cert?.items?.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <a href={item?.pdfUrl} download>
                    {item?.label}
                  </a>
                </li> // Each item displayed as a list item with a download link
              ))}
            </ul>
          </TreeMenu>
        )
      )}
    </div>
  );
};

export default AulaVerdeSideNav;
