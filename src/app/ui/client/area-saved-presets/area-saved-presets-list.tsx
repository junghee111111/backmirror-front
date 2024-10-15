"use client";

import { loadFromLocalStorage } from "@/app/lib/localStorageHandler";
import { TPreset } from "@/app/store/preset.store";
import { useEffect, useState } from "react";
import AreaSavedPresetsListItem from "./area-saved-presets-list-item";

export default function AreaSavedPresetsList() {
  const [savedPresets, setSavedPresets] = useState<TPreset[]>([]);
  useEffect(() => {
    setSavedPresets(loadFromLocalStorage("globalPresets").data || []);
  }, []);
  return (
    <div>
      {savedPresets.map((preset, index) => (
        <AreaSavedPresetsListItem
          key={`PRESET_ITEM_${preset.url}_${index}`}
          preset={preset}
        />
      ))}
    </div>
  );
}
