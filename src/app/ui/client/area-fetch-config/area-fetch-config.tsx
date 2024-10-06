"use client";
import { AREA_FETCH_CONFIG_HEIGHT } from "@/app/data/ui";
import AreaFetchConfigEndpoint from "./area-fetch-config-endpoint";

export default function AreaFetchConfig() {
  return (
    <div
      className="flex w-full flex-col border-b border-zinc-300"
      style={{
        height: `${AREA_FETCH_CONFIG_HEIGHT}px`,
      }}
    >
      <AreaFetchConfigEndpoint />
    </div>
  );
}
