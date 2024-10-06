import { HEADER_HEIGHT } from "@/app/data/ui";
import { LucideZap } from "lucide-react";

export default function AreaSavedPresets() {
  return (
    <div
      className="w-72 flex-shrink-0 bg-white p-4 border-zinc-300 border-r"
      style={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
      }}
    >
      <div className="flex items-center font-black justify-start gap-1">
        <LucideZap size={16} />
        <span>Saved Presets</span>
      </div>
    </div>
  );
}
