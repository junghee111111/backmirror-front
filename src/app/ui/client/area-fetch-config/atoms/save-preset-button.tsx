import { encryptBase64 } from "@/app/lib/encrypt";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/app/lib/localStorageHandler";
import { getPresets } from "@/app/lib/presetRepository";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { SAreaFetchConfigSettings } from "@/app/store/area-fetch-config.store";
import { TPreset } from "@/app/store/preset.store";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useAtomValue, useSetAtom } from "jotai";
import { LucidePlusCircle, LucideSave } from "lucide-react";

export default function SavePresetButton() {
  const toast = useToast();
  const uiStore = useAtomValue(SAreaFetchConfigUISettings);
  const setUiStore = useSetAtom(SAreaFetchConfigUISettings);
  const axiosConfigStore = useAtomValue(SAreaFetchConfigSettings);

  const fromInput = (): TPreset | null => {
    try {
      const parsedURL = new URL(axiosConfigStore.url);
      return {
        method: axiosConfigStore.method,
        protocol: parsedURL.protocol,
        host: parsedURL.host,
        pathname: parsedURL.pathname,
        headersInput: uiStore.headersInput,
        bodyInput: uiStore.bodyInput,
        queryParamsInput: uiStore.queryParamsInput,
        authInput: uiStore.authInput,
        id:
          encryptBase64(
            JSON.stringify(uiStore) + new Date().toISOString()
          ).substring(0, 32) +
          encryptBase64(JSON.stringify(parsedURL)).substring(0, 32),
      };
    } catch (e: unknown) {
      toast.toast({
        title: "Error while Saving",
        description: `Please check your inputs.\n${(e as Error).message}`,
        color: "red",
      });
      return null;
    }
  };

  const handleAddPreset = () => {
    const savedPresets: TPreset[] = (loadFromLocalStorage("globalPresets")
      .data || []) as unknown as TPreset[];
    const newPreset: TPreset | null = fromInput();
    if (newPreset) {
      savedPresets.push(newPreset);
      saveToLocalStorage("globalPresets", JSON.stringify(savedPresets));
      setUiStore((prev) => ({
        ...prev,
        presets: getPresets(),
        selectedPresetId: newPreset.id,
      }));
      toast.toast({
        title: "Saved!",
        description: `${axiosConfigStore.method} ${axiosConfigStore.url}\nSuccessfully saved.`,
        color: "green",
      });
    }
  };
  const handleSavePreset = (presetId: string) => {
    const savedPresets: TPreset[] = (loadFromLocalStorage("globalPresets")
      .data || []) as unknown as TPreset[];
    const newPreset: TPreset | null = fromInput();
    if (newPreset) {
      const index = savedPresets.findIndex((p) => p.id === presetId);
      if (index !== -1) {
        savedPresets[index] = {
          ...newPreset,
          id: presetId,
        };
        saveToLocalStorage("globalPresets", JSON.stringify(savedPresets));
        setUiStore((prev) => ({
          ...prev,
          presets: getPresets(),
        }));
        toast.toast({
          title: "Apply changes to existing preset",
          description: `${axiosConfigStore.method} ${axiosConfigStore.url}\nSuccessfully saved.`,
          color: "green",
        });
      }
    }
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              onClick={handleAddPreset}
              variant={"outline"}
              className="border-yellow-400 text-yellow-500 hover:bg-yellow-50 bg-yellow-50  hover:text-yellow-600 hover:ring-2 hover:ring-yellow-300"
            >
              <LucidePlusCircle size={16} />
              &nbsp; New
            </Button>
          </TooltipTrigger>
          <TooltipContent align="center" side="bottom">
            <p>Save changes as a new preset</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {uiStore.selectedPresetId && (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  if (uiStore.selectedPresetId)
                    handleSavePreset(uiStore.selectedPresetId);
                }}
                disabled={!uiStore.selectedPresetId}
                variant={"outline"}
              >
                <LucideSave size={16} />
                &nbsp; Save
              </Button>
            </TooltipTrigger>
            <TooltipContent align="center" side="bottom">
              <p>Save the changes you just loaded.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}
