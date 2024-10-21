import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Logo from "../../common/logo";
import AreaSavedPresetsList from "./area-saved-presets-list";

export default function AreaSavedPresets() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-2">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <AreaSavedPresetsList />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
