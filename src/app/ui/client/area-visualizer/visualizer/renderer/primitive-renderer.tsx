import { CopiableText } from "@/app/ui/common/copiable-text";
import { Badge } from "@/components/ui/badge";
import { checkIfImageFile } from "./util";
import Image from "next/image";
import { LucideImage } from "lucide-react";

export default function PrimitiveRenderer({
  obj,
  objKey,
}: {
  obj: any;
  objKey?: string;
}) {
  return (
    <div className="flex items-start gap-2 justify-start">
      {objKey && <span className="font-semibold text-red-700">{objKey}:</span>}
      <span className="text-blue-400 mr-2">{typeof obj}</span>
      <div className="flex flex-col gap-2">
        {checkIfImageFile(obj) && (
          <img src={obj} width={400} height={400} alt={obj} />
        )}
        {obj === undefined || obj === null ? (
          <span className="text-red-500">NULL</span>
        ) : (
          <CopiableText text={obj} />
        )}
      </div>
    </div>
  );
}
