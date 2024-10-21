"use client";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { SAreaFetchConfigUISettings } from "./store/area-fetch-config-ui.store";
import { useSetAtom } from "jotai";
import { loadFromLocalStorage } from "./lib/localStorageHandler";

export default function ClientInitializer() {
  const setUIStore = useSetAtom(SAreaFetchConfigUISettings);
  useEffect(() => {
    const loadedPresets = loadFromLocalStorage("globalPresets").data;
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
