"use client";

import { Button } from "@/components/ui/button";
import { LucideLoaderCircle, LucideSave, LucideSend } from "lucide-react";
import AreaFetchConfigRequestOptions from "./area-fetch-config-request-options";
import { stdFetch } from "@/app/lib/stdFetch";
import { useAtomValue, useSetAtom } from "jotai";
import { SAreaFetchConfigSettings } from "@/app/store/area-fetch-config.store";
import { SAreaFetchResponse } from "@/app/store/area-fetch-response.store";
import AreaFetchConfigSelectMethod from "./area-fetch-config-select-method";
import AreaFetchConfigInputUrl from "./area-fetch-config-input-url";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RequestOptionsTabHeader from "./request-options-tabs/headers/request-options-tab-header";
import RequestOptionsTabAuth from "./request-options-tabs/auth/request-options-tab-auth";

export default function AreaFetchConfigEndpoint() {
  const userConfig = useAtomValue(SAreaFetchConfigSettings);
  const storeResponse = useSetAtom(SAreaFetchResponse);
  const UIState = useAtomValue(SAreaFetchConfigUISettings);
  const setUIState = useSetAtom(SAreaFetchConfigUISettings);
  const handleSend = async () => {
    setUIState((prev) => ({
      ...prev,
      loading: true,
    }));
    const resp = await stdFetch({
      ...userConfig,
    });
    storeResponse({
      status: resp.result.status,
      statusText: resp.result.statusText,
      data: resp.result.data,
      headers: resp.result.headers,
      config: resp.result.config,
      error: resp.error,
    });
    setUIState((prev) => ({
      ...prev,
      loading: false,
    }));
  };

  return (
    <>
      <div className="bg-white p-4 flex flex-col gap-4">
        <div className="flex w-full items-center justify-start gap-4">
          <AreaFetchConfigSelectMethod />
          <AreaFetchConfigInputUrl />
          <Button
            disabled={UIState.loading}
            onClick={handleSend}
            variant="default"
            className="flex items-center font-bold justify-between gap-2"
          >
            {UIState.loading ? (
              <LucideLoaderCircle
                className="animate-spin"
                strokeWidth={2.2}
                size={15}
              />
            ) : (
              <LucideSend strokeWidth={2.2} size={15} />
            )}
            Send
          </Button>
        </div>
        <div className="flex w-full items-center gap-4 justify-between">
          <AreaFetchConfigRequestOptions />
          <div>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button variant={"outline"}>
                    <LucideSave size={16} />
                    &nbsp; Save
                  </Button>
                </TooltipTrigger>
                <TooltipContent align="center" side="bottom">
                  <p>Save to Presets</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      {UIState.selectedOptionTab === "Headers" && <RequestOptionsTabHeader />}
      {UIState.selectedOptionTab === "Auth" && <RequestOptionsTabAuth />}
    </>
  );
}
