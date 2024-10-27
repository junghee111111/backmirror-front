/**
 * @author JungHee Wang (github : junghee111111)
 * @since 2024-10-18
 *
 * @description This file provides a component that displays a text value that can be copied to the clipboard.
 * When the user clicks on the text, the text is copied to the clipboard and a toast notification is displayed.
 */

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { LucideImage } from "lucide-react";
import { checkIfImageFile } from "../client/area-visualizer/visualizer/renderer/util";

export function CopiableText({ text }: { text: string }) {
  const toast = useToast();
  const copyToClipboard = () => {
    toast.toast({
      title: "📋 Copied!",
      description: text,
    });
    navigator.clipboard.writeText(text);
  };
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button
            onClick={copyToClipboard}
            className="hover:text-blue-500 hover:bg-blue-50 rounded text-left cursor-pointer whitespace-pre-wrap break-all"
          >
            {checkIfImageFile(text) && (
              <Badge size="xs" variant={"secondary"} className="mr-1">
                <LucideImage size={10} />
                &nbsp;Image Detected
              </Badge>
            )}
            {text}
          </button>
        </TooltipTrigger>
        <TooltipContent align="center" side="top">
          <p>Copy this value to clipboard 📋</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
