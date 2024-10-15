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
import { useAtomValue, useSetAtom } from "jotai";

export default function AreaFetchConfigSelectMethod() {
  const setAxiosConfigStore = useSetAtom(SAreaFetchConfigSettings);
  const axiosConfigStore = useAtomValue(SAreaFetchConfigSettings);
  return (
    <Select
      onValueChange={(value) => {
        const typedValue = value as EAreaFetchConfigMethod;
        setAxiosConfigStore((prev) => ({ ...prev, method: typedValue }));
      }}
      value={axiosConfigStore.method}
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
