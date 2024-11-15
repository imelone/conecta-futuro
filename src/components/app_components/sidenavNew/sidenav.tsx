import React, { useState } from "react";
import "./sidenav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCog, faMap } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import Image from "next/image";

const CustomIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem; /* Adjust the size here as needed */
`;

const Sidebar: React.FC = () => {
  // Sample programList for District
  const programList = [
    { id: 1, name: "Program 1" },
    { id: 2, name: "Program 2" },
    { id: 3, name: "Program 3" },
  ];

  // State to manage the visibility of the submenu
  const [isDistrictOpen, setDistrictOpen] = useState(false);

  // Toggle submenu visibility
  const toggleDistrict = (e: React.MouseEvent) => {
    e.preventDefault();
    setDistrictOpen((prev) => !prev);
  };

  return (
    <div id="sidebar" className="leaflet-sidebar">
      <div className="leaflet-sidebar-tabs">
        <ul role="tablist">
          <div className="sidebar-logo">
            <Image
              src="/assets/images/icons/logo.png"
              alt="Logo"
              className="sidebar-logo-image"
              layout="intrinsic"
              width={100}
              height={100}
            />
          </div>
          <li>
            <a href="#home" role="tab">
              <CustomIcon icon={faHouse} size="2x" />
            </a>
          </li>
          <li>
            <a href="#district" role="tab" onClick={toggleDistrict}>
              <CustomIcon icon={faMap} size="2x" />
            </a>
          </li>
          <li>
            <a href="#settings" role="tab">
              <CustomIcon icon={faCog} size="2x" />
            </a>
          </li>
        </ul>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-pane" id="home">
          <h1>Home Content</h1>
        </div>

        <div
          className={`sidebar-pane ${isDistrictOpen ? "open" : ""}`}
          id="district"
        >
          <h1>District Content</h1>
          <h2>Programs List</h2>
          {/* Submenu for Program List */}
          <ul className={isDistrictOpen ? "submenu open" : "submenu"}>
            {programList.map((program) => (
              <li key={program.id}>{program.name}</li>
            ))}
          </ul>
        </div>

        <div className="sidebar-pane" id="settings">
          <h1>Settings Content</h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
