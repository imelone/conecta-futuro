const findParcelaInMunicipios = (toggleName: string, municipios: any[]) => {
  for (const municipio of municipios) {
    const foundParcela = municipio.parcelas.find(
      (parcela: { properties: { leyenda: { name: string } } }) =>
        parcela.properties?.leyenda?.name === toggleName
    );
    if (foundParcela) return foundParcela;
  }
  return null;
};

const findParcelaInProvincias = (toggleName: string, provincias: any[]) => {
  for (const provincia of provincias) {
    const foundParcela = findParcelaInMunicipios(
      toggleName,
      provincia.municipios
    );
    if (foundParcela) return foundParcela;
  }
  return null;
};

const findParcelaInComunidades = (toggleName: string, comunidades: any[]) => {
  for (const comunidad of comunidades) {
    const foundParcela = findParcelaInProvincias(
      toggleName,
      comunidad.provincias
    );
    if (foundParcela) return foundParcela;
  }
  return null;
};

export const findParcelaByName = (toggleName: string, townsList: any[]) => {
  return findParcelaInComunidades(toggleName, townsList);
};
