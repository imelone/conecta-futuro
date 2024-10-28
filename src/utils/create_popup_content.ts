export const PopupContent = (data: {
  properties: { catastrales: { image: any }; leyenda: { label: any } };
}) => {
  const image = data.properties?.catastrales?.image;
  const title = data.properties?.leyenda?.label;

  if (image) {
    return `
        <div class="image-container">
          <h3>${title}</h3>
          <img src="/assets/images/maps/${image}" alt="Catastrales image" class="popup-image" />
        </div>
      `;
  }
  return "";
};
