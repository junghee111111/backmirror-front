/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";

export type TAvailableHttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type TKeyValue = {
  id: string;
  enabled: boolean;
  key: string;
  value: string;
};

export type TKeyValueMethod = {
  id: string;
  enabled: boolean;
  key: string;
  value: string;
  method: string;
  global: boolean;
};

export type TAreaFetchConfigSettings = {
  method: TAvailableHttpMethods;
  url: string;
  data: string;
  headers: any;
  params: string;
};

export const SAreaFetchConfigSettings = atom<TAreaFetchConfigSettings>({
  method: "GET",
  url: "",
  data: "",
  headers: {},
  params: "",
});
