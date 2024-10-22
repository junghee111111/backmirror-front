/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AREA_VISUALIZER_HEADER_HEIGHT, HEADER_HEIGHT } from "@/app/data/ui";
import { SAreaFetchResponse } from "@/app/store/area-fetch-response.store";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useAtomValue } from "jotai";
import { LucidePaintbrush, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import RecursiveVisualizer from "./visualizer/recursive-visualizer";

export default function AreaVisualizer() {
  const fetchResponse = useAtomValue(SAreaFetchResponse);
  const [visuals, setVisuals] = useState<Array<any>>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!fetchResponse.data) return;
    const tmp: any[] = [];
    if (fetchResponse.error) {
      setError(true);
      return;
    }
    setError(false);
    if (Array.isArray(fetchResponse.data)) {
      fetchResponse.data.forEach((item) => {
        if (typeof item === "object") {
          const tmpObj = { ...item };
          for (const key in item) {
            tmpObj[key] = item[key];
          }
          tmp.push(tmpObj);
        }
      });
    } else if (typeof fetchResponse.data === "object") {
      const tmpObj = { ...fetchResponse.data };
      for (const key in fetchResponse.data) {
        tmpObj[key] = fetchResponse.data[key];
      }
      tmp.push(tmpObj);
    }
    setVisuals(tmp);
  }, [fetchResponse.data]);

  return (
    <div
      className="bg-white border-l flex-grow border-zinc-300"
      style={{
        height: `calc(100vh)`,
      }}
    >
      <div className="flex items-center justify-between gap-2 p-4 border-b border-zinc-300">
        <div className="font-black italic flex items-center justify-start">
          <LucidePaintbrush size={16} />
          Auto Visualizer
        </div>
        <div className="text-sm">
          {visuals.length} {visuals.length > 1 ? "Objects" : "Object"}
        </div>
      </div>
      <div
        className="gap-2 bg-zinc-50 overflow-scroll p-2"
        style={{
          height: `calc(100vh - ${
            HEADER_HEIGHT + AREA_VISUALIZER_HEADER_HEIGHT
          }px)`,
        }}
      >
        {visuals.length === 0 && !error && fetchResponse.data && (
          <Alert variant={"destructive"}>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error while parsing!</AlertTitle>
            <AlertDescription>Visualizable data not found!</AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert variant={"destructive"}>
            <Terminal className="h-4 w-4" />
            <AlertTitle>HTTP Error!</AlertTitle>
            <AlertDescription>
              {fetchResponse.status} {fetchResponse.statusText} error has
              occurred!
              {fetchResponse.data?.response && (
                <code className="text-white block mt-2 bg-red-900 p-2 rounded-lg text-xs whitespace-pre">
                  {JSON.stringify(fetchResponse.data.response, null, 2)}
                </code>
              )}
            </AlertDescription>
          </Alert>
        )}
        {visuals.length > 0 && !error && (
          <div className="flex flex-col gap-2 text-xs">
            {visuals.map((visual, index) => (
              <RecursiveVisualizer
                key={`VISUAL_${index}`}
                level={1}
                obj={visual}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
