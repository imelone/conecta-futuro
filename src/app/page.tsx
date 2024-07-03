import Sidebar from "@/components/sidenav";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const DynamicMap = dynamic(() => import("../components/maps/Map/index"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      {/* <Sidebar onToggleClick={handleToggleClick} /> */}
      <DynamicMap />
    </main>
  );
}
