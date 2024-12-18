import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { TKeyValue } from "@/app/store/area-fetch-config.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useSetAtom } from "jotai";
import { LucideTrash } from "lucide-react";

export default function HeaderKeyValueItem({ item }: { item: TKeyValue }) {
  const setUIStore = useSetAtom(SAreaFetchConfigUISettings);

  const handleChange = (key: string, value: CheckedState | string) => {
    setUIStore((prev) => ({
      ...prev,
      headersInput: prev.headersInput.map((i) =>
        i.id === item.id ? { ...i, [key]: value } : i
      ),
    }));
  };

  const handleDelete = (id: string) => {
    setUIStore((prev) => ({
      ...prev,
      headersInput: prev.headersInput.filter((i) => i.id !== id),
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
      <Input
        onChange={(e) => handleChange("key", e.target.value)}
        value={item.key || ""}
        placeholder="Key"
        className="w-[300px] bg-white"
      ></Input>
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
