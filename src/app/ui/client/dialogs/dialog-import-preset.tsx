"use client";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SAreaSavedListUI,
  setImportDialogOpen,
} from "@/app/store/area-saved-list-ui.store";
import { TPreset } from "@/app/store/preset.store";
import { decryptPresets } from "@/app/utils/encrypt";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAtomValue, useSetAtom } from "jotai";
import { LucideImport } from "lucide-react";
import { useState } from "react";

export default function DialogImportPreset() {
  const toast = useToast();
  const UIState = useAtomValue(SAreaSavedListUI);
  const setFetchConfigUISettings = useSetAtom(SAreaFetchConfigUISettings);
  const setOpenState = useSetAtom(setImportDialogOpen);
  const [hashInput, setHashInput] = useState("");

  const importHash = (append: boolean = true) => {
    if (!append) {
      if (
        confirm("Are you sure you want to replace all presets with this one?")
      ) {
      } else {
        return false;
      }
    }

    try {
      const parsed = JSON.parse(
        decryptPresets(hashInput)
      ) as unknown as Array<TPreset>;
      setFetchConfigUISettings((prev) => ({
        ...prev,
        presets: append
          ? {
              ...prev.presets,
              ...parsed,
            }
          : parsed,
      }));
      toast.toast({
        title: "Successfully imported from hash",
        description: "Your presets have been imported!",
        color: "green",
      });
      setOpenState(false);
    } catch (e) {
      toast.toast({
        title: "Cannot decrypt your hash",
        description: "This is invalid hash. Please try with different one.",
        color: "red",
      });
    }
  };
  return (
    <Dialog
      open={UIState.importDialogOpen}
      onOpenChange={(open) => setOpenState(open)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import your presets</DialogTitle>
          <DialogDescription>Paste hash here.</DialogDescription>
        </DialogHeader>
        <div>
          <Textarea
            value={hashInput}
            onChange={(e) => setHashInput(e.target.value)}
            rows={10}
          ></Textarea>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              importHash(false);
            }}
            variant={"destructive"}
            type="submit"
            className="flex items-center justify-center gap-2"
          >
            <LucideImport size={14} />
            Replace all with this one.
          </Button>
          <Button
            onClick={() => {
              importHash();
            }}
            type="submit"
            className="flex items-center justify-center gap-2"
          >
            <LucideImport size={14} />
            Append to existing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
