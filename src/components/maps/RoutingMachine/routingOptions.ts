import L from "leaflet";

import viaIcon from "./customMarkers/marker-via-icon-2x.png";
import startIcon from "./customMarkers/marker-start-icon-2x.png";
import endIcon from "./customMarkers/marker-end-icon-2x.png";

const routingOptions = {
  // waypoints: [L.latLng(1.350794, 103.83595), L.latLng(1.392755, 103.91367)],
  routeWhileDragging: true,
  showAlternatives: true,
  containerClassName: "hidden",
  router: new L.Routing.OSRMv1({
    serviceUrl: "https://routing.openstreetmap.de/routed-car/route/v1",
    profile: "driving",
    timeout: 30 * 1000,
    routingOptions: {
      alternatives: false,
      steps: true,
    },
    polylinePrecision: 5,
    useHints: true,
    suppressDemoServerWarning: false,
    language: "es",
  }),
  plan: new L.Routing.Plan([], {
    createMarker(i, wp, n) {
      let iconUrl = viaIcon.src;
      if (i === 0) {
        iconUrl = startIcon.src;
      }

      if (i === n - 1) {
        iconUrl = endIcon.src;
      }

      const options = {
        draggable: true,
        icon: new L.Icon({ iconUrl, iconSize: [20, 56], iconAnchor: [10, 28] }),
      };

      const marker = L.marker(wp.latLng, options);

      return marker;
    },
  }),
  formatter: new L.Routing.Formatter({
    language: "es",
    roundingSensitivity: 2,
    distanceTemplate: "{value} {unit}",
  }),
  lineOptions: {
    extendToWaypoints: true,
    missingRouteTolerance: 0,
    styles: [
      {
        color: "#022bb1",
        opacity: 0.8,
        weight: 8,
      },
      {
        color: "white",
        opacity: 0.3,
        weight: 6,
      },
    ],
  },
  altLineOptions: {
    extendToWaypoints: true,
    missingRouteTolerance: 0,
    styles: [
      {
        color: "#40007d",
        opacity: 0.4,
        weight: 8,
      },
      {
        color: "black",
        opacity: 0.5,
        weight: 2,
        dashArray: "2,4",
      },
      {
        color: "white",
        opacity: 0.3,
        weight: 6,
      },
    ],
  },
};

export default routingOptions;
