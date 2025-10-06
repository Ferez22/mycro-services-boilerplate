import { Delete } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ZeButtonProps {
  text: string;
  onClick: () => void;
}

export function ZeButton({ text, onClick }: ZeButtonProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 md:flex-row">
      <Button variant="outline" aria-label="Submit" onClick={onClick}>
        <span>{text}</span>
        <Delete />
      </Button>
    </div>
  );
}
