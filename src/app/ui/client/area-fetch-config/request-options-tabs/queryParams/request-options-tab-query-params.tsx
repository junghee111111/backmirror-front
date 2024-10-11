"use client";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { Button } from "@/components/ui/button";
import { useAtomValue, useSetAtom } from "jotai";
import { LucidePlus } from "lucide-react";
import QueryParamsKeyValuItem from "./request-options-tab-query-params-item";

export default function RequestOptionsTabQueryParams() {
  const uiStore = useAtomValue(SAreaFetchConfigUISettings);
  const setUIStore = useSetAtom(SAreaFetchConfigUISettings);

  return (
    <div className="border-t h-full bg-white">
      <div
        className="overflow-y-auto flex flex-col py-2 gap-2 bg-zinc-50"
        style={{
          height: "220px",
        }}
      >
        {uiStore.queryParamsInput.map((item) => (
          <QueryParamsKeyValuItem
            item={item}
            key={`QueryParamKeyValueItem_${item.id}`}
          />
        ))}
      </div>
      <div className="flex justify-end p-2 border-t border-zinc-200">
        <Button
          onClick={() => {
            setUIStore((prev) => ({
              ...prev,
              queryParamsInput: [
                ...prev.queryParamsInput,
                {
                  id: Date.now().toString(),
                  key: "",
                  value: "",
                },
              ],
            }));
          }}
          className="flex items-center justify-center gap-1"
        >
          <LucidePlus size={16} />
          Add Query Param
        </Button>
      </div>
    </div>
  );
}
