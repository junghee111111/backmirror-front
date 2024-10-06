import { Button } from "@/components/ui/button";
import { LucideLightbulb } from "lucide-react";
import Link from "next/link";

export default function HeaderRightNav() {
  return (
    <div className="flex items-center text-base justify-end gap-6">
      <Link href={"/"}>Start App</Link>
      <Button
        variant="default"
        className="flex items-center justify-between gap-2 font-bold"
      >
        How To Use
        <LucideLightbulb size={16} strokeWidth={2.2} />
      </Button>
    </div>
  );
}
