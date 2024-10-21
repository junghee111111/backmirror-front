import { atom } from "jotai";
import { TKeyValue, TKeyValueMethod } from "./area-fetch-config.store";
import { TPreset } from "./preset.store";

export type TAreaFetchConfigUISettings = {
  selectedOptionTab: string;
  selectedPresetId: string | null;
  presets: Array<TPreset>;
  loading: boolean;
  headersInput: Array<TKeyValue>;
  authInput: Array<TKeyValueMethod>;
  bodyInput: string;
  queryParamsInput: Array<TKeyValue>;
};

export const SAreaFetchConfigUISettings = atom<TAreaFetchConfigUISettings>({
  selectedOptionTab: "Auth",
  loading: false,
  headersInput: [],
  authInput: [],
  bodyInput: "",
  queryParamsInput: [],
  selectedPresetId: null,
  presets: [],
});
