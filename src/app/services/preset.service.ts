/**
 * @author JungHee Wang (github : junghee111111)
 * @since 2024-10-25
 *
 * @description This code is responsible for handling the preset data and
 * Encryption/Decryption of saved preset string buffer.
 */
import { TPreset } from "../store/preset.store";
import { encryptPresets } from "../utils/encrypt";
import {
  decryptFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorageHandler";

export function getPresetById(id: string): TPreset | null {
  const presets = decryptFromLocalStorage("globalPresets").data || [];
  return presets.find((preset: TPreset) => preset.id === id) || null;
}

export function getPresets(): TPreset[] {
  return decryptFromLocalStorage("globalPresets").data || [];
}

export function savePreset(body: TPreset[]): void {
  try {
    const bodyString = JSON.stringify(body);
    saveToLocalStorage("globalPresets", encryptPresets(bodyString));
  } catch (e) {
    throw new Error(`Error saving preset: ${e}`);
  }
}
