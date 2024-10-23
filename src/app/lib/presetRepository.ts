import { TPreset } from "../store/preset.store";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./localStorageHandler";

export function getPresetById(id: string): TPreset | null {
  const presets = loadFromLocalStorage("globalPresets").data || [];
  return presets.find((preset: TPreset) => preset.id === id) || null;
}

export function getPresets(): TPreset[] {
  return loadFromLocalStorage("globalPresets").data || [];
}

export function savePreset(body: TPreset[]): void {
  try {
    const bodyString = JSON.stringify(body);
    saveToLocalStorage("globalPresets", bodyString);
  } catch (e) {
    throw new Error(`Error saving preset: ${e}`);
  }
}
