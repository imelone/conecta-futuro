import { useState } from "react";

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

export const useSidebarViewModel = ({
  onToggle,
  handleTownClick,
  setIsDataAnalysisMenuOpen,
  handleToggleClick,
  activeToggles,
  handleProvinceClick,
  handleDistrictClick, // Add the new handlers to the props
}: SidebarViewModelProps) => {
  const [optionOpen, setOptionOpen] = useState<string | null>(null);
  const [selectedTown, setSelectedTown] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null); // State for the selected province
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null); // State for the selected district

  const handleOptionClick = (optionName: string) => {
    setOptionOpen((prevOption) =>
      optionName === prevOption ? null : optionName
    );
    setSelectedTown(null); // Reset selected town when switching options
    setSelectedProvince(null); // Reset selected province
    setSelectedDistrict(null); // Reset selected district
  };

  const handleTownSelection = (town: string) => {
    setSelectedTown(town);
    handleTownClick(town);
  };

  const handleProvinceSelection = (province: string) => {
    setSelectedProvince(province);
    handleProvinceClick(province);
    setSelectedDistrict(null); // Reset district selection when province changes
    setSelectedTown(null); // Reset town selection when province changes
  };

  const handleDistrictSelection = (district: string) => {
    setSelectedDistrict(district);
    handleDistrictClick(district);
    setSelectedTown(null); // Reset town when district changes
  };

  return {
    optionOpen,
    selectedTown,
    selectedProvince, // Expose province state
    selectedDistrict, // Expose district state
    handleOptionClick,
    handleTownSelection,
    handleProvinceSelection, // Expose province selection handler
    handleDistrictSelection, // Expose district selection handler
  };
};
