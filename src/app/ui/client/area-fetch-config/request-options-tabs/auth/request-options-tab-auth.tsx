"use client";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { Button } from "@/components/ui/button";
import { useAtomValue, useSetAtom } from "jotai";
import { LucidePlus } from "lucide-react";
import AuthKeyValueItem from "./request-options-tab-auth-item";
import { useEffect } from "react";
import { SAreaFetchConfigSettings } from "@/app/store/area-fetch-config.store";
import { AREA_FETCH_CONFIG_TAB_HEIGHT } from "@/app/data/ui";
import { useToast } from "@/hooks/use-toast";

export default function RequestOptionsTabAuth() {
  const uiStore = useAtomValue(SAreaFetchConfigUISettings);
  const setUIStore = useSetAtom(SAreaFetchConfigUISettings);
  const toast = useToast();

  const addNewItem = () => {
    const JWTExists = uiStore.authInput.some(
      (item) => item.method === "JWT Bearer"
    );
    if (JWTExists) {
      toast.toast({
        title: "JWT Bearer already exists",
        description:
          "The last JWT Bearer option will override the previous ones.",
      });
    }
    setUIStore((prev) => ({
      ...prev,
      authInput: [
        ...prev.authInput,
        {
          id: Date.now().toString(),
          key: "",
          value: "",
          method: "JWT Bearer",
          global: false,
          enabled: true,
        },
      ],
    }));
  };

  return (
    <div className="border-t h-full bg-white">
      <div
        className="overflow-y-auto flex flex-col bg-zinc-50"
        style={{
          height: `${AREA_FETCH_CONFIG_TAB_HEIGHT}px`,
        }}
      >
        {uiStore.authInput.map((item) => (
          <AuthKeyValueItem item={item} key={`HeaderKeyValueItem_${item.id}`} />
        ))}
      </div>
      <div className="flex justify-between items-center p-2 border-t border-zinc-200">
        <div className="text-xs text-red-500">
          <strong>Note:</strong>
          <br />
          Auth options with the same key will override others.
        </div>
        <Button
          onClick={addNewItem}
          className="flex items-center justify-center gap-1"
        >
          <LucidePlus size={16} />
          Add Auth Option
        </Button>
      </div>
    </div>
  );
}
