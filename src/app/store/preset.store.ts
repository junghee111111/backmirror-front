import { atom } from "jotai";
import {
  TAvailableHttpMethods,
  TKeyValue,
  TKeyValueMethod,
} from "./area-fetch-config.store";

export type TPreset = {
  method: TAvailableHttpMethods;
  protocol: string;
  host: string;
  pathname: string;
  headersInput: Array<TKeyValue>;
  bodyInput: string;
  queryParamsInput: Array<TKeyValue>;
  authInput: Array<TKeyValueMethod>;
  id: string;
  name: string;
  description: string | null;
};

export const SPresetList = atom<TPreset[]>([]);

export const SSelectedPreset = atom<number>(0);
