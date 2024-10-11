/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { TAvailableHttpMethods } from "../store/area-fetch-config.store";

const ax = axios.create({
  withCredentials: true,
  timeout: 10000,
});

export type TStdFetchConfig = {
  method: TAvailableHttpMethods;
  url: string;
  data?: any;
  headers?: any;
  params?: any;
};

export type TStdFetchResponse = {
  error: boolean;
  result: any;
};

export async function stdFetch(
  stdFetchConfig: TStdFetchConfig
): Promise<TStdFetchResponse> {
  try {
    const resp = await ax.request({
      method: stdFetchConfig.method,
      url: stdFetchConfig.url,
      data: stdFetchConfig.data || null,
      headers: stdFetchConfig.headers || {},
      params: stdFetchConfig.params || {},
      responseType: "json",
    });
    return {
      error: false,
      result: resp,
    };
  } catch (e: any) {
    return {
      error: true,
      result: {
        data: e,
        status: e.response ? e.response.status : 999,
        statusText: e.response ? e.response.statusText : "Network Error",
        headers: e.response ? e.response.headers : {},
        params: {},
        responseType: "Axios Error",
      },
    };
  }
}
