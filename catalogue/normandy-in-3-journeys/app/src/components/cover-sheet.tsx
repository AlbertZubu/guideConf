import type { ExcursionData, RegionDef } from "@/data/types";
import { ExcursionSheet } from "./excursion-sheet";
import { Logo } from "./logo";
import { RegionPill } from "./format-pill";
import { Frame } from "./frame";

export function CoverSheet({ excursion, region }: { excursion: ExcursionData; region: RegionDef }) {
  return (
    <ExcursionSheet>
      <div className="flex items-start justify-between">
        <Logo size="big" />
        <RegionPill label={region.label} />
      </div>
      <div className="mt-2 grid flex-1 grid-cols-1 items-center gap-9 md:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="text-region-deep text-xs font-semibold tracking-wide uppercase">
            2-Day Educational Journey
          </span>
          <h1 className="font-heading mt-1.5 text-[clamp(34px,4.6vw,58px)] leading-[1.02] font-extrabold tracking-tight">
            {excursion.title}
          </h1>
          <div className="mt-3">
            {excursion.lede.map((p, i) => (
              <p key={i} className="text-card-foreground/85 mb-3 text-[16.5px] leading-relaxed last:mb-0">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {excursion.duration.map((d) => (
              <div key={d.label} className="border-border border-t pt-2">
                <span className="text-muted-foreground block text-xs font-semibold tracking-wide uppercase">
                  {d.label}
                </span>
                <div className="text-[15px] font-semibold">{d.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[220px] md:h-full">
          <Frame image={{ src: excursion.coverImage, alt: "Normandy coastline" }} className="h-full" />
        </div>
      </div>
    </ExcursionSheet>
  );
}
