import { atom } from "jotai";
import { TKeyValue } from "./area-fetch-config.store";

type TAreaFetchConfigUISettings = {
  selectedOptionTab: string;
  loading: boolean;
  headersInput: Array<TKeyValue>;
};

export const SAreaFetchConfigUISettings = atom<TAreaFetchConfigUISettings>({
  selectedOptionTab: "Headers",
  loading: false,
  headersInput: [],
});
