const findParcelaInLevels = (
  toggleName: string,
  items: any[],
  levels: string[]
): any | null => {
  for (const item of items) {
    // Check for parcelas at the current level
    const foundParcela = item.parcelas?.find(
      (parcela: { properties: { leyenda: { name: string } } }) =>
        parcela.properties?.leyenda?.name === toggleName
    );

    if (foundParcela) {
      return foundParcela; // Return if found
    }

    // If there are more levels to check
    if (levels.length > 0) {
      const nextLevelKey = levels[0]; // Get the next level key
      const foundInNested = findParcelaInLevels(
        toggleName,
        item[nextLevelKey],
        levels.slice(1)
      );
      if (foundInNested) return foundInNested; // Return if found in nested levels
    }
  }
  return null; // Return null if not found in any levels
};

export const findParcelaByName = (
  toggleName: string,
  townsList: any[],
  levels: string[]
) => {
  return findParcelaInLevels(toggleName, townsList, levels);
};
