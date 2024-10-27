import { generatePresetId } from "@/app/utils/encrypt";
import { getPresets, savePreset } from "@/app/services/preset.service";
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
import { LucideCopyPlus, LucideFilePlus, LucideSave } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DialogMakeNewPreset from "../../dialogs/dialog-make-new-preset";

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
        name: "",
        description: null,
        id: generatePresetId(
          JSON.stringify(uiStore),
          JSON.stringify(parsedURL)
        ),
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

  const handleSavePreset = (presetId: string) => {
    const savedPresets: TPreset[] = getPresets();
    const newPreset: TPreset | null = fromInput();
    if (newPreset) {
      const index = savedPresets.findIndex((p) => p.id === presetId);
      if (index !== -1) {
        savedPresets[index] = {
          ...newPreset,
          id: presetId,
          name: savedPresets[index].name,
          description: savedPresets[index].description,
        };
        savePreset(savedPresets);
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
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  disabled={!axiosConfigStore.url}
                  variant={"outline"}
                  className="flex items-center justify-center gap-2"
                >
                  {uiStore.selectedPresetId ? (
                    <LucideCopyPlus size={16} />
                  ) : (
                    <LucideFilePlus size={16} />
                  )}
                  {uiStore.selectedPresetId ? "Duplicate" : "Save new"}
                </Button>
              </DialogTrigger>
              <DialogMakeNewPreset />
            </Dialog>
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
