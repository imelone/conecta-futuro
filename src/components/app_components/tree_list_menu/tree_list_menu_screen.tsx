// TreeListMenu.jsx
import React from "react";
import TreeMenu from "../../ui-components/tree_menu/tree_menu";

const TreeListMenu = ({ data }: any) => {
  console.log("dataMenuTree:", data);

  return (
    <div>
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

export default TreeListMenu;
