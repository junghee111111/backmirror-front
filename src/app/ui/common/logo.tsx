import { LucideCandy } from "lucide-react";

export default function Logo() {
  return (
    <div className="text-xl font-black flex items-center justify-start gap-1 text-black">
      <LucideCandy className="text-pink-500 " size={24} strokeWidth={2.5} />
      <div className="bg-gradient-to-r from-pink-500 to-violet-500 inline-block text-transparent bg-clip-text">
        Swaggirl
      </div>
    </div>
  );
}
