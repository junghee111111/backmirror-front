"use client";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { SAreaFetchConfigSettings } from "@/app/store/area-fetch-config.store";
import { TPreset } from "@/app/store/preset.store";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useSetAtom } from "jotai";

export default function AreaSavedPresetsListItem({
  preset,
}: {
  preset: TPreset;
}) {
  const toast = useToast();
  const host = new URL(preset.url).host;
  const protocol = new URL(preset.url).protocol;
  const path = new URL(preset.url).pathname;
  const isOptionsAvailable =
    preset.headersInput.length > 0 ||
    preset.authInput.length > 0 ||
    preset.queryParamsInput.length > 0 ||
    preset.bodyInput;
  const setUIStore = useSetAtom(SAreaFetchConfigUISettings);
  const setAxiosConfigStore = useSetAtom(SAreaFetchConfigSettings);
  const handleLoadPreset = () => {
    setUIStore((prev) => ({
      ...prev,
      headersInput: preset.headersInput,
      bodyInput: preset.bodyInput,
      queryParamsInput: preset.queryParamsInput,
      authInput: preset.authInput,
    }));
    setAxiosConfigStore((prev) => ({
      ...prev,
      method: preset.method,
      url: preset.url,
    }));
    toast.toast({
      title: "Preset loaded successfully",
      description: (
        <span>
          <strong>{preset.method}</strong>&nbsp;{preset.url}
        </span>
      ),
    });
  };
  return (
    <div className="text-sm bg-white border-b flex flex-col gap-2 py-2 border-slate-200">
      <div className="px-2 pb-0">
        <span className="text-slate-500 text-xs py-1">
          {protocol}
          {`//`}
          {host}
        </span>
      </div>
      <div className="text-sm flex items-center justify-start gap-2 px-2 py-0">
        {preset.method && (
          <Badge
            size={"xs"}
            variant={preset.method === "POST" ? "destructive" : "default"}
          >
            {preset.method}
          </Badge>
        )}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={handleLoadPreset}
                className="hover:text-blue-500 text-left text-xs"
              >
                {path}
              </button>
            </TooltipTrigger>
            <TooltipContent align="end" side="top">
              <p>Load This Preset 👉</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {isOptionsAvailable && (
        <div className="text-xs px-2 flex flex-row justify-start gap-2">
          {preset.headersInput.length > 0 && (
            <Badge size={"xs"} variant={"outline"}>
              HEADER
            </Badge>
          )}
          {preset.authInput.length > 0 && (
            <Badge size={"xs"} variant={"outline"}>
              AUTH
            </Badge>
          )}
          {preset.queryParamsInput.length > 0 && (
            <Badge size={"xs"} variant={"outline"}>
              QUERY
            </Badge>
          )}
          {preset.bodyInput && (
            <Badge size={"xs"} variant={"outline"}>
              BODY
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
