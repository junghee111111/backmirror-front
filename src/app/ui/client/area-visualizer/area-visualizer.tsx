/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  AREA_VISUALIZER_HEADER_HEIGHT,
  AREA_VISUALIZER_WIDTH_MINUS,
  HEADER_HEIGHT,
} from "@/app/data/ui";
import { SAreaFetchResponse } from "@/app/store/area-fetch-response.store";
import { Badge } from "@/components/ui/badge";
import { useAtomValue } from "jotai";
import {
  LucideChevronDown,
  LucideList,
  LucideListOrdered,
  LucidePaintbrush,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AreaVisualizer() {
  const fetchResponse = useAtomValue(SAreaFetchResponse);
  const [visuals, setVisuals] = useState<Array<any>>([]);
  const [error, setError] = useState<boolean>(false);
  const cardClassNames =
    "px-3 py-2 border rounded-md bg-white shadow border-zinc-300 flex flex-col gap-4";

  const VisualizeObject = (object: any) => (
    <div className="leading-7 text-sm">
      {object &&
        object["id"] &&
        typeof object["id"] != "object" &&
        !Array.isArray(object["id"]) && (
          <Badge className="mr-2">
            <div className="font-bold">#</div>
            <div className="pl-1">{object["id"]}</div>
          </Badge>
        )}
      {(typeof object === "string" || typeof object === "number") && object}
      {object &&
        Object.keys(object).map((key: string, idx: number) => {
          if (key === "id") return null;
          if (
            (Array.isArray(object[key]) || typeof object[key] === "object") &&
            object[key] !== null
          )
            return null;
          return (
            <Badge
              variant={"secondary"}
              className="mr-2"
              key={`VISUAL_${key}_${idx}`}
            >
              <div className="font-black">{key}</div>
              <div className="pl-2 whitespace-pre-wrap">
                {object[key] ? (
                  object[key]
                ) : (
                  <i className="text-red-400">NULL</i>
                )}
              </div>
            </Badge>
          );
        })}
    </div>
  );

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
      {visuals.length === 0 && !error && (
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
        className="p-2 gap-2 grid grid-cols-1 2xl:grid-cols-2 bg-zinc-50 overflow-y-scroll overflow-x-scroll"
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
            <div key={`VISUAL_${index}`}>
              <div className={cardClassNames}>
                {VisualizeObject(visual)}
                {Object.keys(visual).map((key: string, idx: number) => {
                  const ifArrayPrimitives =
                    Array.isArray(visual[key]) &&
                    visual[key].every((item) => typeof item !== "object");
                  if (ifArrayPrimitives) {
                    return (
                      <div
                        className="text-sm flex flex-col gap-2"
                        key={`Visual_Array_Primitive_key_${visual[key]}`}
                      >
                        <div className="text-sm font-bold flex items-center justify-start gap-1">
                          <LucideListOrdered size={16} /> {key}
                        </div>
                        <div className="w-full whitespace-pre-line text-xs break-all px-2">
                          [{(visual[key] as Array<number | string>).join()}]
                        </div>
                      </div>
                    );
                  }
                  if (
                    (typeof visual[key] === "object" ||
                      Array.isArray(visual[key])) &&
                    visual[key] !== null
                  ) {
                    return (
                      <div key={`VISUAL_${key}_${idx}`}>
                        <div className="text-sm font-bold flex items-center justify-start gap-1">
                          <LucideChevronDown size={16} /> {key}
                        </div>
                        <div className="p-2 flex flex-col gap-2">
                          {Array.isArray(visual[key]) &&
                            visual[key].map((item: any, i: number) => (
                              <div
                                key={`VISUAL_${key}_${idx}_${i}`}
                                className={cardClassNames + ""}
                              >
                                {VisualizeObject(item)}
                                {Object.keys(item).map(
                                  (k: string, j: number) => {
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
                                  }
                                )}
                              </div>
                            ))}
                          {typeof visual[key] === "object" &&
                            !Array.isArray(visual[key]) && (
                              <div
                                key={`VISUAL_${key}_${idx}`}
                                className={cardClassNames}
                              >
                                {VisualizeObject(visual[key])}
                              </div>
                            )}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
