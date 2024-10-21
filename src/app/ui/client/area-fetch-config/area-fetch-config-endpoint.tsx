"use client";

import { Button } from "@/components/ui/button";
import { LucideLoaderCircle, LucideSend } from "lucide-react";
import AreaFetchConfigRequestOptions from "./area-fetch-config-request-options";
import { useAtomValue, useSetAtom } from "jotai";
import { SAreaFetchConfigSettings } from "@/app/store/area-fetch-config.store";
import { SAreaFetchResponse } from "@/app/store/area-fetch-response.store";
import AreaFetchConfigSelectMethod from "./area-fetch-config-select-method";
import AreaFetchConfigInputUrl from "./area-fetch-config-input-url";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { useToast } from "@/hooks/use-toast";
import SavePresetButton from "./atoms/save-preset-button";
import { fetchWithClientSettings } from "@/app/functions/services/fetchService";

export default function AreaFetchConfigEndpoint() {
  const { toast } = useToast();

  const axiosConfig = useAtomValue(SAreaFetchConfigSettings);
  const storeResponse = useSetAtom(SAreaFetchResponse);
  const UIState = useAtomValue(SAreaFetchConfigUISettings);
  const setUIState = useSetAtom(SAreaFetchConfigUISettings);

  const handleSend = async () => {
    setUIState((prev) => ({
      ...prev,
      loading: true,
    }));
    try {
      const resp = await fetchWithClientSettings({
        axiosConfig,
        UIState,
      });
      storeResponse({
        status: resp.result.status,
        statusText: resp.result.statusText,
        data: resp.result.data,
        headers: resp.result.headers,
        config: resp.result.config,
        error: resp.error,
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: `Error sending request: ${(error as Error).message}`,
        color: "red",
      });
    }
    setUIState((prev) => ({
      ...prev,
      loading: false,
    }));
  };

  return (
    <div
      className={
        (UIState.selectedPresetId ? "z-10 " : "") +
        "bg-white p-4 flex flex-col gap-4"
      }
    >
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
        <div className="flex items-center justify-end gap-4">
          <SavePresetButton />
        </div>
      </div>
    </div>
  );
}
