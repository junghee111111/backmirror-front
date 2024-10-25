"use client";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { SAreaFetchConfigUISettings } from "./store/area-fetch-config-ui.store";
import { useSetAtom } from "jotai";
import { getPresets } from "./services/preset.service";

export default function ClientInitializer() {
  const setUIStore = useSetAtom(SAreaFetchConfigUISettings);
  useEffect(() => {
    const loadedPresets = getPresets();
    setUIStore((prev) => ({
      ...prev,
      presets: loadedPresets,
    }));
  }, []);
  return (
    <>
      <Toaster />
    </>
  );
}
