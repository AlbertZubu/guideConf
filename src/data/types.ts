export type ActivityFormat = "BUSCAST" | "Pulse" | null;

export interface ActivityBlock {
  format: ActivityFormat;
  title: string;
  paragraphs: string[];
}

export interface ImageRef {
  src: string;
  alt: string;
}

export interface ListBlock {
  heading: string;
  items: string[];
}

export interface TransitBlock {
  route: string;
  activities: ActivityBlock[];
}

export interface DestinationBlock {
  name: string;
  images: ImageRef[];
  intro: string[];
  activity?: ActivityBlock;
  lists?: ListBlock[];
  closing?: string;
  extra?: { title: string; paragraphs: string[] };
}

export interface SheetEntry {
  type: "transit-destination" | "destination-only";
  day?: number;
  transit?: TransitBlock;
  destination: DestinationBlock;
}

export interface RegionDef {
  label: string;
  accent: string;
  deep: string;
  soft: string;
}

export interface ContactLine {
  label: string;
  value: string;
}

export interface ExcursionData {
  region: string;
  title: string;
  lede: string[];
  duration: { label: string; value: string }[];
  coverImage: string;
  sheets: SheetEntry[];
  closing: {
    route: string;
    contact: ContactLine[];
  };
}
