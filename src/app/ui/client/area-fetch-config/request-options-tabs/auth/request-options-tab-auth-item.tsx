import { AreaFetchConfigAuthMethod } from "@/app/data/area-fetch-config-auth-method";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { TKeyValueMethod } from "@/app/store/area-fetch-config.store";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useSetAtom } from "jotai";
import { LucideTrash } from "lucide-react";

export default function AuthKeyValueItem({ item }: { item: TKeyValueMethod }) {
  const setUIStore = useSetAtom(SAreaFetchConfigUISettings);

  const handleChange = (key: string, value: boolean | string) => {
    setUIStore((prev) => ({
      ...prev,
      authInput: prev.authInput.map((i) =>
        i.id === item.id ? { ...i, [key]: value } : i
      ),
    }));
  };

  const handleDelete = (id: string) => {
    setUIStore((prev) => ({
      ...prev,
      authInput: prev.authInput.filter((i) => i.id !== id),
    }));
  };

  return (
    <div
      className={
        (item.enabled === true ? " bg-white " : "bg-transparent ") +
        "flex items-center justify-between gap-2 p-2 border-b border-slate-200"
      }
    >
      <Switch
        checked={item.enabled}
        onCheckedChange={(checked) => handleChange("enabled", checked)}
      />
      <Select onValueChange={(value) => handleChange("method", value)}>
        <SelectTrigger className="w-[190px] bg-white">
          <SelectValue placeholder={AreaFetchConfigAuthMethod[0]} />
        </SelectTrigger>
        <SelectContent>
          {AreaFetchConfigAuthMethod.map((method) => (
            <SelectItem
              key={`AreaFetchConfigAuthMethod_${method}`}
              value={method}
            >
              {method}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {item.method != "JWT Bearer" && (
        <Input
          onChange={(e) => handleChange("key", e.target.value)}
          value={item.key || ""}
          placeholder="Key"
          className="w-[250px] bg-white"
        ></Input>
      )}
      <Input
        placeholder="Value"
        onChange={(e) => handleChange("value", e.target.value)}
        value={item.value || ""}
        className="flex-grow bg-white"
      ></Input>
      <Button
        onClick={() => handleDelete(item.id)}
        variant={"ghost"}
        className="flex items-center gap-1 text-red-500"
      >
        <LucideTrash size={16} />
      </Button>
    </div>
  );
}
