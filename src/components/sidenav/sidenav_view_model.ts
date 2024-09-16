// src/components/sidenav/SidebarViewModel.ts

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
}

export const useSidebarViewModel = ({
  onToggle,
  handleTownClick,
  setIsDataAnalysisMenuOpen,
  handleToggleClick,
  activeToggles,
}: SidebarViewModelProps) => {
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

  return {
    optionOpen,
    selectedTown,
    handleOptionClick,
    handleTownSelection,
  };
};
