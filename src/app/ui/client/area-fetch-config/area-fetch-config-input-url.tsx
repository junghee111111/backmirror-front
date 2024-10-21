"use client";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { SAreaFetchConfigSettings } from "@/app/store/area-fetch-config.store";
import { Input } from "@/components/ui/input";
import { useAtomValue, useSetAtom } from "jotai";

export default function AreaFetchConfigInputUrl() {
  const setAxiosConfigStore = useSetAtom(SAreaFetchConfigSettings);
  const axiosConfig = useAtomValue(SAreaFetchConfigSettings);
  const uiStore = useAtomValue(SAreaFetchConfigUISettings);
  return (
    <Input
      className={
        uiStore.selectedPresetId
          ? "ring-2 ring-blue-300 bg-blue-50 focus:bg-white "
          : ""
      }
      onChange={(e) => {
        setAxiosConfigStore((prev) => ({
          ...prev,
          url: e.currentTarget.value,
        }));
      }}
      value={axiosConfig.url}
      placeholder="https://example.io/users"
    />
  );
}
