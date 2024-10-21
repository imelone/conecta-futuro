import { useState } from "react";

interface SidebarViewModelProps {
  programsList: any;
  onToggle: (toggleName: string, isActive: boolean) => void;
  handleTownClick: (town: string) => void;
  handleMunicipioToggleClick: (municipio: string) => void;
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
  handleProgramSelection: any;
  selectedProgram: any;
  townsData: any;
  optionOpen: any;
  handleProvinceSelection: any;
  handleTownSelection: any;
  handleOptionClick: any;
  selectedTown: any;
  selectedProvince: any;
  selectedDistrict: any;
  handleDistrictSelection?: any;
  programsInfo: any;
  sideBarSelectedOption: any;
}

export const useSidebarViewModel = ({
  programsList,
  onToggle,
  handleTownClick,
  setIsDataAnalysisMenuOpen,
  handleToggleClick,
  handleMunicipioToggleClick,
  activeToggles,
  handleProvinceClick,
  handleDistrictClick, // Add the new handlers to the props
  handleProgramSelection,
  selectedProgram,
  townsData,
  optionOpen,
  programsInfo,
  selectedTown,
  selectedProvince, // Expose province state
  selectedDistrict, // Expose district state
  handleOptionClick,
  handleTownSelection,
  handleProvinceSelection, // Expose province selection handler
  handleDistrictSelection,
  sideBarSelectedOption,
}: SidebarViewModelProps) => {
  return {
    programsList,
    optionOpen,
    selectedTown,
    selectedProvince, // Expose province state
    selectedDistrict, // Expose district state
    handleOptionClick,
    handleTownSelection,
    handleProvinceSelection, // Expose province selection handler
    handleDistrictSelection, // Expose district selection handler
    handleToggleClick,
    handleMunicipioToggleClick,
    activeToggles,
    handleProgramSelection,
    selectedProgram,
    townsData,
    programsInfo,
    sideBarSelectedOption,
  };
};
