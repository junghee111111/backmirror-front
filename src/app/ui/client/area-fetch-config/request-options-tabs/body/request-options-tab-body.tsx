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
    <div className="border-t h-full bg-white">
      <Editor
        height={`270px`}
        language="typescript"
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
  );
}
