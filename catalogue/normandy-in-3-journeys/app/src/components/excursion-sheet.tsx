import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* One printable A4-landscape "page". Fades in on scroll (respecting
   prefers-reduced-motion via the global override in index.css) and
   gets forced to exact A4 dimensions in @media print. */
export function ExcursionSheet({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={cn(
        "excursion-sheet shadow-app bg-card text-card-foreground relative mx-auto mb-10 aspect-[297/210] w-[min(1200px,96vw)] overflow-hidden rounded-3xl p-11 px-13 transition-[opacity,transform] duration-[600ms] ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-3.5 opacity-0",
        className
      )}
    >
      <div className="flex h-full flex-col">{children}</div>
    </section>
  );
}
