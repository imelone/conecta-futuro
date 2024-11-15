import Sidebar from "@/components/app_components/sidenavNew/sidenav";
import { SidebarProvider } from "@/context/sidebar_context";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(
  () => import("../components/app_components/maps/Map/index"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <main>
      <DynamicMap />
    </main>
  );
}
