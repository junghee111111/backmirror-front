"use client";
import { SAreaFetchConfigSettings } from "@/app/store/area-fetch-config.store";
import { Input } from "@/components/ui/input";
import { useAtomValue, useSetAtom } from "jotai";

export default function AreaFetchConfigInputUrl() {
  const setAxiosConfigStore = useSetAtom(SAreaFetchConfigSettings);
  const axiosConfig = useAtomValue(SAreaFetchConfigSettings);
  return (
    <Input
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
