import { useCallback, useEffect } from "react";

export const useGetTownsData = (
  selectedProgram: string | null,
  setTownsData: (data: any) => void,
  setProgramsInfo: (info: any) => void,
  setSectionMainImg: (img: string) => void,
  setSecondaryImage: (img: string) => void,
  setCertificacionesData: any,
  setIsDataAnalysisCertificacionesOpen: any,
  setIsDataAnalysisAulaVerdeOpen: any
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
      console.log("selectedProgram: ", selectedProgram);
      switch (selectedProgram) {
        case "certificaciones":
          setCertificacionesData(towns[1]?.certificaciones);
          setSectionMainImg(towns[0]?.image);
          setIsDataAnalysisCertificacionesOpen(true);
          break;
        case "aula-verde":
          setTownsData(towns[1]?.certificaciones);
          setSectionMainImg(towns[0]?.image);
          setIsDataAnalysisAulaVerdeOpen(true);
          break;
        case "sostenibilidad":
          console.log("sostenbilidad pasa");
          setTownsData(towns[1]?.distritos);
          setSectionMainImg(towns[0]?.image);
          setSecondaryImage(towns[0]?.secondaryImage);
          break;

        default:
          setTownsData(towns[1]?.distritos);
          break;
      }

      setProgramsInfo(towns[0]?.descripcion);
      setSectionMainImg(towns[0]?.image);
    } catch (error) {
      console.error("Error loading towns data:", error);
      setTownsData(null);
    }
  };

  useEffect(() => {
    loadTownsData();
  }, [
    selectedProgram,
    setTownsData,
    setProgramsInfo,
    setSectionMainImg,
    loadTownsData,
  ]);

  return { loadTownsData };
};
