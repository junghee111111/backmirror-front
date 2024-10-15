import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/app/lib/localStorageHandler";
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
import { useAtomValue } from "jotai";
import { LucideSave } from "lucide-react";

export default function SavePresetButton() {
  const toast = useToast();
  const uiStore = useAtomValue(SAreaFetchConfigUISettings);
  const axiosConfigStore = useAtomValue(SAreaFetchConfigSettings);
  const handleSavePreset = () => {
    const savedPresets: TPreset[] = (loadFromLocalStorage("globalPresets")
      .data || []) as unknown as TPreset[];
    const newPreset: TPreset = {
      method: axiosConfigStore.method,
      url: axiosConfigStore.url,
      headersInput: uiStore.headersInput,
      bodyInput: uiStore.bodyInput,
      queryParamsInput: uiStore.queryParamsInput,
      authInput: uiStore.authInput,
    };
    savedPresets.push(newPreset);
    saveToLocalStorage("globalPresets", JSON.stringify(savedPresets));
    toast.toast({
      title: "Saved!",
      description: `${axiosConfigStore.method} ${axiosConfigStore.url}\nSuccessfully saved.`,
      color: "green",
    });
  };
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button onClick={handleSavePreset} variant={"outline"}>
            <LucideSave size={16} />
            &nbsp; Save
          </Button>
        </TooltipTrigger>
        <TooltipContent align="center" side="bottom">
          <p>Save to Presets</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
