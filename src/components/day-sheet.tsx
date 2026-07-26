import type { SheetEntry } from "@/data/types";
import { ExcursionSheet } from "./excursion-sheet";
import { TransitStrip } from "./transit-strip";
import { DestinationView } from "./destination-view";

export function DaySheetView({ entry }: { entry: SheetEntry }) {
  return (
    <ExcursionSheet>
      {entry.day && (
        <span className="text-region-deep text-xs font-semibold tracking-wide uppercase">
          Day {entry.day}
        </span>
      )}
      <div className="mt-1.5 flex min-h-0 flex-1 flex-col">
        {entry.transit && <TransitStrip transit={entry.transit} />}
        <DestinationView destination={entry.destination} />
      </div>
    </ExcursionSheet>
  );
}
