import { atom } from "jotai";
import { TKeyValue, TKeyValueMethod } from "./area-fetch-config.store";

type TAreaFetchConfigUISettings = {
  selectedOptionTab: string;
  loading: boolean;
  headersInput: Array<TKeyValue>;
  authInput: Array<TKeyValueMethod>;
  bodyInput: string;
};

export const SAreaFetchConfigUISettings = atom<TAreaFetchConfigUISettings>({
  selectedOptionTab: "Headers",
  loading: false,
  headersInput: [],
  authInput: [],
  bodyInput: "",
});
