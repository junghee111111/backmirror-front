"use client";

import { loadFromLocalStorage } from "@/app/lib/localStorageHandler";
import { TPreset } from "@/app/store/preset.store";
import { useEffect, useState } from "react";
import AreaSavedPresetsListItem from "./area-saved-presets-list-item";
import { AREA_SAVED_PRESETS_HEADER_HEIGHT, HEADER_HEIGHT } from "@/app/data/ui";

export default function AreaSavedPresetsList() {
  const [savedPresets, setSavedPresets] = useState<TPreset[]>([]);
  useEffect(() => {
    setSavedPresets(loadFromLocalStorage("globalPresets").data || []);
  }, []);
  return (
    <div
      className="overflow-y-auto"
      style={{
        height: `calc(100vh - ${
          HEADER_HEIGHT + AREA_SAVED_PRESETS_HEADER_HEIGHT
        }px)`,
      }}
    >
      {savedPresets.map((preset, index) => (
        <AreaSavedPresetsListItem
          key={`PRESET_ITEM_${preset.url}_${index}`}
          preset={preset}
        />
      ))}
    </div>
  );
}
