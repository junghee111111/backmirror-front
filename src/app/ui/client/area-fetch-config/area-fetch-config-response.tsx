"use client";
import { AREA_FETCH_CONFIG_HEIGHT, HEADER_HEIGHT } from "@/app/data/ui";
import { SAreaFetchResponse } from "@/app/store/area-fetch-response.store";
import { Badge } from "@/components/ui/badge";
import { Editor } from "@monaco-editor/react";
import { useAtomValue } from "jotai";
import {
  LucideCheck,
  LucideCircleAlert,
  LucideCircleCheck,
  LucideServer,
} from "lucide-react";

export default function AreaFetchConfigResponse() {
  const fetchResponse = useAtomValue(SAreaFetchResponse);
  const erroredResponse = fetchResponse.error && fetchResponse.status >= 300;
  return (
    <div className="w-full flex-grow break-all whitespace-pre-line flex flex-col bg-white">
      <div className="flex items-center justify-between border-b border-zinc-200 p-4">
        <div className="font-black flex items-center justify-start gap-2">
          <LucideServer size={16} />
          Response
        </div>
        <div className={" flex items-center justify-start gap-1"}>
          {fetchResponse.status === -1 ? (
            <Badge variant={"secondary"}>
              <LucideCheck size={14} />
              Ready
            </Badge>
          ) : (
            <Badge
              className={
                (erroredResponse ? "bg-red-500" : "bg-green-500 ") +
                " flex items-center justify-start gap-1"
              }
            >
              {fetchResponse.status >= 300 ? (
                <LucideCircleAlert size={14} />
              ) : (
                <LucideCircleCheck size={14} />
              )}
              {fetchResponse.status} {fetchResponse.statusText}
            </Badge>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between"></div>
      <div>
        <div className="rounded-xl">
          <Editor
            height={`calc(100vh - ${
              AREA_FETCH_CONFIG_HEIGHT + HEADER_HEIGHT
            }px)`}
            language="json"
            theme="vs-white"
            value={
              fetchResponse.data
                ? JSON.stringify(fetchResponse.data, null, 2)
                : ""
            }
          />
        </div>
      </div>
    </div>
  );
}
