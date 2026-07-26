import { cn } from "@/lib/utils";

export function Logo({ size = "normal" }: { size?: "normal" | "big" }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-end gap-[3px]">
        <i className="bg-primary block w-1.5 rounded-t-sm rounded-b-[1px]" style={{ height: 10 }} />
        <i className="bg-region-accent block w-1.5 rounded-t-sm rounded-b-[1px]" style={{ height: 16 }} />
        <i className="bg-primary block w-1.5 rounded-t-sm rounded-b-[1px]" style={{ height: 22 }} />
      </div>
      <div>
        <div
          className={cn(
            "font-heading leading-none font-extrabold tracking-tight",
            size === "big" ? "text-2xl" : "text-[19px]"
          )}
        >
          UpTempo
        </div>
        <div className="text-muted-foreground mt-0.5 text-[10.5px] font-medium tracking-[1.2px] uppercase">
          Cultural Journeys
        </div>
      </div>
    </div>
  );
}
