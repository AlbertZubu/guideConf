import type { RegionDef } from "./types";

/* REGION SYSTEM — reused across every excursion in the catalog.
   Add a region key here once; every future sheet just points
   ExcursionData.region at one of these to re-skin automatically. */
export const REGIONS: Record<string, RegionDef> = {
  normandie: { label: "Normandie", accent: "#62aef0", deep: "#0075de", soft: "#eaf4fd" },
  bretagne: { label: "Bretagne", accent: "#5ec2be", deep: "#1f7d79", soft: "#e7f5f4" },
  provence: {
    label: "Provence & Côte d'Azur",
    accent: "#ef8a4a",
    deep: "#b0470a",
    soft: "#fdece0",
  },
  loire: { label: "Vallée de la Loire", accent: "#4dc06a", deep: "#0f7a28", soft: "#e8f8ec" },
  idf: { label: "Île-de-France", accent: "#a97fe0", deep: "#391c57", soft: "#f2e9fb" },
};
