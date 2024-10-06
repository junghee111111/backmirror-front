"use client";
import { SAreaFetchConfigSettings } from "@/app/store/area-fetch-config.store";
import { Input } from "@/components/ui/input";
import { useSetAtom } from "jotai";

export default function AreaFetchConfigInputUrl() {
  const setUserConfig = useSetAtom(SAreaFetchConfigSettings);
  return (
    <Input
      onChange={(e) => {
        setUserConfig((prev) => ({ ...prev, url: e.currentTarget.value }));
      }}
      placeholder="https://example.io/users"
    />
  );
}
