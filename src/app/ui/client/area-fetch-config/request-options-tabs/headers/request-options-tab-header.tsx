"use client";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { Button } from "@/components/ui/button";
import { useAtomValue, useSetAtom } from "jotai";
import { LucidePlus } from "lucide-react";
import HeaderKeyValueItem from "./request-options-tab-header-item";
import { AREA_FETCH_CONFIG_TAB_HEIGHT } from "@/app/data/ui";

export default function RequestOptionsTabHeader() {
  const uiStore = useAtomValue(SAreaFetchConfigUISettings);
  const setUIStore = useSetAtom(SAreaFetchConfigUISettings);

  const addNewItem = () => {
    setUIStore((prev) => ({
      ...prev,
      headersInput: [
        ...prev.headersInput,
        {
          id: Date.now().toString(),
          key: "",
          value: "",
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
        {uiStore.headersInput.map((item) => (
          <HeaderKeyValueItem
            item={item}
            key={`HeaderKeyValueItem_${item.id}`}
          />
        ))}
      </div>
      <div className="flex justify-end p-2 border-t border-zinc-200">
        <Button
          onClick={addNewItem}
          className="flex items-center justify-center gap-1"
        >
          <LucidePlus size={16} />
          Add Header
        </Button>
      </div>
    </div>
  );
}
