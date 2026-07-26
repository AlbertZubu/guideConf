import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ImageRef } from "@/data/types";

export function Frame({ image, className }: { image: ImageRef; className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "border-border bg-muted relative overflow-hidden rounded-xl border",
        failed && "from-region-soft to-muted flex items-center justify-center bg-gradient-to-br",
        className
      )}
    >
      {failed ? (
        <span className="text-muted-foreground p-3 text-center text-xs">{image.alt}</span>
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="block h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
