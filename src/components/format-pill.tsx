import { Badge } from "@/components/ui/badge";
import type { ActivityFormat } from "@/data/types";

export function FormatPill({ format }: { format: ActivityFormat }) {
  if (format === "BUSCAST") {
    return (
      <Badge className="bg-buscast text-buscast-foreground border-transparent tracking-wide uppercase">
        BusCast
      </Badge>
    );
  }
  if (format === "Pulse") {
    return (
      <Badge className="bg-pulse text-pulse-foreground border-transparent tracking-wide uppercase">
        Pulse
      </Badge>
    );
  }
  return null;
}

export function RegionPill({ label }: { label: string }) {
  return (
    <Badge
      variant="outline"
      className="border-region-accent text-region-deep bg-card h-auto rounded-full px-3 py-1 tracking-wide uppercase"
    >
      {label}
    </Badge>
  );
}
