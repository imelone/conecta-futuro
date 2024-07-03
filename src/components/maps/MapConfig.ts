import React from "react";
import i18next from "i18next";

import en from "./i18n/en";
import pt from "./i18n/pt";
import es from "./i18n/es";

i18next.addResourceBundle("en", "maps", en);
i18next.addResourceBundle("pt", "maps", pt);
i18next.addResourceBundle("es", "maps", es);

const MapConfig = {
  settings: {
    layout: {
      config: {
        settingsPanel: {
          display: false,
        },
      },
    },
  },
  auth: "menu",
  routes: [
    {
      path: "/map",
      component: React.lazy(() => import("./index")),
    },
  ],
};

export default MapConfig;
