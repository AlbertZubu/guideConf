import { Bus } from "lucide-react";
import type { TransitBlock } from "@/data/types";
import { FormatPill } from "./format-pill";

export function TransitStrip({ transit }: { transit: TransitBlock }) {
  return (
    <div className="bg-muted mb-5 flex items-stretch gap-5 rounded-xl px-5 py-4">
      <div className="border-border flex flex-none items-center gap-2 border-r pr-4.5 text-[14.5px] font-semibold whitespace-nowrap">
        <Bus className="size-4 flex-none" />
        {transit.route}
      </div>
      <div className="flex flex-wrap items-start gap-4.5">
        {transit.activities.map((a, i) => (
          <div key={i} className="max-w-[340px]">
            <div className="mb-1.5">
              <FormatPill format={a.format} />
            </div>
            <div className="mb-0.5 text-[14.5px] font-semibold">{a.title}</div>
            <p className="text-muted-foreground text-[14.5px] leading-snug">{a.paragraphs[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
