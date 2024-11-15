import React, { createContext, useContext, useState } from "react";

// Define the shape of the context's value
interface SidebarContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDistrictOpen: boolean;
  toggleDistrictOpen: () => void;
}

// Provide a default value (fallback)
const SidebarContext = createContext<SidebarContextValue>({
  activeTab: "home",
  setActiveTab: () => {},
  isDistrictOpen: false,
  toggleDistrictOpen: () => {},
});

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isDistrictOpen, setIsDistrictOpen] = useState<boolean>(false);

  const toggleDistrictOpen = () => setIsDistrictOpen((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isDistrictOpen,
        toggleDistrictOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
