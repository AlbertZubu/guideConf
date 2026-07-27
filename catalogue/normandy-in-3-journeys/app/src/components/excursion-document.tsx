import { normandyIn3Journeys } from "@/data/excursions/normandy-in-3-journeys";
import { REGIONS } from "@/data/regions";
import { useRegion } from "@/hooks/use-region";
import { CoverSheet } from "./cover-sheet";
import { DaySheetView } from "./day-sheet";
import { ClosingSheet } from "./closing-sheet";

export function ExcursionDocument() {
  const excursion = normandyIn3Journeys;
  const region = REGIONS[excursion.region];
  useRegion(excursion.region);

  return (
    <div className="excursion-stage px-4 pt-10 pb-20">
      <CoverSheet excursion={excursion} region={region} />
      {excursion.sheets.map((entry, i) => (
        <DaySheetView key={i} entry={entry} />
      ))}
      <ClosingSheet excursion={excursion} region={region} />
    </div>
  );
}
