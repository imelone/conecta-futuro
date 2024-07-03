import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import routingOptions from "./routingOptions";

const RoutingMachine = ({ startPoint, endPoint }) => {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  useEffect(() => {
    const routingControl = L.Routing.control(routingOptions).addTo(map);
    routingControlRef.current = routingControl;
  }, [map]);

  useEffect(() => {
    if (routingControlRef.current && startPoint && endPoint) {
      routingControlRef.current.setWaypoints([
        L.latLng(startPoint.lat, startPoint.lng),
        L.latLng(endPoint.lat, endPoint.lng),
      ]);
    }
  }, [startPoint, endPoint]);

  return null;
};

export default RoutingMachine;
