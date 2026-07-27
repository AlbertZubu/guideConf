import type { ListBlock } from "@/data/types";

export function ListsBlock({ lists }: { lists: ListBlock[] }) {
  return (
    <div className="mt-3.5 flex flex-wrap gap-5.5">
      {lists.map((l) => (
        <div key={l.heading} className="min-w-[200px] flex-1">
          <span className="text-region-deep mb-2 block text-xs font-semibold tracking-wide uppercase">
            {l.heading}
          </span>
          {l.items.map((item, i) => (
            <div key={i} className="mb-2 flex items-start gap-2.5">
              <span className="bg-region-accent mt-0.5 flex size-5 flex-none items-center justify-center rounded-full text-[11px] font-bold text-white">
                {i + 1}
              </span>
              <span className="text-[14.5px] leading-snug font-semibold">{item}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
