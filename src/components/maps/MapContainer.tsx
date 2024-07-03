import React, { useState } from "react";
import Map from "./Map/index";
import Drawer from "@mui/material/Drawer";

function MapContainer() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Map />
      <Drawer
        variant="persistent"
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        style={{ position: "absolute" }}
      >
        <div>Oi</div>
      </Drawer>
    </>
  );
}

export { MapContainer };
