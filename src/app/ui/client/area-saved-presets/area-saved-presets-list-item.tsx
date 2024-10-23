"use client";
import { AreaFetchConfigRequestOptionsData } from "@/app/data/area-fetch-config-request-options";
import { generatePresetId } from "@/app/lib/encrypt";
import { loadFromLocalStorage } from "@/app/lib/localStorageHandler";
import { getPresets, savePreset } from "@/app/lib/presetRepository";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { SAreaFetchConfigSettings } from "@/app/store/area-fetch-config.store";
import { TPreset } from "@/app/store/preset.store";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { useAtomValue, useSetAtom } from "jotai";
import { LucideCopyPlus, LucideTrash2, MoreHorizontal } from "lucide-react";
import { createElement } from "react";

export default function AreaSavedPresetsListItem({
  preset,
}: {
  preset: TPreset;
}) {
  const toast = useToast();
  const setUIStore = useSetAtom(SAreaFetchConfigUISettings);
  const uiStore = useAtomValue(SAreaFetchConfigUISettings);
  const setAxiosConfigStore = useSetAtom(SAreaFetchConfigSettings);

  const isOptionsAvailable =
    preset.headersInput.length > 0 ||
    preset.authInput.length > 0 ||
    preset.queryParamsInput.length > 0 ||
    preset.bodyInput;

  const handleLoadPreset = () => {
    setUIStore((prev) => ({
      ...prev,
      headersInput: preset.headersInput,
      bodyInput: preset.bodyInput,
      queryParamsInput: preset.queryParamsInput,
      authInput: preset.authInput,
      selectedPresetId: preset.id,
    }));
    setAxiosConfigStore((prev) => ({
      ...prev,
      method: preset.method,
      url: `${preset.protocol}//${preset.host}${preset.pathname}`,
    }));
    toast.toast({
      title: "Preset loaded successfully",
      description: (
        <span>
          <strong>{preset.method}</strong>&nbsp;
          {`${preset.protocol}//${preset.host}${preset.pathname}`}
        </span>
      ),
    });
  };

  const handleDeletePreset = (id: string) => {
    if (uiStore.selectedPresetId === id) {
      setUIStore((prev) => ({
        ...prev,
        headersInput: [],
        bodyInput: "",
        queryParamsInput: [],
        authInput: [],
        selectedPresetId: "",
      }));
      setAxiosConfigStore((prev) => ({
        ...prev,
        method: "GET",
        url: "",
      }));
    }
    const newPresets = uiStore.presets.filter((preset) => preset.id !== id);
    savePreset(newPresets);
    setUIStore((prev) => ({
      ...prev,
      presets: newPresets,
    }));
    toast.toast({
      title: "Preset deleted successfully",
      description: (
        <span>
          <strong>{preset.method}</strong>&nbsp;
          {`${preset.protocol}//${preset.host}${preset.pathname}`}
        </span>
      ),
    });
  };

  const handleDuplicatePreset = (id: string) => {
    const savedPresets: TPreset[] = (loadFromLocalStorage("globalPresets")
      .data || []) as unknown as TPreset[];
    const targetPreset = savedPresets.find((preset) => preset.id === id);
    if (targetPreset) {
      savedPresets.push({
        ...targetPreset,
        id: generatePresetId(
          JSON.stringify(targetPreset.id),
          JSON.stringify(targetPreset)
        ),
      });
      savePreset(savedPresets);
      setUIStore((prev) => ({
        ...prev,
        presets: getPresets(),
      }));
      toast.toast({
        description: `Successfully duplicated.`,
        color: "green",
      });
    }
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={uiStore.selectedPresetId === preset.id}
        onClick={handleLoadPreset}
        className="flex flex-col h-auto gap-1 items-start justify-start"
      >
        <div className="flex items-center justify-start w-full">
          {preset.method && (
            <Badge
              size={"xs"}
              variant={preset.method === "POST" ? "destructive" : "default"}
            >
              {preset.method}
            </Badge>
          )}
          {isOptionsAvailable && (
            <div className="px-2 flex flex-row justify-start gap-2">
              {preset.authInput.length > 0 &&
                createElement(AreaFetchConfigRequestOptionsData[0].icon, {
                  size: 14,
                  className: "text-gray-500",
                })}
              {preset.headersInput.length > 0 &&
                createElement(AreaFetchConfigRequestOptionsData[1].icon, {
                  size: 14,
                  className: "text-gray-500",
                })}
              {preset.queryParamsInput.length > 0 &&
                createElement(AreaFetchConfigRequestOptionsData[2].icon, {
                  size: 14,
                  className: "text-gray-500",
                })}
              {preset.bodyInput.length > 0 &&
                createElement(AreaFetchConfigRequestOptionsData[3].icon, {
                  size: 14,
                  className: "text-gray-500",
                })}
            </div>
          )}
        </div>
        <div className="text-xs overflow-hidden text-ellipsis whitespace-pre">
          {preset.pathname}
        </div>
      </SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction>
            <MoreHorizontal />
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuItem
            onClick={() => {
              handleDuplicatePreset(preset.id);
            }}
          >
            <LucideCopyPlus />
            <span>Duplicate</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleDeletePreset(preset.id);
            }}
            className="text-red-500"
          >
            <LucideTrash2 />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
