/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  AREA_VISUALIZER_HEADER_HEIGHT,
  AREA_VISUALIZER_WIDTH_MINUS,
  HEADER_HEIGHT,
} from "@/app/data/ui";
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

  // const VisualizeObject = (object: any) => (
  //   <div className="leading-7 text-sm">
  //     {object &&
  //       object["id"] &&
  //       typeof object["id"] != "object" &&
  //       !Array.isArray(object["id"]) && (
  //         <Badge className="mr-2">
  //           <div className="font-bold">#</div>
  //           <CopyToClipboard text={object["id"]} />
  //         </Badge>
  //       )}
  //     {(typeof object === "string" || typeof object === "number") && object}
  //     {object &&
  //       Object.keys(object).map((key: string, idx: number) => {
  //         if (key === "id") return null;
  //         if (
  //           (Array.isArray(object[key]) || typeof object[key] === "object") &&
  //           object[key] !== null
  //         )
  //           return null;
  //         return (
  //           <Badge
  //             variant={"secondary"}
  //             className="mr-2 max-w-[420px]"
  //             key={`VISUAL_${key}_${idx}`}
  //           >
  //             <div className="font-black">{key}</div>
  //             <div
  //               className={
  //                 (!object[key] ? "text-red-400" : "") + " pl-2 break-all"
  //               }
  //             >
  //               {object[key] ? <CopyToClipboard text={object[key]} /> : "NULL"}
  //             </div>
  //           </Badge>
  //         );
  //       })}
  //   </div>
  // );

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
      className="bg-white border-l border-zinc-300"
      style={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
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
          width: `calc(100vw - ${AREA_VISUALIZER_WIDTH_MINUS}px)`,
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
