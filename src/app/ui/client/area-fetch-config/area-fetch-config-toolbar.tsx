import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LucideZap, LucideX, LucideFile } from "lucide-react";
import SavePresetButton from "./atoms/save-preset-button";
import { useEffect, useState } from "react";
import { TPreset } from "@/app/store/preset.store";
import { useAtomValue, useSetAtom } from "jotai";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { getPresetById } from "@/app/services/preset.service";
import { SAreaFetchConfigSettings } from "@/app/store/area-fetch-config.store";

export default function AreaFetchConfigToolbar() {
  const UIStore = useAtomValue(SAreaFetchConfigUISettings);
  const setUIStore = useSetAtom(SAreaFetchConfigUISettings);
  const setAxiosConfigStore = useSetAtom(SAreaFetchConfigSettings);
  const [selectedPreset, setSelectedPreset] = useState<TPreset | null>(null);
  useEffect(() => {
    if (UIStore.selectedPresetId === null) {
      setSelectedPreset(null);
    } else {
      setSelectedPreset(getPresetById(UIStore.selectedPresetId));
    }
  }, [UIStore.selectedPresetId]);
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
      </div>
      <div className="flex items-center justify-end gap-2">
        <SavePresetButton />
      </div>
    </div>
  );
}
