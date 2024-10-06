"use client";
import {
  AREA_VISUALIZER_HEADER_HEIGHT,
  AREA_VISUALIZER_WIDTH_MINUS,
  HEADER_HEIGHT,
} from "@/app/data/ui";
import { SAreaFetchResponse } from "@/app/store/area-fetch-response.store";
import { Badge } from "@/components/ui/badge";
import { useAtomValue } from "jotai";
import { LucideChevronDown, LucidePaintbrush } from "lucide-react";
import { useEffect, useState } from "react";

export default function AreaVisualizer() {
  const fetchResponse = useAtomValue(SAreaFetchResponse);
  const [visuals, setVisuals] = useState<Array<any>>([]);
  const [error, setError] = useState<boolean>(false);
  const cardClassNames =
    "px-3 py-2 border rounded-md bg-white shadow border-zinc-300 flex flex-col gap-4";

  const VisualizeObject = (object: any) => (
    <div className="flex items-center justify-between">
      <div className="flex flex-grow-0 overflow-x-auto items-center justify-start gap-1">
        {object &&
          Object.keys(object).map((key: string, idx: number) => {
            if (key === "id") return null;
            if (Array.isArray(object[key]) || typeof object[key] === "object")
              return null;
            return (
              <Badge variant={"secondary"} key={`VISUAL_${key}_${idx}`}>
                <div className="font-black">{key}</div>
                <div className="pl-2 whitespace-pre">{object[key]}</div>
              </Badge>
            );
          })}
      </div>
      {object &&
        object["id"] &&
        typeof object["id"] != "object" &&
        !Array.isArray(object["id"]) && (
          <Badge>
            <div className="font-bold">#</div>
            <div className="pl-1">{object["id"]}</div>
          </Badge>
        )}
    </div>
  );

  useEffect(() => {
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
            if (Array.isArray(tmpObj[key]) || typeof tmpObj[key] === "object") {
              tmpObj[key] = item[key];
            } else {
              tmpObj[key] = item[key];
            }
          }
          tmp.push(tmpObj);
        }
      });
    } else if (typeof fetchResponse.data === "object") {
      const tmpObj = { ...fetchResponse.data };
      for (const key in fetchResponse.data) {
        if (Array.isArray(tmpObj[key]) || typeof tmpObj[key] === "object") {
          tmpObj[key] = fetchResponse.data[key];
        } else {
          tmpObj[key] = fetchResponse.data[key];
        }
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
      <div className="font-black italic flex items-center justify-start gap-2 p-4 border-b border-zinc-300">
        <LucidePaintbrush size={16} />
        Auto Visualizer
      </div>
      {visuals.length === 0 && (
        <div className="text-center p-4 text-zinc-500 text-sm">
          Visualizable data not found!
        </div>
      )}
      {error && (
        <div className="text-center p-4 text-red-500 text-sm">
          Error occurred from the API!
        </div>
      )}
      <div
        className="p-2 gap-2 flex flex-col bg-zinc-50 overflow-y-scroll overflow-x-scroll"
        style={{
          height: `calc(100vh - ${
            HEADER_HEIGHT + AREA_VISUALIZER_HEADER_HEIGHT
          }px)`,
          width: `calc(100vw - ${AREA_VISUALIZER_WIDTH_MINUS}px)`,
        }}
      >
        {visuals.length > 0 &&
          !error &&
          visuals.map((visual, index) => (
            <div key={`VISUAL_${index}`} className={cardClassNames}>
              {VisualizeObject(visual)}

              {Object.keys(visual).map((key: string, idx: number) => {
                if (
                  typeof visual[key] === "object" ||
                  Array.isArray(visual[key])
                ) {
                  return (
                    <div key={`VISUAL_${key}_${idx}`} className="">
                      <div className="text-sm font-bold flex items-center justify-start gap-1">
                        <LucideChevronDown size={16} /> {key}
                      </div>
                      <div className="p-2 flex flex-col gap-2">
                        {Array.isArray(visual[key]) &&
                          visual[key].map((item: any, i: number) => (
                            <div
                              key={`VISUAL_${key}_${idx}_${i}`}
                              className={cardClassNames + " bg-yellow-50"}
                            >
                              {VisualizeObject(item)}
                              {Object.keys(item).map((k: string, j: number) => {
                                if (
                                  typeof item[k] === "object" ||
                                  Array.isArray(item[k])
                                ) {
                                  return (
                                    <div
                                      key={`VISUAL_${key}_${idx}_${i}_${k}_${j}`}
                                      className=""
                                    >
                                      <div className="text-sm font-bold flex items-center justify-start gap-1">
                                        <LucideChevronDown size={16} /> {k}
                                      </div>
                                      <div className="p-2 flex flex-col gap-2">
                                        {Array.isArray(item[k]) &&
                                          item[k].map(
                                            (iitem: any, ii: number) => (
                                              <div
                                                key={`VISUAL_${key}_${idx}_${i}_${k}_${j}_${ii}`}
                                                className={cardClassNames}
                                              >
                                                {VisualizeObject(iitem)}
                                              </div>
                                            )
                                          )}
                                      </div>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          ))}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))}
      </div>
    </div>
  );
}
