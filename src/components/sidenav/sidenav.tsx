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
import TownList from "../ui-components/regions/page";
//import chiclanaLogo from "../../../public/images/icons/chiclana-logo.png";
import styled from "@emotion/styled";
import { useSidebarViewModel } from "./sidenav_view_model";
import Image from "next/image";
//import programsData from "../ui-components/regions/programs.json";

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
              layout="intrinsic" // Layout for the image
              width={100} // Width of the image
              height={100} // Height of the image
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
          className={`sidebar-pane ${optionOpen === "profile" ? "active" : ""}`}
          id="profile"
        >
          <h1 className="sidebar-header">Profile</h1>
          <p>Profile content goes here.</p>
        </div>
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
                    width: "100%", // Ensures the button takes up full width
                    display: "flex", // Flexbox to center content
                    justifyContent: "center", // Centers horizontally
                    alignItems: "center", // Centers vertically
                  }}
                >
                  <h3
                    style={{
                      marginBottom: "1rem", // Preserves margin for spacing
                      margin: 0, // Reset margin on h3 for more control
                      textAlign: "center", // Ensures h3 content is centered
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
          {selectedTown || !townsData ? (
            <div>
              {/* Handle selected town content here */}
              {/* <h2>{selectedTown}</h2>
              <Image
                src={chiclanaLogo}
                alt="Chiclana de Segura"
                className="town-image"
              /> */}
              {/* Additional town details here */}
            </div>
          ) : (
            <TownList
              communitiesData={townsData}
              programsInfo={programsInfo}
              onParcelClick={handleTownSelection}
              handleToggleClick={handleToggleClick}
              handleMunicipioToggleClick={handleMunicipioToggleClick}
              activeToggles={activeToggles}
              selectedProgram={selectedProgram}
              sideBarSelectedOption={sideBarSelectedOption}
            />
          )}
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
