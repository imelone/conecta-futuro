/* eslint-disable @next/next/no-img-element */
// src/components/sidenav/index.tsx

import React, { useState } from "react";
import "./sidenav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRecycle,
  faUser,
  faCog,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import TownList from "../regions/page"; // Ensure this path is correct
import citiesData from "../regions/municipios.json";
import logo from "../../../public/logo.png"; // Ensure this path is correct

interface SidebarProps {
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
}

const Sidebar: React.FC<SidebarProps> = ({
  onToggle,
  handleTownClick,
  setIsDataAnalysisMenuOpen,
  handleToggleClick,
  activeToggles,
}) => {
  const [optionOpen, setOptionOpen] = useState<string | null>(null);
  const [selectedTown, setSelectedTown] = useState<string | null>(null);

  const handleOptionClick = (optionName: string) => {
    setOptionOpen((prevOption) =>
      optionName === prevOption ? null : optionName
    );
    setSelectedTown(null); // Reset selected town when switching options
  };

  const handleTownSelection = (town: string) => {
    setSelectedTown(town);
    handleTownClick(town);
  };

  return (
    <div
      id="sidebar"
      className={`leaflet-sidebar ${optionOpen ? "expanded" : "collapsed"}`}
    >
      <div className="leaflet-sidebar-tabs">
        <ul role="tablist">
          <div className="sidebar-logo">
            <img src="/logo.png" alt="Logo" className="sidebar-logo-image" />
          </div>
          <li>
            <a
              href="#home"
              role="tab"
              onClick={() => handleOptionClick("home")}
              className={optionOpen === "home" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faHouse} size="2x" />
            </a>
          </li>
          <li>
            <a
              href="#profile"
              role="tab"
              onClick={() => handleOptionClick("profile")}
              className={optionOpen === "profile" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faRecycle} size="2x" />
            </a>
          </li>
          <li>
            <a
              href="#district"
              role="tab"
              onClick={() => handleOptionClick("district")}
              className={optionOpen === "district" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faMap} size="2x" />
            </a>
          </li>
          <li>
            <a
              href="#sustainability"
              role="tab"
              onClick={() => handleOptionClick("sustainability")}
              className={optionOpen === "sustainability" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faUser} size="2x" />
            </a>
          </li>
          <li>
            <a
              href="#settings"
              role="tab"
              onClick={() => handleOptionClick("settings")}
              className={optionOpen === "settings" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faCog} size="2x" />
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
            <TownList
              citiesData={citiesData}
              onTownClick={handleTownSelection}
            />
          ) : (
            <div>
              <div className="section">
                <h2 className="section-title">{selectedTown}</h2>
                <div className="nested-options">
                  <h3 className="section-title">
                    Sostenibilidad del municipio
                  </h3>
                  <ul className="info-list">
                    <li>
                      Superficie arbolada
                      <div className="info">15 Km2</div>
                    </li>
                    <li>
                      Huella de CO2
                      <div className="info">0.01 tCO2e</div>
                    </li>
                    <li>
                      Árboles x especie
                      <div className="info">15% Robles</div>
                      <div className="info">35% Algarrobo</div>
                      <div className="info">50% Madroño</div>
                    </li>
                    <li>
                      T. CO2 guardadas
                      <div className="info">0.71 tCO2e</div>
                    </li>
                    <li>
                      T. x captar en los próximos 4 años
                      <div className="info">1.12 tCO2e</div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="separator-line"></div>
              <div className="nested-options">
                <div className="toggle-container">
                  <h3 className="section-title">Bosques</h3>
                  {/* Added title for toggles */}
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={activeToggles.elCorcho}
                      onChange={() => handleToggleClick("elCorcho")}
                    />
                    <span className="slider"></span>
                    <span className="label">El Corcho</span>
                  </label>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={activeToggles.losCarrizales}
                      onChange={() => handleToggleClick("losCarrizales")}
                    />
                    <span className="slider"></span>
                    <span className="label">Los Carrizales</span>
                  </label>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={activeToggles.cerroBallestero1}
                      onChange={() => handleToggleClick("cerroBallestero1")}
                    />
                    <span className="slider"></span>
                    <span className="label">Cerro Ballestero 1</span>
                  </label>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={activeToggles.cerroBallestero2}
                      onChange={() => handleToggleClick("cerroBallestero2")}
                    />
                    <span className="slider"></span>
                    <span className="label">Cerro Ballestero 2</span>
                  </label>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={activeToggles.laHerencia}
                      onChange={() => handleToggleClick("laHerencia")}
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
            optionOpen === "messages" ? "active" : ""
          }`}
          id="messages"
        >
          <h1 className="sidebar-header">Messages</h1>
          <p>Messages content goes here...</p>
        </div>
        <div
          className={`sidebar-pane ${
            optionOpen === "settings" ? "active" : ""
          }`}
          id="settings"
        >
          <h1 className="sidebar-header"></h1>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
