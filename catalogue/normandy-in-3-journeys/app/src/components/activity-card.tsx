import type { ActivityBlock } from "@/data/types";
import { FormatPill } from "./format-pill";

export function ActivityCard({ activity }: { activity: ActivityBlock }) {
  return (
    <div className="bg-muted my-3.5 rounded-xl px-4.5 py-4">
      <FormatPill format={activity.format} />
      <h3 className="font-heading mt-1.5 mb-1.5 text-xl font-semibold">{activity.title}</h3>
      {activity.paragraphs.map((p, i) => (
        <p key={i} className="text-card-foreground/85 mb-2 text-base leading-relaxed last:mb-0">
          {p}
        </p>
      ))}
    </div>
  );
}
