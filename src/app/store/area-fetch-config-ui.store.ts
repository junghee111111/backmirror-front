import { atom } from "jotai";
import { TKeyValue, TKeyValueMethod } from "./area-fetch-config.store";

export type TAreaFetchConfigUISettings = {
  selectedOptionTab: string;
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
});
