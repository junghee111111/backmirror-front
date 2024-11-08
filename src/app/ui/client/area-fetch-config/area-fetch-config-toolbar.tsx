import { getPresetById } from "@/app/services/preset.service";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { SAreaFetchConfigSettings } from "@/app/store/area-fetch-config.store";
import { TPreset } from "@/app/store/preset.store";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAtomValue, useSetAtom } from "jotai";
import { LucideEdit, LucideFile, LucideX, LucideZap } from "lucide-react";
import { useEffect, useState } from "react";
import SavePresetButton from "./atoms/save-preset-button";

export default function AreaFetchConfigToolbar() {
  const UIStore = useAtomValue(SAreaFetchConfigUISettings);
  const axiosConfigStore = useAtomValue(SAreaFetchConfigSettings);
  const setUIStore = useSetAtom(SAreaFetchConfigUISettings);
  const setAxiosConfigStore = useSetAtom(SAreaFetchConfigSettings);
  const [selectedPreset, setSelectedPreset] = useState<TPreset | null>(null);

  const isDirty = () => {
    if (
      `${selectedPreset?.protocol}//${selectedPreset?.host}${selectedPreset?.pathname}` !==
      `${axiosConfigStore.url}`
    )
      return true;
    if (selectedPreset?.method !== axiosConfigStore.method) return true;
    if (
      JSON.stringify(selectedPreset?.headersInput) !==
      JSON.stringify(UIStore.headersInput)
    )
      return true;
    if (selectedPreset?.bodyInput !== UIStore.bodyInput) return true;
    if (
      JSON.stringify(selectedPreset?.queryParamsInput) !==
      JSON.stringify(UIStore.queryParamsInput)
    )
      return true;
    if (
      JSON.stringify(selectedPreset?.authInput) !==
      JSON.stringify(UIStore.authInput)
    )
      return true;
    return false;
  };

  useEffect(() => {
    if (UIStore.selectedPresetId === null) {
      setSelectedPreset(null);
    } else {
      setSelectedPreset(getPresetById(UIStore.selectedPresetId));
    }
  }, [UIStore.selectedPresetId, UIStore.presets]);

  const resetPreset = () => {
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
  };

  return (
    <div className="p-4 pb-0 flex items-center justify-between gap-2">
      <div className="flex items-center justify-start gap-2">
        <SidebarTrigger />
        {selectedPreset ? (
          <div className="text-sm bg-blue-50 font-bold px-2 py-1 rounded flex text-blue-500 items-center gap-1">
            <LucideZap size={16} />
            <div className="text-ellipsis max-w-[160px] whitespace-nowrap overflow-hidden">
              {selectedPreset.name || "Preset Loaded"}
            </div>
            <Button onClick={resetPreset} variant={"ghost"} size={"xs"}>
              <LucideX size={14} strokeWidth={2} />
            </Button>
          </div>
        ) : (
          <div className="text-sm bg-zinc-100 font-bold px-2 py-1 rounded flex text-black items-center gap-1">
            <LucideFile size={16} />
            Draft
          </div>
        )}
        {isDirty() && selectedPreset && (
          <div className="text-sm font-bold px-2 py-1 rounded flex text-red-500 items-center gap-1">
            <LucideEdit size={16} strokeWidth={2} />
            <div className="text-ellipsis max-w-[160px] whitespace-nowrap overflow-hidden">
              {"Edited *"}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end gap-2">
        <SavePresetButton />
      </div>
    </div>
  );
}
