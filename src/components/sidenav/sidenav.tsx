import React, { useEffect, useState } from "react";
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
import chiclanaLogo from "../../../public/images/icons/chiclana-logo.png";
import styled from "@emotion/styled";
import { useSidebarViewModel } from "./sidenav_view_model";
import Image from "next/image";
//import programsData from "../ui-components/regions/programs.json";

interface SidebarViewModelProps {
  programsData: any;
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
  selectedProvince: any;
  selectedDistrict: any;
  optionOpen: any;
  handleProvinceSelection: any;
  handleTownSelection: any;
  handleOptionClick: any;
  programsInfo: any;
  handleDistrictSelection?: (district: string) => void; // <-- Make this optional
}

const CustomIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem; /* Adjust the size here as needed */
`;

const Sidebar: React.FC<SidebarViewModelProps> = (props) => {
  const {
    programsData,
    optionOpen,
    selectedTown,
    handleOptionClick,
    handleTownSelection,
    handleToggleClick,
    activeToggles,
    handleProgramSelection,
    selectedProgram,
    townsData,
    programsInfo,
    selectedProvince,
    selectedDistrict,
    handleProvinceSelection,
  } = useSidebarViewModel(props);
  // const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  // const [townsData, setTownsData] = useState<any>(null);

  // useEffect(() => {
  //   if (selectedProgram) {
  //     loadTownsData(selectedProgram);
  //   }
  // }, [selectedProgram]);

  // const loadTownsData = async (comunidadArchivo: string) => {
  //   console.log("comunidadArchivo: ", comunidadArchivo);
  //   try {
  //     const towns = await import(`../../app/data/${comunidadArchivo}.json`);
  //     setTownsData(towns.default); // Access the default export from the JSON file
  //   } catch (error) {
  //     console.error("Error loading towns data:", error);
  //     setTownsData(null); // Reset towns data on error
  //   }
  // };

  // const handleProgramSelection = (comunidadArchivo: string) => {
  //   setSelectedProgram(comunidadArchivo);
  //   // Hide the district pane and show the towns pane
  //   handleOptionClick("towns");
  // };

  return (
    <div
      id="sidebar"
      className={`leaflet-sidebar ${optionOpen ? "expanded" : "collapsed"}`}
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
          className={`sidebar-pane ${optionOpen === "home" ? "active" : ""}`}
          id="home"
        >
          <h1 className="sidebar-header">Home</h1>
          <p>Home content goes here.</p>
        </div>
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
          <ul>
            {programsData.map((program: any) => (
              <li key={program.comunidadArchivo}>
                <a
                  href="#"
                  onClick={() =>
                    handleProgramSelection(program.comunidadArchivo)
                  }
                >
                  <h3
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    {program.programa}
                  </h3>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`sidebar-pane ${optionOpen === "towns" ? "active" : ""}`}
          id="towns"
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
              activeToggles={activeToggles}
              selectedProgram={selectedProgram}
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
