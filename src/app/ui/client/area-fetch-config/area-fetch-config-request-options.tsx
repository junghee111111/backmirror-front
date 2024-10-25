import { AreaFetchConfigRequestOptionsData } from "@/app/data/area-fetch-config-request-options";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { TPreset } from "@/app/store/preset.store";
import { Button } from "@/components/ui/button";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

export default function AreaFetchConfigRequestOptions() {
  const setUIState = useSetAtom(SAreaFetchConfigUISettings);
  const UIState = useAtomValue(SAreaFetchConfigUISettings);
  const [currentPreset, setCurrentPreset] = useState<TPreset | null>(null);
  useEffect(() => {
    if (UIState.selectedPresetId) {
      const foundPreset = UIState.presets.find(
        (preset) => UIState.selectedPresetId === preset.id
      );
      if (foundPreset) {
        setCurrentPreset(foundPreset);
      }
    }
  }, [UIState.selectedPresetId]);

  return (
    <div className="flex items-center justify-start gap-1">
      {AreaFetchConfigRequestOptionsData.map((option) => (
        <Button
          onClick={() => {
            setUIState((prev) => ({
              ...prev,
              selectedOptionTab: option.label,
            }));
          }}
          key={`AreaFetchConfigRequestOptions_${option.label}`}
          variant="ghost"
          className={
            ((option.label === "Header" &&
              (currentPreset?.headersInput?.length || 0) > 0) ||
            (option.label === "Auth" &&
              (currentPreset?.authInput?.length || 0) > 0) ||
            (option.label === "QueryParam" &&
              (currentPreset?.queryParamsInput?.length || 0) > 0) ||
            (option.label === "Body" &&
              (currentPreset?.bodyInput?.length || 0) > 0)
              ? "text-blue-500 "
              : " ") +
            (UIState.selectedOptionTab === option.label ? "bg-zinc-100" : "") +
            " hover:bg-zinc-100"
          }
        >
          <option.icon size={14} className="mr-1"></option.icon>
          {option.label}
        </Button>
      ))}
    </div>
  );
}
