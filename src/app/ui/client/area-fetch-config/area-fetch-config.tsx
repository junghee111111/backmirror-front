"use client";
import { AREA_FETCH_CONFIG_HEIGHT } from "@/app/data/ui";
import AreaFetchConfigEndpoint from "./area-fetch-config-endpoint";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { useAtomValue } from "jotai";
import RequestOptionsTabAuth from "./request-options-tabs/auth/request-options-tab-auth";
import RequestOptionsTabBody from "./request-options-tabs/body/request-options-tab-body";
import RequestOptionsTabHeader from "./request-options-tabs/headers/request-options-tab-header";
import RequestOptionsTabQueryParams from "./request-options-tabs/queryParams/request-options-tab-query-params";
import { useEffect, useState } from "react";
import { TPreset } from "@/app/store/preset.store";
import { getPresetById } from "@/app/lib/presetRepository";
import { LucideFile, LucideZap } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AreaFetchConfig() {
  const UIState = useAtomValue(SAreaFetchConfigUISettings);
  const [selectedPreset, setSelectedPreset] = useState<TPreset | null>(null);
  useEffect(() => {
    if (UIState.selectedPresetId === null) {
      setSelectedPreset(null);
    } else {
      setSelectedPreset(getPresetById(UIState.selectedPresetId));
    }
  }, [UIState.selectedPresetId]);
  return (
    <div
      className="flex w-full flex-col border-b border-zinc-300 relative"
      style={{
        height: `${AREA_FETCH_CONFIG_HEIGHT}px`,
      }}
    >
      <div className="p-4 pb-0 flex items-center justify-start gap-2">
        <SidebarTrigger />
        {selectedPreset ? (
          <span className="text-sm bg-blue-50 font-bold px-2 py-1 rounded flex text-blue-500 items-center gap-1">
            <LucideZap size={16} />
            Preset Loaded
          </span>
        ) : (
          <span className="text-sm bg-zinc-100 font-bold px-2 py-1 rounded flex text-black items-center gap-1">
            <LucideFile size={16} />
            Draft
          </span>
        )}
      </div>
      <AreaFetchConfigEndpoint />
      {UIState.selectedOptionTab === "Auth" && <RequestOptionsTabAuth />}
      {UIState.selectedOptionTab === "Header" && <RequestOptionsTabHeader />}
      {UIState.selectedOptionTab === "Body" && <RequestOptionsTabBody />}
      {UIState.selectedOptionTab === "QueryParam" && (
        <RequestOptionsTabQueryParams />
      )}
    </div>
  );
}
