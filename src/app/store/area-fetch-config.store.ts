/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckedState } from "@radix-ui/react-checkbox";
import { atom } from "jotai";

export type TAvailableHttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type TKeyValue = {
  id: string;
  enabled: CheckedState;
  key: string;
  value: string;
};

export type TKeyValueMethod = {
  id: string;
  enabled: CheckedState;
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
