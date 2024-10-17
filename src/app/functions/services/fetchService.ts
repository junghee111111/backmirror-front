import { stdFetch } from "@/app/lib/stdFetch";
import { TAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { TAreaFetchConfigSettings } from "@/app/store/area-fetch-config.store";

export const fetchWithClientSettings = async ({
  axiosConfig,
  UIState,
}: {
  axiosConfig: TAreaFetchConfigSettings;
  UIState: TAreaFetchConfigUISettings;
}) => {
  // check URL
  let url: URL | null = null;
  try {
    url = new URL(axiosConfig.url);
  } catch (e: unknown) {
    throw new Error(`Invalid URL\n\n${(e as Error).message}`);
  }

  // add QueryParams
  for (const queryParam of UIState.queryParamsInput) {
    if (!queryParam.enabled) continue;
    url.searchParams.append(queryParam.key, queryParam.value);
  }

  // add Headeres
  let headers = axiosConfig.headers;
  for (const header of UIState.headersInput) {
    if (!header.enabled) continue;
    headers = {
      ...headers,
      [header.key]: header.value,
    };
  }

  // parse JSON Body data
  let data = null;
  if (axiosConfig.data) {
    try {
      data = JSON.parse(axiosConfig.data);
    } catch (e: unknown) {
      throw new Error(`Invalid JSON\n\n${(e as Error).message}`);
    }
  }

  // add (or override) Authentication Method
  for (const authItem of UIState.authInput) {
    if (!authItem.enabled) continue;
    if (authItem.method === "JWT Bearer") {
      headers = {
        ...headers,
        Authorization: `Bearer ${authItem.value}`,
      };
    } else if (authItem.method === "In Header") {
      headers = {
        ...headers,
        [authItem.key]: authItem.value,
      };
    } else if (authItem.method === "In Query Param") {
      url.searchParams.append(authItem.key, authItem.value);
    } else if (authItem.method === "In Body") {
      data = {
        ...data,
        [authItem.key]: authItem.value,
      };
    } else {
      continue;
    }
  }

  // send fetch
  return await stdFetch({
    ...axiosConfig,
    headers,
    url: url.toString(),
    data: axiosConfig.method === "GET" ? undefined : data,
  });
};
