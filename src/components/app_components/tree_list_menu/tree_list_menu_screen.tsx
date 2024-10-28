// TreeListMenu.jsx
import React from "react";
import TreeMenu from "../../ui-components/tree_menu/tree_menu";

const TreeListMenu = ({ data }) => {
  console.log("dataMenuTree:", data);

  return (
    <div>
      {data?.map((node, index) => {
        if (Array.isArray(node.certificaciones)) {
          console.log("Rendering certificaciones:", node.certificaciones);
          return (
            <TreeMenu
              key={`certificaciones-${index}`}
              title="Certificaciones"
              level={0}
              sideBarSelectedOption=""
            >
              {node.certificaciones.map((cert, certIndex) => (
                <TreeMenu
                  key={`cert-${certIndex}`}
                  title={cert.title}
                  level={1}
                  sideBarSelectedOption=""
                >
                  {cert.items.map((item, itemIndex) => (
                    <div key={itemIndex}>{item}</div>
                  ))}
                </TreeMenu>
              ))}
            </TreeMenu>
          );
        }
        return null;
      })}
    </div>
  );
};

export default TreeListMenu;
