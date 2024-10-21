"use client";

import { TPreset } from "@/app/store/preset.store";
import { useEffect, useState } from "react";
import AreaSavedPresetsListItem from "./area-saved-presets-list-item";
import { AREA_SAVED_PRESETS_HEADER_HEIGHT, HEADER_HEIGHT } from "@/app/data/ui";
import { LucideLock, LucideUnlock } from "lucide-react";
import { useAtomValue } from "jotai";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";

export default function AreaSavedPresetsList() {
  const presets: Array<TPreset> = useAtomValue(
    SAreaFetchConfigUISettings
  ).presets;
  const [hosts, setHosts] = useState<string[]>([]);
  useEffect(() => {
    const tmpHosts: string[] = [];
    for (const preset of presets) {
      try {
        const host = preset.protocol + "//" + preset.host;
        if (!tmpHosts.includes(host)) {
          tmpHosts.push(host);
        }
      } catch (e: unknown) {
        console.error("Error while parsing host", e);
        continue;
      }
    }
    setHosts(tmpHosts);
  }, [presets]);
  return (
    <div
      className="overflow-y-auto"
      style={{
        height: `calc(100vh - ${
          HEADER_HEIGHT + AREA_SAVED_PRESETS_HEADER_HEIGHT
        }px)`,
      }}
    >
      {hosts.map((host) => {
        const savedPresetsForHost = presets.filter((preset) => {
          const presetProtocolHost = preset.protocol + "//" + preset.host;
          return presetProtocolHost === host;
        });
        const splits = host.split("://");
        const protocol = splits[0];
        const hostName = splits[1];
        return (
          <>
            <div className="p-3 text-xs font-bold flex flex-row bg-white border-b border-slate-200 shadow">
              <div
                className={
                  (protocol === "https"
                    ? "text-green-600 bg-green-50 "
                    : "bg-red-50 text-red-500 ") + " flex flex-row gap-1"
                }
              >
                {protocol === "https" && <LucideLock size={14} />}
                {protocol === "http" && <LucideUnlock size={14} />}
                {protocol}
                {`://`}
              </div>
              <div className="flex-grow overflow-hidden text-ellipsis whitespace-pre">
                {hostName}
              </div>
            </div>
            {savedPresetsForHost.map((preset, index) => (
              <AreaSavedPresetsListItem
                key={`PRESET_ITEM_${preset.protocol}_${preset.host}_${preset.pathname}_${index}`}
                preset={preset}
              />
            ))}
          </>
        );
      })}
    </div>
  );
}
