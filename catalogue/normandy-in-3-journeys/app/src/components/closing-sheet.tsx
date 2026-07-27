import type { ExcursionData, RegionDef } from "@/data/types";
import { ExcursionSheet } from "./excursion-sheet";
import { Logo } from "./logo";

export function ClosingSheet({ excursion, region }: { excursion: ExcursionData; region: RegionDef }) {
  return (
    <ExcursionSheet>
      <div className="flex h-full flex-col items-center justify-center gap-4.5 text-center">
        <Logo size="big" />
        <div className="bg-region-accent h-0.5 w-14 rounded-full" />
        <div className="font-heading text-[22px] font-bold tracking-tight">{excursion.closing.route}</div>
        <p className="text-muted-foreground max-w-[520px] text-base">
          Thank you for travelling with UpTempo. This document was prepared for your {region.label} programme
          — get in touch for dates, availability or a tailored version of this journey.
        </p>
        <div className="mt-1.5 flex gap-8">
          {excursion.closing.contact.map((c) => (
            <div key={c.label} className="text-muted-foreground text-sm">
              <b className="text-foreground mb-0.5 block text-[14.5px]">{c.label}</b>
              {c.value}
            </div>
          ))}
        </div>
      </div>
    </ExcursionSheet>
  );
}
