import { HEADER_HEIGHT } from "./data/ui";
import AreaFetchConfig from "./ui/client/area-fetch-config/area-fetch-config";
import AreaFetchConfigResponse from "./ui/client/area-fetch-config/area-fetch-config-response";
import AreaSavedPresets from "./ui/client/area-saved-presets/area-saved-presets";
import AreaVisualizer from "./ui/client/area-visualizer/area-visualizer";

export default function Home() {
  return (
    <div className="gap-0 flex items-start justify-start">
      <AreaSavedPresets />
      <div
        className="flex items-start flex-col"
        style={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <AreaFetchConfig />
        <AreaFetchConfigResponse />
      </div>
      <div className="flex-grow flex flex-col gap-4">
        <AreaVisualizer />
      </div>
    </div>
  );
}
