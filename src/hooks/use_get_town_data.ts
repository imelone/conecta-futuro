import { useEffect } from "react";

export const useGetTownsData = (
  selectedProgram: string | null,
  setTownsData: (data: any) => void,
  setProgramsInfo: (info: any) => void,
  setSectionMainImg: (img: string) => void
) => {
  const loadTownsData = async () => {
    console.log("selectedProgram: ", selectedProgram);
    if (!selectedProgram) {
      console.warn("No program selected, cannot load towns data.");
      return;
    }

    try {
      const towns = await import(
        `../app/data/programas/${selectedProgram}.json`
      );

      if (
        selectedProgram === "certificaciones" ||
        selectedProgram === "aula-verde"
      ) {
        setTownsData(towns[1].certificaciones);
        setSectionMainImg(towns[0].image);
      } else {
        setTownsData(towns[1].distritos);
      }

      setProgramsInfo(towns[0].descripcion);
      setSectionMainImg(towns[0].image);
    } catch (error) {
      console.error("Error loading towns data:", error);
      setTownsData(null);
    }
  };

  useEffect(() => {
    loadTownsData();
  }, [selectedProgram, setTownsData, setProgramsInfo, setSectionMainImg]);

  return { loadTownsData };
};
