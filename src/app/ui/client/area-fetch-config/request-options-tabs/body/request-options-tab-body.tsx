"use client";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Editor } from "@monaco-editor/react";
import { useEffect } from "react";
import { SAreaFetchConfigSettings } from "@/app/store/area-fetch-config.store";

export default function RequestOptionsTabBody() {
  const uiStore = useAtomValue(SAreaFetchConfigUISettings);
  const setUIStore = useSetAtom(SAreaFetchConfigUISettings);
  const [axoisConfig, setAxiosConfig] = useAtom(SAreaFetchConfigSettings);

  useEffect(() => {
    if (uiStore.bodyInput) {
      const tmp = { ...axoisConfig };
      tmp.data = uiStore.bodyInput as string;
      setAxiosConfig(tmp);
    }
  }, [uiStore.bodyInput]);
  return (
    <>
      {axoisConfig.method === "GET" && (
        <div className="border-t border-slate-200">
          <div className="p-4 text-xs text-slate-500 text-center">
            Body is not allowed for GET requests.
          </div>
        </div>
      )}
      <div
        className={
          (axoisConfig.method === "GET" ? "hidden" : "") +
          " border-t h-full bg-white"
        }
      >
        <Editor
          height={`270px`}
          language="json"
          theme="vs-white"
          value={uiStore.bodyInput}
          onChange={(value) => {
            setUIStore((prev) => ({
              ...prev,
              bodyInput: value || "",
            }));
          }}
        />
      </div>
    </>
  );
}
