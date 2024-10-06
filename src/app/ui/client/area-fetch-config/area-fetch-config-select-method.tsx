"use client";
import {
  AreaFetchConfigMethod,
  EAreaFetchConfigMethod,
} from "@/app/data/area-fetch-config-method";
import { SAreaFetchConfigSettings } from "@/app/store/area-fetch-config.store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSetAtom } from "jotai";

export default function AreaFetchConfigSelectMethod() {
  const setUserConfig = useSetAtom(SAreaFetchConfigSettings);
  return (
    <Select
      onValueChange={(value) => {
        const typedValue = value as EAreaFetchConfigMethod;
        setUserConfig((prev) => ({ ...prev, method: typedValue }));
      }}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder={AreaFetchConfigMethod[0]} />
      </SelectTrigger>
      <SelectContent>
        {AreaFetchConfigMethod.map((method) => (
          <SelectItem key={`AreaFetchConfigMethod_${method}`} value={method}>
            {method}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
