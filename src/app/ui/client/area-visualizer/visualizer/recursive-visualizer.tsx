/**
 * @author JungHee Wang (github : junghee111111)
 * @since 2024-10-28
 *
 * @description This file provides a recursive visualizer component that displays the structure of a JSON object in a tree format.
 * The component is used to visualize any structure of the JSON object in the area visualizer.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CopiableText } from "../../../common/copiable-text";
import PrimitiveRenderer from "./renderer/primitive-renderer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideBox, LucideListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import JsonCopyButton from "./atom/json-copy-button";

export default function RecursiveVisualizer({
  obj,
  level,
  objKey,
}: {
  obj: any;
  level: number;
  objKey?: string;
}) {
  const [isChildOpen, setIsChildOpen] = useState<boolean>(true);
  const toggleChildOpen = () => setIsChildOpen((prev) => !prev);

  // check obj types..
  const isObjUndefined = obj === undefined;
  const isObjNull = obj === null;
  const isObjExist = !isObjUndefined && !isObjNull;
  const isObjArray = Array.isArray(obj);
  const isObjPrimitive = typeof obj != "object";

  // string, number, boolean, undefined, null
  if ((isObjExist && isObjPrimitive) || isObjUndefined || isObjNull) {
    return (
      <div
        className={"flex items-center justify-start text-xs"}
        style={{
          marginLeft: `${(level - 1) * 4}px`,
        }}
      >
        <PrimitiveRenderer obj={obj} objKey={objKey} />
      </div>
    );
  }

  // array
  if (isObjExist && isObjArray) {
    const NumberOnlyArray = obj.every((item: any) => typeof item === "number");
    const BooleanOnlyArray = obj.every(
      (item: any) => typeof item === "boolean"
    );
    //const StringOnlyArray = obj.every((item: any) => typeof item === "string");
    const ComplexArray = !NumberOnlyArray && !BooleanOnlyArray;
    return (
      <Card className="ring-zinc-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-start gap-2">
            <Button
              onClick={toggleChildOpen}
              size={"xs"}
              variant={isChildOpen ? "default" : "outline"}
              className="flex items-center justify-center gap-2"
            >
              <LucideListOrdered size={18} />
              <span>Array</span>
            </Button>
            {objKey && (
              <span className={isChildOpen ? "font-bold " : "text-red-700 "}>
                {objKey}
              </span>
            )}
            {obj.length > 0 && (
              <span className="font-light text-xs">
                {obj.length} {obj.length > 1 ? "Items" : "Item"}
              </span>
            )}
            <JsonCopyButton copyString={JSON.stringify(obj)} />
          </CardTitle>
        </CardHeader>
        <CardContent className={(!isChildOpen ? "hidden " : " ") + "pb-5"}>
          {(NumberOnlyArray || BooleanOnlyArray) && (
            <CopiableText text={JSON.stringify(obj)} />
          )}
          {ComplexArray &&
            obj.map((item: any, i: number) => (
              <RecursiveVisualizer
                key={`RECUR_VIS_ARRAY_ITEM_${obj}_${
                  objKey || "UnknownKey"
                }_${i} as ${level}`}
                level={level + 1}
                obj={item}
              />
            ))}
        </CardContent>
      </Card>
    );
  }

  // object:any
  if (isObjExist && !isObjPrimitive && !isObjArray) {
    return (
      <Card className="flex items-start justify-start gap-0 ring-blue-300">
        <CardHeader>
          <CardTitle
            className={
              (isChildOpen
                ? "flex-col items-start "
                : "flex-row items-center ") + "flex justify-start gap-2"
            }
          >
            <Button
              onClick={toggleChildOpen}
              size={"xs"}
              variant={isChildOpen ? "default" : "outline"}
              className="flex items-center justify-center gap-2"
            >
              <LucideBox size={18} />
              <span>{obj.id ? obj.id : "Obj"}</span>
            </Button>
            {objKey && (
              <span className={isChildOpen ? "font-bold " : "text-red-700 "}>
                {objKey}
              </span>
            )}
            <JsonCopyButton copyString={JSON.stringify(obj)} />
          </CardTitle>
        </CardHeader>
        <CardContent
          className={(!isChildOpen ? "hidden " : " ") + "py-5 space-y-3"}
        >
          {Object.keys(obj).map((key: string, idx: number) => (
            <RecursiveVisualizer
              key={`RECUR_VIS_ARRAY_ITEM_${obj}_${
                objKey || "UnknownKey"
              }_${key}_${idx} as ${level}`}
              level={level + 1}
              obj={obj[key]}
              objKey={key}
            />
          ))}
        </CardContent>
      </Card>
    );
  }
}
