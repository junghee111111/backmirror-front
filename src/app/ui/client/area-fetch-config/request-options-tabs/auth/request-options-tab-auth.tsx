"use client";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { Button } from "@/components/ui/button";
import { useAtomValue, useSetAtom } from "jotai";
import { LucidePlus } from "lucide-react";
import AuthKeyValueItem from "./request-options-tab-auth-item";
import { useEffect } from "react";
import { SAreaFetchConfigSettings } from "@/app/store/area-fetch-config.store";

export default function RequestOptionsTabAuth() {
  const uiStore = useAtomValue(SAreaFetchConfigUISettings);
  const setUIStore = useSetAtom(SAreaFetchConfigUISettings);
  const setAxiosConfig = useSetAtom(SAreaFetchConfigSettings);
  const axiosConfig = useAtomValue(SAreaFetchConfigSettings);
  useEffect(() => {
    const tmp = { ...axiosConfig };
    for (const authItem of uiStore.authInput) {
      if (authItem.method === "JWT Bearer") {
        tmp.headers = {
          ...tmp.headers,
          Authorization: `Bearer ${authItem.value}`,
        };
      } else if (authItem.method === "In Header") {
        tmp.headers = {
          ...tmp.headers,
          [authItem.key]: authItem.value,
        };
      }
    }
    setAxiosConfig(tmp);
  }, [uiStore.authInput]);

  return (
    <div className="border-t h-full bg-white">
      <div
        className="overflow-y-auto flex flex-col py-2 gap-2 bg-zinc-50"
        style={{
          height: "220px",
        }}
      >
        {uiStore.authInput.map((item) => (
          <AuthKeyValueItem item={item} key={`HeaderKeyValueItem_${item.id}`} />
        ))}
      </div>
      <div className="flex justify-end p-2 border-t border-zinc-200">
        <Button
          onClick={() => {
            setUIStore((prev) => ({
              ...prev,
              authInput: [
                ...prev.authInput,
                {
                  id: Date.now().toString(),
                  key: "",
                  value: "",
                  method: "JWT Bearer",
                },
              ],
            }));
          }}
          className="flex items-center justify-center gap-1"
        >
          <LucidePlus size={16} />
          Add Auth Option
        </Button>
      </div>
    </div>
  );
}
