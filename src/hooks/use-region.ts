import { useEffect } from "react";
import { REGIONS } from "@/data/regions";

/* Applies the excursion's region accent colors as CSS custom properties.
   Independent of the design system switcher — every theme composes with it. */
export function useRegion(regionKey: string) {
  useEffect(() => {
    const region = REGIONS[regionKey];
    if (!region) return;
    const root = document.documentElement.style;
    root.setProperty("--region-accent", region.accent);
    root.setProperty("--region-deep", region.deep);
    root.setProperty("--region-soft", region.soft);
  }, [regionKey]);
}
