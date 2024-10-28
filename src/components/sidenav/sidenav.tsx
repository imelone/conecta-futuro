import React from "react";
import "./sidenav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRecycle,
  faUser,
  faCog,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import TownList from "../app_components/town_tree_menu/town_tree_menu_screen";
import TreeListMenu from "../app_components/tree_list_menu/tree_list_menu_screen"; // Import your TreeListMenu component
import styled from "@emotion/styled";
import { useSidebarViewModel } from "./sidenav_view_model";
import Image from "next/image";

interface SidebarViewModelProps {
  programsList: any;
  onToggle: (toggleName: string, isActive: boolean) => void;
  handleTownClick: (town: string) => void;
  setIsDataAnalysisMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleToggleClick: (toggleName: string) => void;
  activeToggles: {
    [key: string]: boolean;
    elCorcho: boolean;
    losCarrizales: boolean;
    cerroBallestero1: boolean;
    cerroBallestero2: boolean;
    laHerencia: boolean;
  };
  sectionMainImg: any;
  handleProvinceClick: (province: string) => void;
  handleDistrictClick: (district: string) => void;
  handleProgramSelection: any;
  selectedProgram: any;
  townsData: any;
  selectedTown: any;
  handleMunicipioToggleClick: any;
  selectedProvince: any;
  selectedDistrict: any;
  optionOpen: any;
  handleProvinceSelection: any;
  handleTownSelection: any;
  handleOptionClick: any;
  programsInfo: any;
  handleDistrictSelection?: (district: string) => void;
  sideBarSelectedOption: any;
}

const CustomIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem; /* Adjust the size here as needed */
`;

const Sidebar: React.FC<SidebarViewModelProps> = (props) => {
  const {
    programsList,
    optionOpen,
    selectedTown,
    sectionMainImg,
    handleOptionClick,
    handleTownSelection,
    handleToggleClick,
    handleMunicipioToggleClick,
    activeToggles,
    handleProgramSelection,
    selectedProgram,
    townsData,
    programsInfo,
    sideBarSelectedOption,
  } = useSidebarViewModel(props);

  console.log({
    programsList,
    optionOpen,
    selectedTown,
    sideBarSelectedOption,
    activeToggles,
    selectedProgram,
    sectionMainImg,
    townsData,
    programsInfo,
  });

  // Extract the content logic for the district pane
  let districtContent;
  if (selectedProgram == "certificaciones") {
    districtContent = <TreeListMenu data={townsData} />;
  } else if (selectedTown || !townsData) {
    districtContent = <div>{/* Handle selected town content here */}</div>;
  } else {
    districtContent = (
      <TownList
        sectionMainImg={sectionMainImg}
        communitiesData={townsData}
        programsInfo={programsInfo}
        onParcelClick={handleTownSelection}
        handleToggleClick={handleToggleClick}
        handleMunicipioToggleClick={handleMunicipioToggleClick}
        activeToggles={activeToggles}
        selectedProgram={selectedProgram}
        sideBarSelectedOption={sideBarSelectedOption}
      />
    );
  }

  return (
    <div
      id="sidebar"
      className={`leaflet-sidebar ${
        optionOpen && optionOpen !== "home" ? "expanded" : "collapsed"
      }`}
    >
      <div className="leaflet-sidebar-tabs">
        <ul role="tablist">
          <div className="sidebar-logo">
            <Image
              src="/images/icons/logo.png"
              alt="Logo"
              className="sidebar-logo-image"
              layout="intrinsic"
              width={100}
              height={100}
            />
          </div>
          <li>
            <a
              href="#home"
              role="tab"
              onClick={() => handleOptionClick("home")}
              className={optionOpen === "home" ? "active" : ""}
            >
              <CustomIcon icon={faHouse} size="2x" />
            </a>
          </li>
          <li>
            <a
              href="#profile"
              role="tab"
              onClick={() => handleOptionClick("profile")}
              className={optionOpen === "profile" ? "active" : ""}
            >
              <CustomIcon icon={faRecycle} size="2x" />
            </a>
          </li>
          <li>
            <a
              href="#district"
              role="tab"
              onClick={() => handleOptionClick("district")}
              className={optionOpen === "district" ? "active" : ""}
            >
              <CustomIcon icon={faMap} size="2x" />
            </a>
          </li>
          <li>
            <a
              href="#sustainability"
              role="tab"
              onClick={() => handleOptionClick("sustainability")}
              className={optionOpen === "sustainability" ? "active" : ""}
            >
              <CustomIcon icon={faUser} size="2x" />
            </a>
          </li>
          <li>
            <a
              href="#settings"
              role="tab"
              onClick={() => handleOptionClick("settings")}
              className={optionOpen === "settings" ? "active" : ""}
            >
              <CustomIcon icon={faCog} size="2x" />
            </a>
          </li>
        </ul>
      </div>

      <div className="sidebar-content">
        <div
          className={`sidebar-pane ${
            optionOpen === "district" ? "active" : ""
          }`}
          id="district"
        >
          <h2 style={{ marginBottom: "1rem" }}>PROGRAMAS</h2>
          <ul>
            {programsList.map((program: any) => (
              <li key={program.comunidadArchivo}>
                <button
                  onClick={() =>
                    handleProgramSelection(program.comunidadArchivo)
                  }
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    margin: 0,
                    color: "black",
                    textDecoration: "none",
                    cursor: "pointer",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h3
                    style={{
                      marginBottom: "1rem",
                      margin: 0,
                      textAlign: "center",
                    }}
                  >
                    {program.programa}
                  </h3>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`sidebar-pane ${
            optionOpen === "districts" ? "active" : ""
          }`}
          id="districts"
        >
          {districtContent}
        </div>

        <div
          className={`sidebar-pane ${
            optionOpen === "sustainability" ? "active" : ""
          }`}
          id="sustainability"
        >
          <h1 className="sidebar-header">Sustainability</h1>
          <p>Sustainability content goes here.</p>
        </div>
        <div
          className={`sidebar-pane ${
            optionOpen === "settings" ? "active" : ""
          }`}
          id="settings"
        >
          <h1 className="sidebar-header">Settings</h1>
          <p>Settings content goes here.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
