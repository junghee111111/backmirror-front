/**
 * @author JungHee Wang (github : junghee111111)
 * @since 2024-10-28
 *
 * @description This file provides a dialog component for saving a new preset.
 */

"use client";
import { getPresets, savePreset } from "@/app/services/preset.service";
import { SAreaFetchConfigUISettings } from "@/app/store/area-fetch-config-ui.store";
import { SAreaFetchConfigSettings } from "@/app/store/area-fetch-config.store";
import { TPreset } from "@/app/store/preset.store";
import { generatePresetId } from "@/app/utils/encrypt";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableBody, TableCell, Table, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAtomValue, useSetAtom } from "jotai";
import { LucideFilePlus } from "lucide-react";
import { useState } from "react";

export default function DialogMakeNewPreset() {
  const toast = useToast();
  const uiStore = useAtomValue(SAreaFetchConfigUISettings);
  const setUiStore = useSetAtom(SAreaFetchConfigUISettings);
  const axiosConfigStore = useAtomValue(SAreaFetchConfigSettings);

  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const fromInput = (): TPreset | null => {
    try {
      const parsedURL = new URL(axiosConfigStore.url);
      return {
        method: axiosConfigStore.method,
        protocol: parsedURL.protocol,
        host: parsedURL.host,
        pathname: parsedURL.pathname,
        headersInput: uiStore.headersInput,
        bodyInput: uiStore.bodyInput,
        queryParamsInput: uiStore.queryParamsInput,
        authInput: uiStore.authInput,
        name: nameInput,
        description: descriptionInput,
        id: generatePresetId(
          JSON.stringify(uiStore),
          JSON.stringify(parsedURL)
        ),
      };
    } catch (e: unknown) {
      toast.toast({
        title: "Error while Saving",
        description: `Please check your inputs.\n${(e as Error).message}`,
        color: "red",
      });
      return null;
    }
  };
  const handleAddPreset = () => {
    const savedPresets: TPreset[] = getPresets();
    const newPreset = fromInput();
    if (newPreset) {
      savedPresets.push({
        ...newPreset,
        id: generatePresetId(
          JSON.stringify(uiStore),
          JSON.stringify(axiosConfigStore)
        ),
      });
      savePreset(savedPresets);
      setUiStore((prev) => ({
        ...prev,
        presets: getPresets(),
        selectedPresetId: newPreset.id,
      }));
      setNameInput("");
      setDescriptionInput("");
      document.getElementById("dialog-make-new-preset-close-btn")?.click();
      toast.toast({
        title: "Saved!",
        description: `${axiosConfigStore.method} ${axiosConfigStore.url}\nSuccessfully saved.`,
        color: "green",
      });
    }
  };
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Make New Preset</DialogTitle>
        <DialogDescription>
          Save the current configuration as a new preset.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-2">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Method</TableCell>
              <TableCell>{axiosConfigStore.method}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">URL</TableCell>
              <TableCell className="overflow-hidden max-w-[240px]">
                {axiosConfigStore.url}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="grid flex-1 gap-2">
          <Label htmlFor="config-title">Name</Label>
          <Input
            onChange={(e) => setNameInput(e.currentTarget.value)}
            value={nameInput}
            id="config-title"
            placeholder="Enter a name for the preset"
          />
        </div>
        <div className="grid flex-1 gap-2">
          <Label htmlFor="config-desc">Description</Label>
          <Textarea
            onChange={(e) => setDescriptionInput(e.currentTarget.value)}
            value={descriptionInput}
            id="config-desc"
            placeholder="Enter a simple description for the preset"
          />
        </div>
      </div>
      <DialogFooter className="sm:justify-start">
        <Button
          disabled={nameInput.trim().length === 0}
          onClick={handleAddPreset}
          type="submit"
        >
          <LucideFilePlus className="h-4 w-4" />
          <span className="pl-2">Save New</span>
        </Button>
        <DialogClose asChild>
          <Button
            id="dialog-make-new-preset-close-btn"
            type="button"
            variant="secondary"
          >
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
