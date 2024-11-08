import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideExternalLink } from "lucide-react";
import Logo from "../../common/logo";
import DialogExportPreset from "../dialogs/dialog-export-preset";
import DialogImportPreset from "../dialogs/dialog-import-preset";
import AreaSavedPresetsList from "./area-saved-presets-list";
import SidebarDropdown from "./atoms/sidebar-dropdown";

export default function AreaSavedPresets() {
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="p-2">
            <Logo />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <AreaSavedPresetsList />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarDropdown />
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="px-2 pb-1 text-xs flex items-center justify-start gap-1">
            Made by{" "}
            <a
              href="https://github.com/junghee111111/backmirror-front"
              target="_blank"
              className="text-blue-500 flex items-center justify-start gap-0"
            >
              junghee111111 <LucideExternalLink size={12} />
            </a>
          </div>
        </SidebarFooter>
      </Sidebar>
      <DialogExportPreset />
      <DialogImportPreset />
    </>
  );
}
