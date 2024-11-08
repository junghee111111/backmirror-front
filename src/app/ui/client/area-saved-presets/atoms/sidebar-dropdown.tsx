"use client";
import {
  setExportDialogOpen,
  setImportDialogOpen,
} from "@/app/store/area-saved-list-ui.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useSetAtom } from "jotai";
import {
  ChevronUp,
  LucideDownload,
  LucideSettings,
  LucideUpload,
} from "lucide-react";

export default function SidebarDropdown() {
  const setExportDialogOpenState = useSetAtom(setExportDialogOpen);
  const setImportDialogOpenState = useSetAtom(setImportDialogOpen);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <LucideSettings /> Preset Actions
          <ChevronUp className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        className="w-[--radix-popper-anchor-width]"
      >
        <DropdownMenuItem
          onClick={() => {
            setExportDialogOpenState(true);
          }}
        >
          <LucideUpload />
          <span>Export Presets</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setImportDialogOpenState(true);
          }}
        >
          <LucideDownload />
          <span>Import Presets</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
