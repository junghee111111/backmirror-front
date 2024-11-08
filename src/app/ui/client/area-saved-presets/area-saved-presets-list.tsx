"use client";

import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { TPreset } from "@/app/store/preset.store";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { useAtomValue } from "jotai";
import { ChevronDown, LucideLock, LucideUnlock } from "lucide-react";
import { useEffect, useState } from "react";
import AreaSavedPresetsListItem from "./area-saved-presets-list-item";

export default function AreaSavedPresetsList() {
  const presets: Array<TPreset> = useAtomValue(
    SAreaFetchConfigUISettings
  ).presets;
  const [hosts, setHosts] = useState<string[]>([]);

  useEffect(() => {
    const tmpHosts: string[] = [];
    if (Array.isArray(presets)) {
      for (const preset of presets) {
        try {
          const host = preset.protocol + "//" + preset.host;
          if (!tmpHosts.includes(host)) {
            tmpHosts.push(host);
          }
        } catch (e: unknown) {
          console.error("Error while parsing host", e);
          continue;
        }
      }
      setHosts(tmpHosts);
    }
  }, [presets]);

  return hosts.map((host) => {
    const savedPresetsForHost = presets?.filter((preset) => {
      const presetProtocolHost = preset.protocol + "//" + preset.host;
      return presetProtocolHost === host;
    });
    const splits = host.split("://");
    const protocol = splits[0];
    const hostName = splits[1];
    return (
      <Collapsible
        key={`Presets_Collapsible_${host}`}
        defaultOpen
        className="group/collapsible"
      >
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              <div className="flex items-center justify-start gap-1 overflow-hidden text-ellipsis whitespace-pre">
                <div
                  className={
                    (protocol === "https"
                      ? "text-green-600 bg-green-50 "
                      : "bg-red-50 text-red-500 ") + " flex flex-row gap-1"
                  }
                >
                  {protocol === "https" && <LucideLock size={14} />}
                  {protocol === "http" && <LucideUnlock size={14} />}
                  {protocol}
                  {`://`}
                </div>
                <div className="flex-grow overflow-hidden text-ellipsis whitespace-pre">
                  {hostName}
                </div>
              </div>
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {savedPresetsForHost.map((preset) => (
                  <AreaSavedPresetsListItem
                    key={`PRESET_ITEM_${preset.id}`}
                    preset={preset}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    );
  });
}
