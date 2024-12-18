"use client";
import { AREA_FETCH_CONFIG_HEIGHT } from "@/app/data/ui";
import AreaFetchConfigEndpoint from "./area-fetch-config-endpoint";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { useAtomValue } from "jotai";
import RequestOptionsTabAuth from "./request-options-tabs/auth/request-options-tab-auth";
import RequestOptionsTabBody from "./request-options-tabs/body/request-options-tab-body";
import RequestOptionsTabHeader from "./request-options-tabs/headers/request-options-tab-header";
import RequestOptionsTabQueryParams from "./request-options-tabs/queryParams/request-options-tab-query-params";
import AreaFetchConfigToolbar from "./area-fetch-config-toolbar";

export default function AreaFetchConfig() {
  const UIState = useAtomValue(SAreaFetchConfigUISettings);

  return (
    <div
      className="flex w-full flex-col border-b border-zinc-300 relative"
      style={{
        height: `${AREA_FETCH_CONFIG_HEIGHT}px`,
      }}
    >
      <AreaFetchConfigToolbar />
      <AreaFetchConfigEndpoint />
      {UIState.selectedOptionTab === "Auth" && <RequestOptionsTabAuth />}
      {UIState.selectedOptionTab === "Header" && <RequestOptionsTabHeader />}
      {UIState.selectedOptionTab === "Body" && <RequestOptionsTabBody />}
      {UIState.selectedOptionTab === "QueryParam" && (
        <RequestOptionsTabQueryParams />
      )}
    </div>
  );
}
