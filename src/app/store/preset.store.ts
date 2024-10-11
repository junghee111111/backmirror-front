import { atom } from "jotai";
import {
  TAvailableHttpMethods,
  TKeyValue,
  TKeyValueMethod,
} from "./area-fetch-config.store";

export type TPreset = {
  method: TAvailableHttpMethods;
  url: string;
  headersInput: Array<TKeyValue>;
  bodyInput: string;
  queryParamsInput: Array<TKeyValue>;
  authInput: Array<TKeyValueMethod>;
};

export const SPresetList = atom<TPreset[]>([]);

export const SSelectedPreset = atom<number>(0);
