import type { DestinationBlock } from "@/data/types";
import { Frame } from "./frame";
import { ActivityCard } from "./activity-card";
import { ListsBlock } from "./lists-block";

export function DestinationView({ destination }: { destination: DestinationBlock }) {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-8 md:grid-cols-[1.25fr_1fr]">
      <div className="min-w-0">
        <h2 className="font-heading mb-2.5 text-[26px] leading-tight font-bold tracking-tight">
          {destination.name}
        </h2>
        {destination.intro.map((p, i) => (
          <p key={i} className="text-card-foreground/85 mb-2.5 text-base leading-relaxed last:mb-0">
            {p}
          </p>
        ))}
        {destination.activity && <ActivityCard activity={destination.activity} />}
        {destination.lists && <ListsBlock lists={destination.lists} />}
        {destination.closing && (
          <div className="text-muted-foreground mt-3.5 text-[14.5px] italic">{destination.closing}</div>
        )}
        {destination.extra && (
          <div className="mt-4">
            <h3 className="font-heading mb-1 text-xl font-semibold">{destination.extra.title}</h3>
            {destination.extra.paragraphs.map((p, i) => (
              <p key={i} className="text-muted-foreground mb-1.5 text-sm leading-snug last:mb-0">
                {p}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="flex min-h-0 flex-col gap-3.5">
        {destination.images.map((img, i) => (
          <Frame key={i} image={img} className="min-h-0 flex-1" />
        ))}
      </div>
    </div>
  );
}
