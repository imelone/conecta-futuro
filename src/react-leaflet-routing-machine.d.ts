declare module "react-leaflet-routing-machine" {
  import { MapLayer } from "react-leaflet";
  import * as L from "leaflet";

  class Routing extends MapLayer {
    createLeafletElement(props: any): L.Routing.Control;
  }

  export default Routing;
}
