import { AreaFetchConfigRequestOptionsData } from "@/app/data/area-fetch-config-request-options";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { Button } from "@/components/ui/button";
import { useAtomValue, useSetAtom } from "jotai";

export default function AreaFetchConfigRequestOptions() {
  const setUIState = useSetAtom(SAreaFetchConfigUISettings);
  const UIState = useAtomValue(SAreaFetchConfigUISettings);
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
