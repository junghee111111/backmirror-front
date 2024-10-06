/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";

type TAreaFetchResponse = {
  status: number;
  statusText: string;
  data: any;
  headers: any;
  config: any;
  error: boolean;
};

export const SAreaFetchResponse = atom<TAreaFetchResponse>({
  status: -1,
  statusText: "",
  data: null,
  headers: {},
  config: {},
  error: false,
});
