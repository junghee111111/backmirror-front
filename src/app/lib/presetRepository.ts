import { TPreset } from "../store/preset.store";
import { loadFromLocalStorage } from "./localStorageHandler";

export function getPresetById(id: string): TPreset | null {
  const presets = loadFromLocalStorage("globalPresets").data || [];
  return presets.find((preset: TPreset) => preset.id === id) || null;
}

export function getPresets(): TPreset[] {
  return loadFromLocalStorage("globalPresets").data || [];
}
