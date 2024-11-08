"use client";
import { getPresetsRaw } from "@/app/services/preset.service";
import {
  SAreaSavedListUI,
  setExportDialogOpen,
} from "@/app/store/area-saved-list-ui.store";
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
import { LucideCopy } from "lucide-react";
import { useEffect, useState } from "react";

export default function DialogExportPreset() {
  const toast = useToast();
  const UIState = useAtomValue(SAreaSavedListUI);
  const setOpenState = useSetAtom(setExportDialogOpen);
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
    <Dialog
      open={UIState.exportDialogOpen}
      onOpenChange={(open) => setOpenState(open)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export your presets</DialogTitle>
          <DialogDescription>
            This is your hash made from your presets.
            <br />
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
