import { HEADER_HEIGHT } from "@/app/data/ui";
import { LucidePaintbrush } from "lucide-react";

export default function AreaVisualizer() {
  return (
    <div
      className="bg-white border-l border-zinc-300"
      style={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
      }}
    >
      <div className="font-black flex items-center justify-start gap-2 p-4">
        <LucidePaintbrush size={16} />
        Auto Visualizer
      </div>
    </div>
  );
}
