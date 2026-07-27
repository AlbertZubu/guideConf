import { useEffect, useState } from "react";

/* DESIGN SYSTEMS — switcher options. Token values themselves live in
   src/index.css as .theme-* class blocks; add a system by adding both
   an entry here and a matching CSS block, nothing else needs to change. */
export const DESIGN_SYSTEMS = [
  { key: "notion", label: "Notion" },
  { key: "claude", label: "Claude" },
  { key: "discord", label: "Discord" },
  { key: "apple", label: "Apple" },
  { key: "airbnb", label: "Airbnb" },
  { key: "slack", label: "Slack" },
  { key: "nike", label: "Nike" },
  { key: "mastercard", label: "Mastercard" },
  { key: "hashicorp", label: "HashiCorp" },
  { key: "elevenlabs", label: "ElevenLabs" },
  { key: "pinterest", label: "Pinterest" },
  { key: "clay", label: "Clay" },
  { key: "airtable", label: "Airtable" },
  { key: "nintendo", label: "Nintendo '01" },
] as const;

export type DesignKey = (typeof DESIGN_SYSTEMS)[number]["key"];

const STORAGE_KEY = "uptempo-design";
const THEME_CLASSES = DESIGN_SYSTEMS.map((d) => `theme-${d.key}`);

function isDesignKey(value: string | null): value is DesignKey {
  return DESIGN_SYSTEMS.some((d) => d.key === value);
}

function applyThemeClass(key: DesignKey) {
  document.documentElement.classList.remove(...THEME_CLASSES);
  if (key !== "notion") document.documentElement.classList.add(`theme-${key}`);
}

export function useDesignSystem() {
  const [design, setDesign] = useState<DesignKey>(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return isDesignKey(saved) ? saved : "notion";
  });

  useEffect(() => {
    applyThemeClass(design);
    window.localStorage.setItem(STORAGE_KEY, design);
  }, [design]);

  return [design, setDesign] as const;
}
