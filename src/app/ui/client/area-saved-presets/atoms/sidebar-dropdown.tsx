"use client";
import { getPresetsRaw } from "@/app/services/preset.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronUp,
  LucideCopy,
  LucideDownload,
  LucideSettings,
  LucideUpload,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function SidebarDropdown() {
  const toast = useToast();
  const [encryptedPreset, setEncryptedPreset] = useState("");
  useEffect(() => {
    setEncryptedPreset(getPresetsRaw());
  }, []);
  const copyRawPreset = () => {
    navigator.clipboard.writeText(encryptedPreset);
    toast.toast({
      title: "Copied",
      description: "Copied to clipboard",
      color: "green",
    });
  };
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
            <LucideSettings /> Preset Actions
            <ChevronUp className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          className="w-[--radix-popper-anchor-width]"
        >
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <LucideUpload />
              <span>Export Presets</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem>
            <LucideDownload />
            <span>Import Presets</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export your presets</DialogTitle>
          <DialogDescription>
            Send this to your frontend sucker or import it for later.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Textarea
            rows={10}
            defaultValue={encryptedPreset}
            readOnly
          ></Textarea>
        </div>
        <DialogFooter>
          <Button
            onClick={copyRawPreset}
            type="submit"
            className="flex items-center justify-center gap-2"
          >
            <LucideCopy size={14} />
            Copy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
