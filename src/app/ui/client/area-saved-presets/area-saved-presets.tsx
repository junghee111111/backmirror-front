import { HEADER_HEIGHT } from "@/app/data/ui";
import { Button } from "@/components/ui/button";
import { LucideFolderPlus, LucideZap } from "lucide-react";

export default function AreaSavedPresets() {
  return (
    <div
      className="w-[240px] flex-shrink-0 bg-slate-50 border-zinc-300 border-r"
      style={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
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
    </div>
  );
}
