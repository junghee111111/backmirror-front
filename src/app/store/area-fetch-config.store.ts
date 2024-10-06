/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";

export type TKeyValue = { id: string; key: string; value: string };
export type TKeyValueMethod = {
  id: string;
  key: string;
  value: string;
  method: string;
};

type TAreaFetchConfigSettings = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
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
