import { AREA_SAVED_PRESETS_WIDTH, HEADER_HEIGHT } from "@/app/data/ui";
import { Button } from "@/components/ui/button";
import { LucideFolderPlus, LucideZap } from "lucide-react";
import AreaSavedPresetsList from "./area-saved-presets-list";

export default function AreaSavedPresets() {
  return (
    <div
      className="flex-shrink-0 bg-slate-50 border-zinc-300 border-r"
      style={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        width: `${AREA_SAVED_PRESETS_WIDTH}px`,
      }}
    >
      <div className="flex items-center bg-white border-b p-4 border-zinc-200 font-black justify-between gap-4">
        <div className="flex items-center justify-start gap-1">
          <LucideZap size={16} />
          <div>Saved Presets</div>
        </div>
        <div>
          <Button size={"xs"} variant="secondary">
            <LucideFolderPlus size={18} />
          </Button>
        </div>
      </div>
      <AreaSavedPresetsList />
    </div>
  );
}
