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
import { useAtomValue, useSetAtom } from "jotai";
import { LucideCircleChevronRight } from "lucide-react";

export default function AreaSavedPresetsListItem({
  preset,
}: {
  preset: TPreset;
}) {
  const toast = useToast();
  const setUIStore = useSetAtom(SAreaFetchConfigUISettings);
  const uiStore = useAtomValue(SAreaFetchConfigUISettings);
  const setAxiosConfigStore = useSetAtom(SAreaFetchConfigSettings);

  const isOptionsAvailable =
    preset.headersInput.length > 0 ||
    preset.authInput.length > 0 ||
    preset.queryParamsInput.length > 0 ||
    preset.bodyInput;

  const handleLoadPreset = () => {
    setUIStore((prev) => ({
      ...prev,
      headersInput: preset.headersInput,
      bodyInput: preset.bodyInput,
      queryParamsInput: preset.queryParamsInput,
      authInput: preset.authInput,
      selectedPresetId: preset.id,
    }));
    setAxiosConfigStore((prev) => ({
      ...prev,
      method: preset.method,
      url: `${preset.protocol}//${preset.host}${preset.pathname}`,
    }));
    toast.toast({
      title: "Preset loaded successfully",
      description: (
        <span>
          <strong>{preset.method}</strong>&nbsp;
          {`${preset.protocol}//${preset.host}${preset.pathname}`}
        </span>
      ),
    });
  };

  return (
    <div
      className={
        (preset.id === uiStore.selectedPresetId
          ? "border-l-4 border-l-blue-400 bg-blue-50 "
          : "") + "  flex flex-col gap-2 py-2 px-1 "
      }
    >
      <div className="text-sm flex items-center justify-start gap-2 px-2 py-0">
        {uiStore.selectedPresetId === preset.id && (
          <LucideCircleChevronRight size={16} className="text-blue-500" />
        )}
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
                className={
                  (uiStore.selectedPresetId === preset.id
                    ? "text-blue-500 font-bold "
                    : "") +
                  " hover:text-blue-500 text-left whitespace-pre text-ellipsis overflow-hidden"
                }
              >
                {preset.pathname}
              </button>
            </TooltipTrigger>
            <TooltipContent align="end" side="top">
              <p>Load This Preset 👉</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {isOptionsAvailable && (
        <div className="px-2 flex flex-row justify-start gap-2">
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
