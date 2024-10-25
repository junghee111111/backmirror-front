import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { LucideCopy } from "lucide-react";

export default function JsonCopyButton({ copyString }: { copyString: string }) {
  const toast = useToast();
  const copyToClipboard = () => {
    toast.toast({
      title: "📋 Copied as stringified JSON!",
      description: copyString,
    });
    navigator.clipboard.writeText(copyString);
  };
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button onClick={copyToClipboard} size={"xs"} variant={"outline"}>
          <LucideCopy size={14} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="center">
        Copy this object as json string
      </TooltipContent>
    </Tooltip>
  );
}
