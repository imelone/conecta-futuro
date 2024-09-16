import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const DynamicMap = dynamic(() => import("../components/maps/Map/index"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <DynamicMap />
    </main>
  );
}
