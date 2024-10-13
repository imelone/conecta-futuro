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
import citiesData from "../ui-components/regions/municipios.json";
import chiclanaLogo from "../../../public/images/icons/chiclana-logo.png";
import styled from "@emotion/styled";
import { useSidebarViewModel } from "./sidenav_view_model";
import Image from "next/image";
interface SidebarViewModelProps {
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
  handleProvinceClick: (province: string) => void; // New handler for provinces
  handleDistrictClick: (district: string) => void; // New handler for districts
}

const CustomIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem; /* Adjust the size here as needed */
`;
const handleDistrictSelection = (district: string) => {
  // Handle district selection logic
};
const Sidebar: React.FC<SidebarViewModelProps> = (props) => {
  const { optionOpen, selectedTown, handleOptionClick, handleTownSelection } =
    useSidebarViewModel(props);

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
          <h1 className="sidebar-header"></h1>
          <p></p>
        </div>
        <div
          className={`sidebar-pane ${optionOpen === "profile" ? "active" : ""}`}
          id="profile"
        >
          <h1 className="sidebar-header"></h1>
          <p></p>
        </div>
        <div
          className={`sidebar-pane ${
            optionOpen === "district" ? "active" : ""
          }`}
          id="district"
        >
          {!selectedTown ? (
            // <TownList
            //   citiesData={citiesData}
            //   onDistrictClick={handleTownSelection}
            // />
            <TownList
              communitiesData={citiesData} // Ensure this now contains the new structure
              onParcelClick={handleDistrictSelection}
            />
          ) : (
            <div>
              <div className="section">
                <div className="header-container">
                  <Image
                    src={chiclanaLogo}
                    alt="Chiclana de Segura"
                    className="town-image"
                  />
                  <h2 className="section-title">{selectedTown}</h2>
                </div>
                <div className="nested-options">
                  <p className="text">
                    Chiclana de Segura está situado a 128 km de Jaén, en la
                    comarca de El Condado. Tiene una superficie de 236 km2, una
                    altitud de 900 m y una población de 1.194 habitantes. Está
                    incluida en el Parque Natural de las Sierras de Cazorla,
                    Segura y Las Villas. Su territorio es forestal,
                    principalmente en la zona norte, ocupando dos terceras
                    partes de su extensión, el tercio sur es fundamentalmente
                    olivarero. Sus bosques se encuentran repoblados de
                    coníferas, coexistiendo con zonas de matorral, y encierran
                    gran interés natural debido a sus parajes y a la flora y
                    fauna autóctonas, destacando el entorno del río y del
                    embalse del Guadalmena. Chiclana de Segura es rica también
                    en recursos cinegéticos de caza mayor y menor.
                  </p>
                </div>
              </div>
              <div className="separator-line"></div>
              <div className="nested-options">
                <div className="toggle-container">
                  <h3 className="section-title">Programas</h3>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={props.activeToggles.elCorcho}
                      onChange={() => props.handleToggleClick("elCorcho")}
                    />
                    <span className="slider"></span>
                    <span className="label">El Corcho</span>
                  </label>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={props.activeToggles.losCarrizales}
                      onChange={() => props.handleToggleClick("losCarrizales")}
                    />
                    <span className="slider"></span>
                    <span className="label">Los Carrizales</span>
                  </label>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={props.activeToggles.cerroBallestero1}
                      onChange={() =>
                        props.handleToggleClick("cerroBallestero1")
                      }
                    />
                    <span className="slider"></span>
                    <span className="label">Cerro Ballestero 1</span>
                  </label>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={props.activeToggles.cerroBallestero2}
                      onChange={() =>
                        props.handleToggleClick("cerroBallestero2")
                      }
                    />
                    <span className="slider"></span>
                    <span className="label">Cerro Ballestero 2</span>
                  </label>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={props.activeToggles.laHerencia}
                      onChange={() => props.handleToggleClick("laHerencia")}
                    />
                    <span className="slider"></span>
                    <span className="label">La Herencia</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className={`sidebar-pane ${
            optionOpen === "sustainability" ? "active" : ""
          }`}
          id="sustainability"
        >
          <h1 className="sidebar-header">Sustainability</h1>
          <p></p>
        </div>
        <div
          className={`sidebar-pane ${
            optionOpen === "settings" ? "active" : ""
          }`}
          id="settings"
        >
          <h1 className="sidebar-header">Settings</h1>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
